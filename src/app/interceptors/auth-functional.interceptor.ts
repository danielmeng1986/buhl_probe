import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, share } from 'rxjs/operators';
import { Auth } from '../services/auth';

// Refresh state management
let refreshObservable$: Observable<string> | null = null;

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const authService = inject(Auth);

  // Automatically add Authorization header for requests that need authentication
  const authRequest = addAuthHeaderIfNeeded(request, authService);
  
  return next(authRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(`AuthInterceptor: Request to ${request.url} failed with status ${error.status}`);
      
      // Only handle 401 errors, excluding login requests
      if (error.status === 401 && !isLoginRequest(request)) {
        console.log('AuthInterceptor: 401 error detected for non-login request, handling...');
        return handle401Error(request, next, authService);
      }
      
      console.log('AuthInterceptor: Error not handled by interceptor, passing through');
      return throwError(() => error);
    }),
  );
};

function handle401Error(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: Auth,
): Observable<HttpEvent<unknown>> {
  
  // If no refresh is in progress, create a new refresh Observable
  if (!refreshObservable$) {
    console.log('AuthInterceptor: Starting token refresh...');
    
    refreshObservable$ = authService.refreshAuthSession().pipe(
      switchMap((response) => {
        console.log('AuthInterceptor: Token refresh successful');
        
        // Create a simple Observable to return the token
        return new Observable<string>(subscriber => {
          subscriber.next(response.accessToken);
          subscriber.complete();
        });
      }),
      catchError((error) => {
        console.error('AuthInterceptor: Token refresh failed:', error);
        
        // Log out user
        authService.logout();
        
        return throwError(() => error);
      }),
      share() // Ensure multiple subscribers share the same refresh process
    );
    
    // Clean up state after stream completion
    refreshObservable$.subscribe({
      complete: () => {
        console.log('AuthInterceptor: Refresh observable completed, clearing state');
        refreshObservable$ = null;
      },
      error: () => {
        console.log('AuthInterceptor: Refresh observable errored, clearing state');
        refreshObservable$ = null;
      }
    });
  } else {
    console.log('AuthInterceptor: Token refresh already in progress, waiting...');
  }

  // Wait for refresh completion and retry the request
  return refreshObservable$.pipe(
    switchMap((newToken: string) => {
      console.log('AuthInterceptor: Retrying request with new token');
      const authRequest = addTokenToRequest(request, newToken);
      return next(authRequest);
    })
  );
}

function addTokenToRequest(
  request: HttpRequest<unknown>,
  token: string,
): HttpRequest<unknown> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function isLoginRequest(request: HttpRequest<unknown>): boolean {
  return request.url.includes('/auth/login');
}

function addAuthHeaderIfNeeded(
  request: HttpRequest<unknown>,
  authService: Auth,
): HttpRequest<unknown> {
  // If it's a login request or refresh request, don't add Authorization header
  if (isLoginRequest(request) || isRefreshRequest(request)) {
    return request;
  }

  // If Authorization header already exists, don't add it again
  if (request.headers.has('Authorization')) {
    return request;
  }

  // Get current access token
  const token = authService.getAccessToken();
  if (token) {
    console.log('AuthInterceptor: Adding Authorization header to request:', request.url);
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return request;
}

function isRefreshRequest(request: HttpRequest<unknown>): boolean {
  return request.url.includes('/auth/refresh');
}

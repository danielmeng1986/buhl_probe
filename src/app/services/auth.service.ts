import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  User,
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  RefreshResponse,
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_BASE = 'https://dummyjson.com/auth';
  private readonly TOKEN_KEY = 'accessToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';
  private readonly USER_KEY = 'currentUser';

  // Current user state
  private currentUserSubject = new BehaviorSubject<User | null>(
    this.getUserFromStorage(),
  );
  public currentUser$ = this.currentUserSubject.asObservable();

  // Authentication state
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.hasValidToken(),
  );
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  readonly http: HttpClient = inject(HttpClient);

  /**
   * User login
   * @param credentials Login credentials
   * @returns Observable<LoginResponse>
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.API_BASE}/login`, credentials, {
        headers: { 'Content-Type': 'application/json' },
        // Remove withCredentials: true to avoid CORS issues
      })
      .pipe(
        tap((response) => {
          // Store tokens and user information
          this.storeAuthData(response);

          // Update state
          const user: User = this.extractUserFromResponse(response);
          this.currentUserSubject.next(user);
          this.isAuthenticatedSubject.next(true);

          console.log(
            'Auth: Login successful, authentication state updated to true',
          );
        }),
        catchError((error) => {
          console.error('Login error:', error);
          return throwError(
            () => new Error(error.error?.message || 'Login failed'),
          );
        }),
      );
  }

  /**
   * Get current authenticated user information
   * @returns Observable<User>
   */
  getCurrentUser(): Observable<User> {
    const token = this.getAccessToken();
    if (!token) {
      return throwError(() => new Error('Access token not found'));
    }

    // Don't manually set Authorization header, let AuthInterceptor handle it uniformly
    return this.http.get<User>(`${this.API_BASE}/me`).pipe(
      tap((user) => {
        // Update user information
        this.storeUser(user);
        this.currentUserSubject.next(user);
      }),
      catchError((error) => {
        console.error('Get current user error:', error);
        // If token is invalid, clear authentication state
        if (error.status === 401) {
          console.log(
            'Auth: 401 error in getCurrentUser, token may be expired',
          );
          // Don't call logout here, let AuthInterceptor handle it
        }
        return throwError(
          () =>
            new Error(error.error?.message || 'Failed to get user information'),
        );
      }),
    );
  }

  /**
   * Refresh authentication session
   * @param refreshData Refresh token data
   * @returns Observable<RefreshResponse>
   */
  refreshAuthSession(
    refreshData?: RefreshRequest,
  ): Observable<RefreshResponse> {
    const refreshToken = refreshData?.refreshToken || this.getRefreshToken();

    const body: RefreshRequest = {
      ...(refreshToken && { refreshToken }),
      ...(refreshData?.expiresInMins && {
        expiresInMins: refreshData.expiresInMins,
      }),
    };

    return this.http
      .post<RefreshResponse>(`${this.API_BASE}/refresh`, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        tap((response) => {
          // Update tokens
          this.storeTokens(response.accessToken, response.refreshToken);
          this.isAuthenticatedSubject.next(true);
        }),
        catchError((error) => {
          console.error('Refresh session error:', error);
          // If refresh fails, clear authentication state
          this.logout();
          return throwError(
            () =>
              new Error(error.error?.message || 'Failed to refresh session'),
          );
        }),
      );
  }

  /**
   * User logout
   */
  logout(): void {
    console.log('Auth: Logging out, clearing authentication state...');

    // Clear local storage
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);

    // Update state
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);

    console.log('Auth: Logout complete, authentication state updated to false');
  }

  /**
   * Get current user (synchronous method)
   * @returns User | null
   */
  getCurrentUserSync(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Check if authenticated
   * @returns boolean
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Get access token
   * @returns string | null
   */
  getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Get refresh token
   * @returns string | null
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  // Private methods

  /**
   * Store authentication data
   */
  private storeAuthData(response: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);

    const user = this.extractUserFromResponse(response);
    this.storeUser(user);
  }

  /**
   * Store tokens
   */
  private storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  /**
   * Store user information
   */
  private storeUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /**
   * Extract user information from response
   */
  private extractUserFromResponse(response: LoginResponse): User {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { accessToken, refreshToken, ...user } = response;
    return user;
  }

  /**
   * Get user information from local storage
   */
  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user from storage:', error);
        localStorage.removeItem(this.USER_KEY);
      }
    }
    return null;
  }

  /**
   * Check if has valid token
   */
  private hasValidToken(): boolean {
    const token = this.getAccessToken();
    if (!token) {
      return false;
    }

    // In a real application, you might want to check token expiration time
    // Here we simply check if token exists
    try {
      // You can add JWT token parsing and expiration time checking here
      // const payload = JSON.parse(atob(token.split('.')[1]));
      // const currentTime = Math.floor(Date.now() / 1000);
      // return payload.exp > currentTime;

      return true; // For now, only check if token exists
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }
  }
}

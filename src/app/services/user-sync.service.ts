import { Injectable, inject, OnDestroy } from '@angular/core';
import { takeUntil, switchMap, tap } from 'rxjs/operators';
import { Subject, timer, Subscription, EMPTY } from 'rxjs';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class UserSyncService implements OnDestroy {
  private authService = inject(Auth);
  private destroy$ = new Subject<void>();
  private currentSyncSubscription: Subscription | null = null;

  constructor() {
    console.log('UserSyncService: Initializing...');
    this.initializeUserSync();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.stopUserSync();
  }

  /**
   * Initialize user synchronization mechanism
   * Listen to authentication status changes, start timer on login, stop timer on logout
   */
  private initializeUserSync(): void {
    console.log('UserSyncService: Setting up authentication listener...');
    
    this.authService.isAuthenticated$
      .pipe(
        tap((isAuthenticated) => {
          console.log('UserSyncService: Authentication status changed:', isAuthenticated);
          
          if (isAuthenticated) {
            this.startUserSync();
          } else {
            this.stopUserSync();
          }
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  /**
   * Start user synchronization timer
   */
  private startUserSync(): void {
    // If there's already a timer running, stop it first
    this.stopUserSync();
    
    console.log('UserSyncService: Starting 10-second interval timer...');
    
    this.currentSyncSubscription = timer(0, 10000) // Execute immediately, then every 10 seconds
      .pipe(
        switchMap((timerCount) => {
          console.log(`UserSyncService: Timer tick #${timerCount + 1}, fetching user info...`);
          
          // Check if user is still authenticated
          if (!this.authService.isAuthenticated()) {
            console.log('UserSyncService: User no longer authenticated, stopping sync');
            return EMPTY; // Stop sending requests
          }
          
          return this.authService.getCurrentUser();
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (user) => {
          console.log('UserSyncService: User info synced successfully:', user);
        },
        error: (error) => {
          console.error('UserSyncService: User sync failed:', error);
          // Error is already handled in AuthInterceptor, just log here
        },
      });
  }

  /**
   * Stop user synchronization
   */
  private stopUserSync(): void {
    if (this.currentSyncSubscription) {
      console.log('UserSyncService: Stopping user sync...');
      this.currentSyncSubscription.unsubscribe();
      this.currentSyncSubscription = null;
    }
  }

  /**
   * Manually trigger user information synchronization
   */
  public syncUserNow(): void {
    console.log('UserSyncService: Manual sync triggered...');
    if (this.authService.isAuthenticated()) {
      this.authService.getCurrentUser().subscribe({
        next: (user) => {
          console.log('UserSyncService: Manual user sync successful:', user);
        },
        error: (error) => {
          console.error('UserSyncService: Manual user sync failed:', error);
        },
      });
    } else {
      console.warn('UserSyncService: Cannot sync - user not authenticated');
    }
  }

  /**
   * Get current synchronization status
   */
  public isSyncActive(): boolean {
    return this.currentSyncSubscription !== null && !this.currentSyncSubscription.closed;
  }
}

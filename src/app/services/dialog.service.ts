import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  showLoginDialog = signal(false);
  loginMessage = signal('');
  showLogoutDialog = signal(false);

  openLoginDialog(message: string) {
    console.log('DialogService:', message);
    this.loginMessage.set(message);
    this.showLoginDialog.set(true);
  }

  closeLoginDialog() {
    this.showLoginDialog.set(false);
    this.loginMessage.set('');
  }

  openLogoutDialog() {
    this.showLogoutDialog.set(true);
  }

  closeLogoutDialog() {
    this.showLogoutDialog.set(false);
  }
}

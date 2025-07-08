import { Component, inject, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-customer-center',
  imports: [CommonModule, TranslateModule],
  templateUrl: './customer-center.html',
  styleUrl: './customer-center.scss',
})
export class CustomerCenter {
  private readonly authService = inject(AuthService);

  user: Signal<User | null> = toSignal(this.authService.currentUser$, {
    initialValue: this.authService.getCurrentUserSync(),
  });

  fullName = computed(() => {
    const currentUser = this.user();
    if (currentUser) {
      return `${currentUser.firstName} ${currentUser.lastName}`;
    }
    return '';
  });

  // Method for backward compatibility
  getFullName(): string {
    return this.fullName();
  }
}

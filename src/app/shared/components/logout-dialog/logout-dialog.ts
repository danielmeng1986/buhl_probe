import { Component, inject, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Auth } from '../../../services';

@Component({
  selector: 'app-logout-dialog',
  imports: [TranslateModule],
  templateUrl: './logout-dialog.html',
  styleUrl: './logout-dialog.scss',
})
export class LogoutDialog {
  // Output events
  dialogClose = output<void>();
  logoutSuccess = output<void>();

  private readonly authService = inject(Auth);

  onConfirm(): void {
    this.authService.logout();
    this.logoutSuccess.emit();
    this.dialogClose.emit();
  }

  onCancel(): void {
    this.dialogClose.emit();
  }
}

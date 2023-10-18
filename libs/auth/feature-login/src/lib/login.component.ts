import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

import { finalize } from 'rxjs';

import {
  AuthService,
  Login,
} from '@private-video-server/shared/data-access-auth';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  isLoading = false;

  loginForm = this.formBuilder.group({
    username: this.formBuilder.control('', [Validators.required]),
    password: this.formBuilder.control('', [Validators.required]),
  });

  constructor(
    private readonly authService: AuthService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly formBuilder: NonNullableFormBuilder,
  ) {}

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;

    this.authService
      .login(this.loginForm.value as Login)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.changeDetectorRef.detectChanges();
        }),
      )
      .subscribe();
  }
}

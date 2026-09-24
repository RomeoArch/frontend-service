import { Component, inject, signal } from '@angular/core';
import { DemoSession } from '../demo-session';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, RouterLink],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class AuthPage {
  private readonly session = inject(DemoSession);
  private readonly router = inject(Router);
  readonly signup = inject(ActivatedRoute).snapshot.data['mode'] === 'signup';
  readonly showPassword = signal(false);
  readonly message = signal('');
  name = '';
  email = '';
  password = '';
  confirmation = '';

  submit(form: NgForm): void {
    this.message.set('');
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    if (this.signup && this.password !== this.confirmation) {
      this.message.set('Your passwords don’t match. Please try again.');
      return;
    }
    if (!this.signup) {
      if (!this.session.login(this.email, this.password)) {
        this.message.set('Demo login: use Sebastian and password 123.');
        return;
      }
      form.resetForm();
      void this.router.navigateByUrl('/admin');
      return;
    }
    form.resetForm();
    this.showPassword.set(false);
    this.message.set(this.signup
      ? 'Sign-up preview complete. No account was created and your details were not sent or saved.'
      : 'Login preview complete. No sign-in took place and your details were not sent or saved.');
  }
}


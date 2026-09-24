import { Injectable, signal } from '@angular/core';

// Frontend demo only: this is not authentication or an authorization boundary.
@Injectable({ providedIn: 'root' })
export class DemoSession {
  readonly isAdmin = signal(false);
  login(username: string, password: string): boolean {
    const accepted = username.trim() === 'Sebastian' && password === '123';
    this.isAdmin.set(accepted);
    return accepted;
  }
  logout(): void { this.isAdmin.set(false); }
}

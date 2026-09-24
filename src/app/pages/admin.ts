import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DemoSession } from '../demo-session';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  template: `
    <section aria-labelledby="admin-title">
      <div class="admin-heading"><div><p class="eyebrow">CODEFORCE / ADMIN PREVIEW</p><h1 id="admin-title">Welcome, Sebastian.</h1><p class="lead">Your community, all in one place.</p></div><button class="logout" (click)="logout()">Log out ↗</button></div>
      <div class="contacts-panel">
        <div class="table-toolbar"><div><h2>Contacts <span>{{ contacts.length }}</span></h2><p>People in your community</p></div><div><label for="contact-search">Search contacts</label><input id="contact-search" type="search" placeholder="Name, email or company" [ngModel]="query()" (ngModelChange)="query.set($event)"></div></div>
        <div class="table-scroll" tabindex="0" role="region" aria-label="Community contacts table">
          <table><caption class="sr-only">Fictional community contacts for the admin mockup</caption><thead><tr><th scope="col">Name</th><th scope="col">Email</th><th scope="col">Company</th></tr></thead><tbody>
            @for (contact of filtered(); track contact.email) { <tr><td><span class="avatar" aria-hidden="true">{{ contact.name.charAt(0) }}</span>{{ contact.name }}</td><td>{{ contact.email }}</td><td>{{ contact.company }}</td></tr> }
            @empty { <tr><td colspan="3" class="empty">No contacts match your search.</td></tr> }
          </tbody></table>
        </div>
        <p class="table-footer" role="status">{{ filtered().length }} of {{ contacts.length }} contacts · Fictional sample data</p>
      </div>
      <p class="demo-note">Frontend mockup only. Demo access resets when you refresh the page.</p>
    </section>
  `,
  styleUrl: './admin.scss',
})
export class AdminPage {
  private readonly session = inject(DemoSession);
  private readonly router = inject(Router);
  readonly query = signal('');
  readonly contacts = [
    { name: 'Anna Weber', email: 'anna.weber@example.com', company: 'Alpine AI Studio' },
    { name: 'Lukas Berger', email: 'lukas.berger@example.com', company: 'Vectorworks Labs' },
    { name: 'Mia Chen', email: 'mia.chen@example.com', company: 'Northstar Research' },
    { name: 'David Fischer', email: 'david.fischer@example.com', company: 'Signal Forge' },
    { name: 'Sofia Rossi', email: 'sofia.rossi@example.com', company: 'Orbit Analytics' },
    { name: 'Jonas Klein', email: 'jonas.klein@example.com', company: 'Alpine AI Studio' },
    { name: 'Leila Haddad', email: 'leila.haddad@example.com', company: 'Brightfield Systems' },
    { name: 'Noah Schmidt', email: 'noah.schmidt@example.com', company: 'Independent' },
  ];
  readonly filtered = computed(() => {
    const query = this.query().trim().toLowerCase();
    return this.contacts.filter(contact => `${contact.name} ${contact.email} ${contact.company}`.toLowerCase().includes(query));
  });
  logout(): void { this.session.logout(); void this.router.navigateByUrl('/login'); }
}

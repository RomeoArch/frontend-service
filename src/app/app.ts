import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '(document:click)': 'closeOnOutsideClick($event)',
    '(document:keydown.escape)': 'openMenu.set(null)',
  },
})
export class App {
  // Sections that are not built yet show a small "Coming soon…" drop-down instead of navigating.
  readonly openMenu = signal<string | null>(null);

  toggle(menu: string) {
    this.openMenu.update((current) => (current === menu ? null : menu));
  }

  closeOnOutsideClick(event: MouseEvent) {
    if (!(event.target as Element).closest('.soon')) this.openMenu.set(null);
  }
}

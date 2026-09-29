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
    '(window:scroll)': 'onScroll()',
  },
})
export class App {
  // Sections that are not built yet show a small "Coming soon…" drop-down instead of navigating.
  readonly openMenu = signal<string | null>(null);
  // Once the page scrolls, the header takes its darker hover look so it stays readable over content.
  readonly scrolled = signal(false);

  onScroll() {
    this.scrolled.set(window.scrollY > 10);
  }

  toggle(menu: string) {
    this.openMenu.update((current) => (current === menu ? null : menu));
  }

  closeOnOutsideClick(event: MouseEvent) {
    if (!(event.target as Element).closest('.soon')) this.openMenu.set(null);
  }
}

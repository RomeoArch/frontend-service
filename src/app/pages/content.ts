import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-content-page',
  imports: [RouterLink],
  template: `
    <section class="content-page">
      <p class="eyebrow">CODEFORCE / {{ content()['label'] }}</p>
      <h1>{{ content()['heading'] }}</h1>
      <p class="lead">{{ content()['description'] }}</p>
      <div class="empty-state"><span class="eyebrow">{{ content()['status'] }}</span><h2>{{ content()['message'] }}</h2><p>{{ content()['detail'] }}</p></div>
      <a class="text-link" routerLink="/">← Back to home</a>
    </section>
  `,
})
export class ContentPage {
  private readonly route = inject(ActivatedRoute);
  readonly content = toSignal(this.route.data, { initialValue: this.route.snapshot.data });
}

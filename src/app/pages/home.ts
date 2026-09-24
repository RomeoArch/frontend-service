import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-heading">
                <p class="eyebrow vector-word"><span class="vector-source">LEARN. BUILD. CONNECT.</span><span class="vector-cloud" aria-hidden="true">@for (particle of vectors; track $index) { <span class="vector-particle" [style.--x]="particle.x" [style.--y]="particle.y" [style.--dx]="particle.dx" [style.--dy]="particle.dy" [style.--turn]="particle.turn"><span class="vector-bracket">[</span>@for (coordinate of particle.coordinates; track $index) {<span class="vector-coordinate" [style.--nx]="coordinate.x" [style.--ny]="coordinate.y" [style.--bend]="coordinate.bend" [style.--spin]="coordinate.spin"><span class="coordinate-number">{{ coordinate.value }}</span><span class="coordinate-dust"></span></span>@if (!$last) {<span class="vector-bracket">, </span>}}<span class="vector-bracket">]</span></span> }</span></p>
                <h1 id="hero-title" class="hero-title" aria-label="Codeforce. GenAi. Community.">
          @for (word of words; track word) {
            <span class="vector-word"><span class="vector-source">{{ word }}</span><span class="vector-cloud" aria-hidden="true">
              @for (particle of vectors; track $index) {
                <span class="vector-particle" [style.--x]="particle.x" [style.--y]="particle.y" [style.--dx]="particle.dx" [style.--dy]="particle.dy" [style.--turn]="particle.turn"><span class="vector-bracket">[</span>@for (coordinate of particle.coordinates; track $index) {<span class="vector-coordinate" [style.--nx]="coordinate.x" [style.--ny]="coordinate.y" [style.--bend]="coordinate.bend" [style.--spin]="coordinate.spin"><span class="coordinate-number">{{ coordinate.value }}</span><span class="coordinate-dust"></span></span>@if (!$last) {<span class="vector-bracket">, </span>}}<span class="vector-bracket">]</span></span>
              }
            </span></span>
          }
        </h1>
      </div>
    </section>
    <section class="home-details" aria-label="Discover Codeforce">
      <div class="hero-intro">
        <p class="lead">Learn, build and connect with a community exploring the future of generative AI. A place for curious minds and ideas worth sharing.</p>
                <div class="meetup-actions">
          <a class="meetup-button meetup-button--primary" href="https://www.meetup.com/ai-austria/events/316278162/?eventOrigin=group_events_list" target="_blank" rel="noopener noreferrer">Join Meetup September<span class="sr-only"> (opens in a new tab)</span></a>
          <a class="meetup-button meetup-button--secondary" href="https://romeoarch.github.io/my-presentation/#last-meetup" target="_blank" rel="noopener noreferrer">View Last Presentation<span class="sr-only"> (opens in a new tab)</span></a>
        </div>
        <p class="next-meetup">Next meetup: <time datetime="2026-09-30T17:00:00+02:00">Wednesday, Sep 30 · 5:00 PM to 6:30 PM CEST</time></p>
      </div>
    </section>
    <section class="explore" aria-labelledby="explore-heading">
      <div class="section-heading"><p class="eyebrow">MAKE YOURSELF AT HOME</p><h2 id="explore-heading">A community in the making.</h2></div>
      <div class="tile-grid">
        <a class="tile" routerLink="/meetups"><span class="tile-number">01 / GET TOGETHER</span><h3>Meetups <span>↗</span></h3><p>Discover future events and opportunities to connect.</p></a>
        <a class="tile" routerLink="/projects"><span class="tile-number">02 / BUILD SOMETHING</span><h3>Projects <span>↗</span></h3><p>Explore ideas and experiments from the community.</p></a>
        <a class="tile" routerLink="/community"><span class="tile-number">03 / FIND YOUR PEOPLE</span><h3>Community <span>↗</span></h3><p>Help shape what comes next. Learn and grow together.</p></a>
      </div>
    </section>
  `,
})
export class HomePage {
  readonly words = ['Codeforce.', 'GenAi.', 'Community.'];
  // Deterministic decorative embedding coordinates; no model or network request.
  readonly vectors = Array.from({ length: 4 }, (_, index) => {
    const direction = index % 3;
    return {
      x: `${index % 2 === 0 ? 0 : 8}%`,
      y: `${(index - 1) * 34}px`,
      dx: `${direction === 0 ? -180 - index * 18 : direction === 2 ? 180 + index * 18 : (index - 6) * 12}px`,
      dy: `${direction === 1 ? -320 - index * 16 : -70 - index * 19}px`,
      turn: `${(index % 5 - 2) * 9}deg`,
      coordinates: Array.from({ length: 4 }, (_, dimension) => {
        const seed = index * 4 + dimension + 1;
        // Seeded paths look organic but remain stable when scrolling backward.
        const noise = (offset: number) => {
          const value = Math.sin(seed * 127.1 + offset * 311.7) * 43758.5453;
          return value - Math.floor(value);
        };
        return {
          value: Math.sin(index * 2.7 + dimension * 1.9).toFixed(2),
          x: `${(noise(1) - .5) * 900}px`,
          y: `${-100 - noise(2) * 460}px`,
          bend: `${(noise(3) - .5) * 190}px`,
          spin: `${(noise(4) - .5) * 140}deg`,
        };
      }),
    };
  });
}





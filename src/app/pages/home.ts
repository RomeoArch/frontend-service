import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PAST_MEETUPS, PastMeetup } from '../data/past-meetups';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-heading">
        <div class="hero-lockup">
                <p class="eyebrow vector-word"><span class="vector-source">LEARN. BUILD. CONNECT.</span></p>
                <h1 id="hero-title" class="hero-title" aria-label="Codeforce. GenAi. Community.">
          @for (word of words; track word) {
            <span class="vector-word"><span class="vector-source">{{ word }}</span></span>
          }
        </h1>
          <!-- One embedding cloud spanning the whole heading: eyebrow and title. -->
          <span class="vector-cloud heading-cloud" aria-hidden="true">
            @for (particle of vectors; track $index) {
              <span class="vector-particle" [style.--x]="particle.x" [style.--y]="particle.y" [style.--dx]="particle.dx" [style.--dy]="particle.dy" [style.--turn]="particle.turn" [style.--fade]="particle.fade">@for (coordinate of particle.coordinates; track $index) {<span class="vector-coordinate" [style.--nx]="coordinate.x" [style.--ny]="coordinate.y" [style.--bend]="coordinate.bend" [style.--spin]="coordinate.spin" [style.--start]="coordinate.start" [style.--end]="coordinate.end">@if ($first) {<span class="vector-bracket">[</span>}<span class="coordinate-number">{{ coordinate.value }}</span><span class="vector-bracket">{{ $last ? ']' : ', ' }}</span><span class="coordinate-dust"></span></span>}</span>
            }
          </span>
        </div>
      </div>
    </section>
    <section class="home-details" aria-label="Discover Codeforce">
      <div class="hero-intro">
        <p class="lead">GenAI Codeforce brings together developers, AI engineers and GenAI enthusiasts to share what's new, learn from real-world projects and exchange practical experience.</p>
        <p class="tagline">A monthly online meetup on the latest in GenAI, with live demos from builders.</p>
        <div class="meetup-cards">
          <div class="meetup-card">
            <span class="meetup-card-label">Next meetup</span>
            <time class="meetup-card-date" [attr.datetime]="nextMeetup.start.toISOString()">{{ nextMeetup.day }}<span class="meetup-card-time">{{ nextMeetup.time }}</span></time>
          </div>
          <div class="meetup-card">
            <span class="meetup-card-label">Starts in</span>
            @if (countdown(); as c) {
              <p class="countdown" aria-live="off">
                <span><strong>{{ c.days }}</strong> days</span>
                <span><strong>{{ c.hours }}</strong> hrs</span>
                <span><strong>{{ c.minutes }}</strong> min</span>
                <span><strong>{{ c.seconds }}</strong> sec</span>
              </p>
            } @else {
              <p class="countdown countdown--live">Happening now or just wrapped up. See you next month!</p>
            }
          </div>
          <div class="meetup-card">
            <span class="meetup-card-label">Save your spot</span>
            <a class="meetup-button meetup-button--primary" [href]="nextMeetup.url" target="_blank" rel="noopener noreferrer">Join the meetup<span class="sr-only"> (opens in a new tab)</span></a>
          </div>
        </div>
      </div>
    </section>
    <section #format class="format" [class.is-visible]="formatVisible()" aria-labelledby="format-heading">
      <div class="section-heading"><p class="eyebrow">WHAT HAPPENS AT A MEETUP</p><h2 id="format-heading">One evening online. Three parts. Always interactive.</h2></div>
      <ol class="format-steps">
        @for (step of formatSteps; track step.title) {
          <li class="format-step" [style.--i]="$index">
            <span class="format-step-number" aria-hidden="true">0{{ $index + 1 }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </li>
        }
      </ol>
      <div class="format-discussion">
        <span class="meetup-card-label">Open discussion throughout</span>
        <p>Ask questions, share opinions and challenge ideas at every step.</p>
      </div>
    </section>
    <section class="past" aria-labelledby="past-heading">
      <div class="section-heading"><p class="eyebrow">PAST MEETUPS</p><h2 id="past-heading">What we talked about.</h2></div>
      <ol class="past-list">
        @for (meetup of pastMeetups; track meetup.month) {
          <li>
            <button type="button" class="past-card" (click)="openMeetup(meetup)" [attr.aria-label]="'Open details: ' + meetup.title">
              <div class="past-media">
                @if (meetup.image && !brokenImages().has(meetup.image)) {
                  <img [src]="meetup.image" alt="" loading="lazy" (error)="markBroken(meetup.image)" />
                } @else {
                  <span class="past-media-empty" aria-hidden="true">{{ monthLabel(meetup.month) }}</span>
                }
              </div>
              <div class="past-body">
                <time class="meetup-card-label" [attr.datetime]="meetup.month">{{ monthLabel(meetup.month) }} meetup</time>
                <h3>{{ meetup.title }}</h3>
                <span class="past-more" aria-hidden="true">View recap</span>
              </div>
            </button>
          </li>
        }
      </ol>
      <dialog #meetupDialog class="past-dialog" aria-labelledby="past-dialog-title" (click)="onDialogClick($event)" (close)="selectedMeetup.set(null)">
        @if (selectedMeetup(); as m) {
          <button type="button" class="past-dialog-close" (click)="closeMeetup()" aria-label="Close">×</button>
          @if (m.image && !brokenImages().has(m.image)) {
            <img class="past-dialog-image" [src]="m.image" [alt]="'Screenshot of the ' + m.title + ' call'" />
          }
          <div class="past-dialog-body">
            <time class="meetup-card-label" [attr.datetime]="m.month">{{ monthLabel(m.month) }} meetup</time>
            <h3 id="past-dialog-title">{{ m.title }}</h3>
            @for (paragraph of m.description; track $index) {
              <p class="past-dialog-intro">{{ paragraph }}</p>
            }
            @if (m.linkedinUrl) {
              <a class="past-link" [href]="m.linkedinUrl" target="_blank" rel="noopener noreferrer">Read the post on LinkedIn ↗<span class="sr-only"> (opens in a new tab)</span></a>
            }
          </div>
        }
      </dialog>
    </section>
    <section class="explore" aria-labelledby="explore-heading">
      <div class="section-heading"><p class="eyebrow">MAKE YOURSELF AT HOME</p><h2 id="explore-heading">A community in the making.</h2></div>
      <div class="tile-grid">
        <a class="tile" routerLink="/meetups"><span class="tile-number">01 / GET TOGETHER</span><h3>Meetups <span>↗</span></h3><p>Discover future events and opportunities to connect.</p></a>
        <a class="tile" routerLink="/projects"><span class="tile-number">02 / BUILD SOMETHING</span><h3>Projects <span>↗</span></h3><p>Explore ideas and experiments from the community.</p></a>
        <a class="tile" routerLink="/community"><span class="tile-number">03 / FIND YOUR PEOPLE</span><h3>Community <span>↗</span></h3><p>Help shape what comes next. Learn and grow together.</p></a>
      </div>
    </section>
    <section class="contact" aria-labelledby="contact-heading">
      <div class="section-heading"><p class="eyebrow">STAY IN THE LOOP</p><h2 id="contact-heading">Get in touch.</h2><p class="contact-text">Join our GenAI community or follow us for updates, demos and meetup announcements.</p></div>
      <div class="contact-grid">
        <a class="contact-card contact-card--discord" href="https://discord.gg/wFFNwD2j8" target="_blank" rel="noopener noreferrer">
          <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 12.3 12.3 0 0 0-.608 1.25 18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
          <span class="contact-title">Discord<span class="sr-only"> (opens in a new tab)</span></span>
        </a>
        <a class="contact-card contact-card--linkedin" href="https://www.linkedin.com/groups/13093396/" target="_blank" rel="noopener noreferrer">
          <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
          <span class="contact-title">LinkedIn<span class="sr-only"> (opens in a new tab)</span></span>
        </a>
        <div class="contact-card contact-card--github contact-card--soon" aria-disabled="true">
          <span class="contact-badge">Coming soon…</span>
          <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
          <span class="contact-title">GitHub</span>
        </div>
        <a class="contact-card contact-card--partners" href="https://www.linkedin.com/company/aiaustria/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
          <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
          <span class="contact-title">Partners<span class="sr-only"> (opens in a new tab)</span></span>
        </a>
      </div>
    </section>
  `,
})
export class HomePage {
  // Update this once a month for the next session.
  readonly nextMeetup = {
    start: new Date('2026-09-30T17:00:00+02:00'),
    end: new Date('2026-09-30T18:30:00+02:00'),
    day: 'Wednesday, Sep 30',
    time: '5:00 PM to 6:30 PM CEST',
    url: 'https://www.meetup.com/ai-austria/events/316278162/?eventOrigin=group_events_list',
  };

  readonly formatSteps = [
    { title: 'GenAI news', text: "The month's biggest releases and announcements." },
    { title: 'Papers & tech', text: 'New research and tools, explained in plain words.' },
    { title: 'Live demos', text: 'Builders show real projects, live.' },
  ];

  readonly pastMeetups = [...PAST_MEETUPS].sort((a, b) => b.month.localeCompare(a.month));
  readonly brokenImages = signal(new Set<string>());

  monthLabel(month: string) {
    return new Date(`${month}-01T12:00:00`).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  readonly selectedMeetup = signal<PastMeetup | null>(null);
  private readonly meetupDialog = viewChild.required<ElementRef<HTMLDialogElement>>('meetupDialog');

  openMeetup(meetup: PastMeetup) {
    this.selectedMeetup.set(meetup);
    this.meetupDialog().nativeElement.showModal();
  }

  closeMeetup() {
    this.meetupDialog().nativeElement.close();
  }

  // Clicking the dimmed backdrop (the dialog element itself, outside its content) closes it.
  onDialogClick(event: MouseEvent) {
    if (event.target === event.currentTarget) this.closeMeetup();
  }

  markBroken(image: string) {
    this.brokenImages.update(set => new Set(set).add(image));
  }

  readonly formatVisible = signal(false);
  private readonly formatSection = viewChild.required<ElementRef<HTMLElement>>('format');

  private readonly now = signal(Date.now());
  readonly countdown = computed(() => {
    const ms = this.nextMeetup.start.getTime() - this.now();
    if (ms <= 0) return null;
    const pad = (n: number) => String(n).padStart(2, '0');
    const s = Math.floor(ms / 1000);
    return { days: Math.floor(s / 86400), hours: pad(Math.floor(s / 3600) % 24), minutes: pad(Math.floor(s / 60) % 60), seconds: pad(s % 60) };
  });

  constructor() {
    const timer = setInterval(() => this.now.set(Date.now()), 1000);
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => clearInterval(timer));

    // Play the "what happens" sequence once, when the section scrolls into view.
    afterNextRender(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        this.formatVisible.set(true);
        observer.disconnect();
      }, { threshold: .35 });
      observer.observe(this.formatSection().nativeElement);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  readonly words = ['Codeforce.', 'GenAi.', 'Community.'];
  // Enough, long enough vectors for one cloud to fill the whole heading.
  readonly vectors = this.createVectors(9, 22);

  // Deterministic decorative embedding coordinates; no model or network request.
  private createVectors(count: number, dimensions: number) {
    return Array.from({ length: count }, (_, index) => {
      const direction = index % 3;
      return {
        x: `${index % 2 === 0 ? 0 : 8}%`,
        y: `${(index - (count - 1) / 2) * 24}px`,
        dx: `${direction === 0 ? -180 - index * 18 : direction === 2 ? 180 + index * 18 : (index - 6) * 12}px`,
        dy: `${direction === 1 ? -320 - index * 16 : -70 - index * 19}px`,
        turn: `${(index % 5 - 2) * 9}deg`,
        // Brackets dissolve at slightly different moments per vector.
        fade: `${34 + index * 2}%`,
        coordinates: Array.from({ length: dimensions }, (_, dimension) => {
          const seed = index * dimensions + dimension + 1;
          // Seeded paths look organic but remain stable when scrolling backward.
          const noise = (offset: number) => {
            const value = Math.sin(seed * 127.1 + offset * 311.7) * 43758.5453;
            return value - Math.floor(value);
          };
          const start = noise(5) * 1.5;
          return {
            value: (noise(6) * 2 - 1).toFixed(3),
            x: `${(noise(1) - .5) * 1000}px`,
            y: `${-120 - noise(2) * 520}px`,
            bend: `${(noise(3) - .5) * 240}px`,
            spin: `${(noise(4) - .5) * 220}deg`,
            // Each number breaks away on its own schedule, once the vector has been readable for a moment.
            start: `${start}%`,
            end: `${start + 55 + noise(7) * 15}%`,
          };
        }),
      };
    });
  }
}

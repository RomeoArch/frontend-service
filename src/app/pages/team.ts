import { Component } from '@angular/core';
import { TEAM } from '../data/team';

/** Rasterizes the Codeforce atom (three orbits at 0/60/120°) onto a pixel grid, like an 8-bit sprite. */
function pixelAtom(size = 49, rx = 22, ry = 8) {
  const c = Math.floor(size / 2);
  const orbits = [0, 60, 120].map(deg => {
    const a = deg * Math.PI / 180;
    const line: [number, number][] = [];
    for (let i = 0; i < 1440; i++) {
      const t = i / 1440 * 2 * Math.PI;
      const ex = rx * Math.cos(t), ey = ry * Math.sin(t);
      const p: [number, number] = [Math.round(c + ex * Math.cos(a) - ey * Math.sin(a)), Math.round(c + ex * Math.sin(a) + ey * Math.cos(a))];
      const last = line[line.length - 1];
      if (!last || last[0] !== p[0] || last[1] !== p[1]) line.push(p);
    }
    // Drop "L" corners so each orbit is a clean 1-pixel line.
    const kept: [number, number][] = [];
    for (const p of line) {
      const before = kept[kept.length - 2];
      if (before && Math.abs(before[0] - p[0]) <= 1 && Math.abs(before[1] - p[1]) <= 1) kept.pop();
      kept.push(p);
    }
    return kept.map(([x, y]) => `M${x} ${y}h1v1h-1z`).join('');
  });
  return { size, orbits };
}

const ATOM = pixelAtom();

@Component({
  selector: 'app-team-page',
  styleUrl: './team.scss',
  template: `
    <section class="team-page" aria-labelledby="team-heading">
      <div class="section-heading team-heading">
        <p class="eyebrow">CODEFORCE / TEAM</p>
        <h1 id="team-heading">Builders. Hosts. Enthusiasts.</h1>
        <p class="lead">Meet the organizers behind every Codeforce meetup.</p>
      </div>
      <ul class="team-grid">
        @for (member of team; track member.name) {
          <li class="team-card">
            <!-- Avatar drawn as a pixel-art Codeforce atom. -->
            <div class="team-atom">
              <svg class="team-pixels" [attr.viewBox]="'0 0 ' + atom.size + ' ' + atom.size" shape-rendering="crispEdges" aria-hidden="true">
                @for (orbit of atom.orbits; track $index) {
                  <path [attr.d]="orbit" />
                }
              </svg>
            </div>
            <h2 class="team-name">{{ member.name }}</h2>
            <p class="team-profession">{{ member.profession }}</p>
            @if (member.linkedinUrl) {
              <a class="team-linkedin" [href]="member.linkedinUrl" target="_blank" rel="noopener noreferrer" [attr.aria-label]="member.name + ' on LinkedIn (opens in a new tab)'">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            } @else {
              <span class="team-linkedin team-linkedin--empty" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </span>
            }
          </li>
        }
      </ul>
    </section>
  `,
})
export class TeamPage {
  readonly team = TEAM;
  readonly atom = ATOM;
}

import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';

describe('Public pages', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter(routes)] }));

  it('renders home and navigates between content pages', async () => {
    const harness = await RouterTestingHarness.create('/');
    expect(harness.routeNativeElement?.querySelector('h1')?.getAttribute('aria-label')).toBe('Codeforce. GenAi. Community.');
    await harness.navigateByUrl('/meetups');
    expect(harness.routeNativeElement?.textContent).toContain('No events published'.toUpperCase());
    await harness.navigateByUrl('/contact');
    expect(harness.routeNativeElement?.textContent).toContain('Start a conversation.');
    expect(harness.routeNativeElement?.textContent).not.toContain('Let’s get together.');
  });

  it('shows a helpful page for unknown routes', async () => {
    const harness = await RouterTestingHarness.create('/missing-page');
    expect(harness.routeNativeElement?.textContent).toContain('The page you are looking for does not exist.');
  });
});



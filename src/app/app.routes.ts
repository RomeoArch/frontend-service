import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { DemoSession } from './demo-session';

export const routes: Routes = [
  { path: 'admin', title: 'Admin contacts | Codeforce', canActivate: [() => inject(DemoSession).isAdmin() || inject(Router).createUrlTree(['/login'])], loadComponent: () => import('./pages/admin').then(m => m.AdminPage) },
  { path: '', title: 'Codeforce | Community', loadComponent: () => import('./pages/home').then(m => m.HomePage) },
  { path: 'login', title: 'Log in | Codeforce', loadComponent: () => import('./pages/auth').then(m => m.AuthPage), data: { mode: 'login' } },
  { path: 'signup', title: 'Sign up | Codeforce', loadComponent: () => import('./pages/auth').then(m => m.AuthPage), data: { mode: 'signup' } },
  ...[
    { path: 'projects', label: 'Projects', heading: 'Ideas become real here.', description: 'Explore what our community is building with generative AI.', status: 'COMING SOON', message: 'Built with curiosity. Shared with everyone.', detail: 'Community projects and experiments will appear here as they are published.' },
    { path: 'research', label: 'Research', heading: 'Ideas worth exploring.', description: 'Explore the questions and projects that bring our community together.', status: 'COMING SOON', message: 'Research starts with a question.', detail: 'Our projects, findings, and publications will appear here.' },
    { path: 'team', label: 'Team', heading: 'Meet the people behind Codeforce.', description: 'A team connected by curiosity and the drive to build.', status: 'COMING SOON', message: 'Get to know our team.', detail: 'Team profiles will be introduced here soon.' },
    { path: 'community', label: 'Community', heading: 'A place to belong.', description: 'Connect with curious builders, exchange ideas, and learn together.', status: 'GROW WITH US', message: 'Good things happen together.', detail: 'Explore our meetups from the home page or visit Contact to learn how to get involved.' },
    { path: 'about', label: 'About', heading: 'Built around curiosity.', description: 'Codeforce is a space for people who enjoy learning, building, and exchanging ideas.', status: 'OUR STORY', message: 'Every community starts with a conversation.', detail: 'This is starter content. Our story, values, and team will be introduced here.' },
    { path: 'speakers', label: 'Speakers', heading: 'People behind the ideas.', description: 'A space for the voices, experience, and perspectives of our community.', status: 'COMING SOON', message: 'Our speaker lineup is taking shape.', detail: 'Speaker profiles will appear here once they are announced.' },
    { path: 'meetups', label: 'Meetups', heading: 'Let’s get together.', description: 'Conversations, shared learning, and opportunities to build something together.', status: 'NO EVENTS PUBLISHED', message: 'Something good is on the horizon.', detail: 'Upcoming meetups will appear here. Registration is not available yet.' },
    { path: 'contact', label: 'Contact', heading: 'Start a conversation.', description: 'Want to speak, collaborate, or help shape the community?', status: 'COMING SOON', message: 'Our contact details are on the way.', detail: 'We will publish a contact channel here. This starter does not collect or send messages.' },
  ].map(page => ({ path: page.path, title: `${page.label} | Codeforce`, loadComponent: () => import('./pages/content').then(m => m.ContentPage), data: page })),
  { path: '**', title: 'Page not found | Codeforce', loadComponent: () => import('./pages/content').then(m => m.ContentPage), data: { label: '404', heading: 'A little off the path.', description: 'The page you are looking for does not exist.', status: 'PAGE NOT FOUND', message: 'Let’s head back.', detail: 'Use the navigation or return to the home page below.' } },
];





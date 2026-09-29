export interface TeamMember {
  name: string;
  profession: string;
  linkedinUrl?: string;
}

export const TEAM: TeamMember[] = [
  { name: 'Philipp Besinger', profession: 'Senior AI Scientist', linkedinUrl: 'https://www.linkedin.com/in/philipp-besinger-622218219/' },
  { name: 'Sebastian Archila', profession: 'Data Systems Architect', linkedinUrl: 'https://www.linkedin.com/in/sebastian-archila-567565213/' },
  { name: 'Daniel Noszian', profession: 'AI Cybersecurity Expert', linkedinUrl: 'https://www.linkedin.com/in/dnos/' },
  { name: 'Ruben Heftfleisch', profession: 'AI Expert & Innovator', linkedinUrl: 'https://www.linkedin.com/in/rubenhetfleisch/' },
];

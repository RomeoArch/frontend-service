export interface PastMeetup {
  /** ISO month, e.g. '2026-08'. Used for sorting and the date label. */
  month: string;
  /** Short headline shown on the compact card. */
  title: string;
  /** Paragraphs shown in the expanded view. */
  description: string[];
  /** File in public/meetups/, e.g. 'meetups/2026-08.jpg'. */
  image?: string;
  linkedinUrl?: string;
}

// Add one entry per meetup; the page sorts them newest first.
export const PAST_MEETUPS: PastMeetup[] = [
  {
    month: '2026-07',
    title: 'Inside the Agent Harness',
    description: [
      'Bernhard Götzendorfer took us inside the agent harness behind the winning BitGN + AIM PAC 2026 hackathon project: the architecture, guardrails and engineering decisions that turn a raw LLM into an agent you can actually trust.',
      'A hands-on look at what makes an AI agent reliable in the real world, from tools and evaluation to execution logic.',
    ],
    image: 'meetups/2026-07.jpg',
  },
  {
    month: '2026-01',
    title: 'Building a Transformer from Scratch',
    description: [
      'Daniel Valtiner walked through a self-built Transformer, breaking the architecture that changed the world into clear, understandable components.',
      'Nearly 50 participants joined. No buzzwords, just real engineering and deep dives into how things work under the hood.',
    ],
    image: 'meetups/2026-01.jpg',
  },
  {
    month: '2026-05',
    title: 'Building an On-Prem AI Platform',
    description: [
      'Wolfgang Dummer showed how to set up and scale on-premise infrastructure for local and sovereign AI, tracing the genesis of a custom multi-tenant AI cluster.',
      'A journey from bare metal to a fully working developer environment: hardware, Kubernetes, platform and custom tooling. Because true control comes from owning the stack.',
    ],
    image: 'meetups/2026-05.jpg',
  },
  {
    month: '2026-04',
    title: 'Taming LLMs',
    description: [
      'Joerg Simon showed how to make an agentic system do exactly what you want, with a deep dive into fine-tuning, distillation and deterministic guardrails.',
      'No more accepting whatever the model decides to output: this session was all about control, precision and reliability.',
    ],
    image: 'meetups/2026-04.jpg',
  },
];

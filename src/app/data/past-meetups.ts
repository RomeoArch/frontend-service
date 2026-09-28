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
    month: '2026-01',
    title: 'Building a Transformer from Scratch',
    description: [
      'Daniel Valtiner walked through a self-built Transformer, breaking the architecture that changed the world into clear, understandable components.',
      'Nearly 50 participants joined. No buzzwords, just real engineering and deep dives into how things work under the hood.',
    ],
    image: 'meetups/2026-01.jpg',
  },
];

export type ReviewFixture = {
  author: string;
  rating: number;
  body: string;
};

const DEFAULT_REVIEWS: readonly ReviewFixture[] = [
  {
    author: "Morgan R.",
    rating: 5,
    body: "The setup was straightforward and the product has been dependable every day.",
  },
  {
    author: "Taylor K.",
    rating: 4,
    body: "Solid build quality and sensible controls, though the packaging could be smaller.",
  },
];

const REVIEW_FIXTURES: Readonly<Record<string, readonly ReviewFixture[]>> = {
  "headphones-01": [
    {
      author: "Avery P.",
      rating: 5,
      body: "Comfortable for long work sessions, with balanced sound and excellent noise cancellation.",
    },
    {
      author: "Jordan L.",
      rating: 4,
      body: "The battery easily lasts through several workdays and switching devices is seamless.",
    },
  ],
  "keyboard-01": [
    {
      author: "Casey M.",
      rating: 5,
      body: "The tactile switches feel precise without becoming distracting during calls.",
    },
    {
      author: "Riley S.",
      rating: 4,
      body: "Compact enough for a small desk while keeping the keys I use most often.",
    },
  ],
  "webcam-01": [
    {
      author: "Sam D.",
      rating: 5,
      body: "The picture stays sharp in uneven light and automatic framing works reliably.",
    },
    {
      author: "Jamie C.",
      rating: 4,
      body: "Clear video and useful privacy controls make this a strong work-from-home upgrade.",
    },
  ],
  "microphone-01": [
    {
      author: "Drew H.",
      rating: 5,
      body: "Voice recordings sound natural and the tap-to-mute control is easy to trust.",
    },
    {
      author: "Quinn B.",
      rating: 4,
      body: "A clean signal with minimal setup and a sturdy stand for everyday calls.",
    },
  ],
};

export const getReviewFixtures = (productId: string) =>
  REVIEW_FIXTURES[productId] ?? DEFAULT_REVIEWS;

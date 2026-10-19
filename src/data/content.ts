export type BrandColour = 'cobalt' | 'sky' | 'navy' | 'spark';

export interface Pillar {
  id: string;
  title: string;
  colour: BrandColour;
  /** One-line summary for the home page. */
  summary: string;
  /** Longer description for How we work. */
  description: string;
  points: string[];
}

export const pillars: Pillar[] = [
  {
    id: 'technology',
    title: 'Technology',
    colour: 'cobalt',
    summary: 'Product, engineering and infrastructure from people who have built at scale.',
    description:
      'Technology is where we start, not an afterthought. Every venture gets product, engineering and infrastructure built properly from the first line.',
    points: [
      'Product design and engineering teams',
      'Secure, scalable infrastructure',
      'Data, automation and AI where it saves people time',
    ],
  },
  {
    id: 'platform',
    title: 'Platform',
    colour: 'sky',
    summary:
      'Shared foundations — finance, legal, compliance and operations — so the team can focus on the work that matters.',
    description:
      'The parts of running a company that every venture needs and none should rebuild alone, shared across the lab.',
    points: [
      'Finance, accounting and payroll',
      'Legal, regulatory and compliance support',
      'People, operations and workspace',
    ],
  },
  {
    id: 'governance',
    title: 'Governance',
    colour: 'navy',
    summary:
      'Boards, controls and reporting that make a young company trustworthy and investable from day one.',
    description:
      'Good governance is what turns a promising idea into a business people can trust: customers, regulators and investors alike.',
    points: [
      'Board structure and oversight',
      'Risk, controls and audit readiness',
      'Clear, regular reporting',
    ],
  },
  {
    id: 'capital',
    title: 'Access to capital',
    colour: 'spark',
    summary:
      'Introductions to the investors and lenders that are right for each venture, at each stage.',
    description:
      'The right money at the right time matters as much as the amount. We prepare each venture to raise well and open the right doors.',
    points: [
      'Investment readiness and financial modelling',
      'Introductions to investors and lenders',
      'Support through every round',
    ],
  },
];

export interface Step {
  number: string;
  title: string;
  /** Short version for the home page. */
  short: string;
  /** Long version for How we work. */
  long: string;
}

export const journey: Step[] = [
  {
    number: '01',
    title: 'Build',
    short:
      'We shape the idea, assemble the right team and lay the technical and corporate foundations.',
    long: 'We test the idea, shape the business model and bring the right people together. Then we lay the foundations: the product, the company and the controls.',
  },
  {
    number: '02',
    title: 'Grow',
    short:
      'We stay close — technology, governance and the right capital conversations as the venture finds its market.',
    long: 'We work alongside the team as the venture finds its customers: shipping, hiring, reporting and preparing for the capital it needs next.',
  },
  {
    number: '03',
    title: 'Fly',
    short: 'When the venture is ready to fly on its own, we give it room — and stay in its corner.',
    long: 'When the venture can stand on its own, it does. We give it room to fly, keep a seat at the table and stay in its corner.',
  },
];

export const lookingFor = [
  {
    title: 'People with drive',
    body: 'Builders who care about the work and the people it serves, and who want to run something of their own.',
  },
  {
    title: 'A real problem',
    body: 'Ideas that solve something people already feel, in markets we understand.',
  },
  {
    title: 'Room to last',
    body: 'Businesses that can grow into lasting companies, not quick exits.',
  },
] as const;

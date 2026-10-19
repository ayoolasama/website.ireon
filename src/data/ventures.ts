export type VentureTrack = 'roots' | 'signal';

export interface Venture {
  id: string;
  name: string;
  /** roots = established/traditional business; signal = technology venture. */
  track: VentureTrack;
  stage: string;
  sector: string;
  /** One sentence: what it does and for whom (under ~120 characters). */
  summary: string;
  /** One or two characters for the arch monogram. Defaults to the name's first letter. */
  monogram?: string;
  /** Optional link to the venture's own site or a detail page. */
  href?: string;
}

/**
 * The portfolio. Replace these placeholders with real ventures before launch —
 * the Ventures page renders whatever is in this list.
 */
export const ventures: Venture[] = [
  {
    id: 'venture-a',
    name: '[Venture name]',
    track: 'roots',
    stage: '[Stage]',
    sector: '[Sector · City]',
    summary: '[One sentence on what it does and for whom.]',
    monogram: 'A',
  },
  {
    id: 'venture-b',
    name: '[Venture name]',
    track: 'signal',
    stage: '[Stage]',
    sector: '[Sector · City]',
    summary: '[One sentence on what it does and for whom.]',
    monogram: 'B',
  },
  {
    id: 'venture-c',
    name: '[Venture name]',
    track: 'roots',
    stage: '[Stage]',
    sector: '[Sector · City]',
    summary: '[One sentence on what it does and for whom.]',
    monogram: 'C',
  },
  {
    id: 'venture-d',
    name: '[Venture name]',
    track: 'signal',
    stage: '[Stage]',
    sector: '[Sector · City]',
    summary: '[One sentence on what it does and for whom.]',
    monogram: 'D',
  },
  {
    id: 'venture-e',
    name: '[Venture name]',
    track: 'signal',
    stage: '[Stage]',
    sector: '[Sector · City]',
    summary: '[One sentence on what it does and for whom.]',
    monogram: 'E',
  },
];

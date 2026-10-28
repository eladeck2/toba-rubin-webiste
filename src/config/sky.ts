/**
 * Sky palettes for A day in a life. Each moment names one of these keys in its
 * frontmatter; the scroll engine interpolates between neighbouring moments.
 * Anchors come from the design doc (dawn #F6D8C4, day #FBF5EC, golden #F3C99B,
 * dusk #C97B63 → #3E3550, night #1B2033). Dark-mode skies are dimmed so daytime
 * scenes don't glare against the warm-brown theme.
 */

export type SkyKey = 'dawn' | 'morning' | 'day' | 'golden' | 'dusk' | 'night';

export interface Sky {
  top: string;
  bottom: string;
  /** far and near hill fills */
  hillFar: string;
  hillNear: string;
  /** 'dark' switches line art and header ink to their light variants */
  tone: 'light' | 'dark';
  /** 0..1 star visibility */
  stars: number;
}

export const skies: Record<'light' | 'dark', Record<SkyKey, Sky>> = {
  light: {
    dawn:    { top: '#EFC9B6', bottom: '#F6D8C4', hillFar: '#EBCDB9', hillNear: '#E4C7AE', tone: 'light', stars: 0 },
    morning: { top: '#F4E2D2', bottom: '#FBF5EC', hillFar: '#ECDCC6', hillNear: '#E2D3B8', tone: 'light', stars: 0 },
    day:     { top: '#F3ECDF', bottom: '#FBF5EC', hillFar: '#E8DFCB', hillNear: '#DCD5B9', tone: 'light', stars: 0 },
    golden:  { top: '#F0C496', bottom: '#F7E2C6', hillFar: '#E6C49C', hillNear: '#D9B98D', tone: 'light', stars: 0 },
    dusk:    { top: '#3E3550', bottom: '#C97B63', hillFar: '#7A4F52', hillNear: '#5A3C45', tone: 'dark', stars: 0.35 },
    night:   { top: '#141827', bottom: '#1B2033', hillFar: '#22283C', hillNear: '#1A1F30', tone: 'dark', stars: 1 },
  },
  dark: {
    dawn:    { top: '#3D2B2B', bottom: '#4E3530', hillFar: '#3A2A26', hillNear: '#30231F', tone: 'dark', stars: 0.1 },
    morning: { top: '#3A2E28', bottom: '#47372E', hillFar: '#372B24', hillNear: '#2E241E', tone: 'dark', stars: 0 },
    day:     { top: '#342D29', bottom: '#433830', hillFar: '#352C25', hillNear: '#2C251F', tone: 'dark', stars: 0 },
    golden:  { top: '#4F3624', bottom: '#5E4330', hillFar: '#43301F', hillNear: '#38281A', tone: 'dark', stars: 0 },
    dusk:    { top: '#272236', bottom: '#5A3A33', hillFar: '#3E2C33', hillNear: '#30232A', tone: 'dark', stars: 0.4 },
    night:   { top: '#0F121D', bottom: '#171B2B', hillFar: '#1C2132', hillNear: '#151927', tone: 'dark', stars: 1 },
  },
};

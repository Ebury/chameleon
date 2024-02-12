import { type IntRange } from 'type-fest';

export interface FullScreenOverlayProps {
  title?: string,
  show?: boolean,
  backgroundColorLevel?: IntRange<0, 9>,
}

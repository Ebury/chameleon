import type { NumericRange } from '../../main';

export interface FullScreenOverlayProps {
  title?: string,
  show?: boolean,
  backgroundColorLevel?: NumericRange<0, 8>,
}

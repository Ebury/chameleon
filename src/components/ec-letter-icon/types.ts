export interface LetterIconProps {
  text: string,
  size?: LetterIconSize,
  isClickable?: boolean,
  applyHoverStyles?: boolean,
}

export enum LetterIconSize {
  SMALL = 'sm',
  MEDIUM = 'md',
}

export interface LetterIconProps {
  text: string,
  size?: LetterIconSize,
  isClickable?: boolean,
  isParentHovered?: boolean,
}

export enum LetterIconSize {
  SMALL = 'sm',
  MEDIUM = 'md',
}

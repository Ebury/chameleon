export enum SpriteName {
  SIMPLE_ICONS = 'simple-icons',
  ROUNDED_ICONS = 'rounded-icons',
  CURRENCY_FLAGS = 'currency-flags',
}

export type SvgSprite = {
  spriteName: SpriteName,
  svg: string,
};

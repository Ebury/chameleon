export enum ChameleonTheme {
  LIGHT = 'light',
  DARK = 'dark',
  LIGHT_BLUE = 'light blue',
  DARK_BLUE = 'dark blue',
}

export type HslColor = string;

export interface ChameleonThemeConfig {
  name: ChameleonTheme,
  value: HslColor,
}

export const LIGHT_THEME = { name: ChameleonTheme.LIGHT, value: 'hsl(192.5, 10%, 100%)' }; // --ec-theme-gray-color-level-8
export const DARK_THEME = { name: ChameleonTheme.DARK, value: 'hsl(192.5, 10%, 20%)' }; // --ec-theme-gray-color-level-2
export const LIGHT_BLUE_THEME = { name: ChameleonTheme.LIGHT_BLUE, value: 'hsl(192.5, 100%, 47%)' }; // --ec-theme-key-color-level-4
export const DARK_BLUE_THEME = { name: ChameleonTheme.DARK_BLUE, value: 'hsl(192.5, 100%, 20%)' }; // --ec-theme-key-color-level-2

export function getAllBackgrounds(defaultName: ChameleonTheme) {
  return {
    default: defaultName,
    values: [
      LIGHT_THEME,
      DARK_THEME,
      LIGHT_BLUE_THEME,
      DARK_BLUE_THEME,
    ],
  };
}

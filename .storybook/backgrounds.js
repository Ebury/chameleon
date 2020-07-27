export const LIGHT_THEME = { name: 'light', value: 'hsl(192.5, 10%, 100%)' }; // --ec-theme-gray-color-level-8
export const DARK_THEME = { name: 'dark', value: 'hsl(192.5, 10%, 20%)' }; // --ec-theme-gray-color-level-2
export const LIGHT_BLUE_THEME = { name: 'light blue', value: 'hsl(192.5, 100%, 47%)' }; // --ec-theme-key-color-level-4
export const DARK_BLUE_THEME = { name: 'dark blue', value: 'hsl(192.5, 100%, 20%)' }; // --ec-theme-key-color-level-2

export function getAllBackgrounds(defaultName) {
  return [
    LIGHT_THEME,
    DARK_THEME,
    LIGHT_BLUE_THEME,
    DARK_BLUE_THEME,
  ].map(background => ({ ...background, default: background.name === defaultName }));
}

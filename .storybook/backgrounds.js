export const LIGHT_THEME = { name: 'light', value: '#fff' };
export const DARK_THEME = { name: 'dark', value: 'rgb(46,54,56)' };
export const LIGHT_BLUE_THEME = { name: 'light blue ebury', value: 'rgb(0,190,240)' };
export const DARK_BLUE_THEME = { name: 'dark blue ebury', value: 'rgb(0,80,102)' };

export function getAllBackgrounds(defaultName) {
  return [
    LIGHT_THEME,
    DARK_THEME,
    LIGHT_BLUE_THEME,
    DARK_BLUE_THEME,
  ].map(background => ({ ...background, default: background.name === defaultName }));
}

import config from '../../config';

const spriteSourceUrls = new Map([
  ['rounded', '/rounded-icons.svg'],
  ['simple', '/simple-icons.svg'],
  ['currency', '/currency-flags.svg'],
]);

export function getSpriteSourceByName(iconFullName) {
  /* istanbul ignore if */
  if (!iconFullName) {
    throw new Error('Missing iconFullName');
  }

  const [spriteName, iconName] = iconFullName.split('-');
  if (!spriteName || !iconName) {
    throw new Error(`Unable to determine the source of SVG sprite for icon with name: ${iconFullName}`);
  }
  return getSpriteUrl(spriteName);
}

function getSpriteUrl(spriteName) {
  const spriteUrl = spriteSourceUrls.get(spriteName);
  if (!spriteUrl) {
    throw new Error(`The sprite "${spriteName}" doesn't exist.`);
  }

  return `${config.iconsPublicPath}${spriteUrl}`;
}

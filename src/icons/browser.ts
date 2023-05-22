import { loadSvgSprites } from './loader';

export enum SpriteName {
  SIMPLE_ICONS ='simple-icons',
  ROUNDED_ICONS = 'rounded-icons',
  CURRENCY_FLAGS = 'currency-flags'
}

export function inlineSvgSprites(spriteNames: SpriteName[], publicPath: string, targetElement?: HTMLElement) {
  return loadSvgSprites(spriteNames, publicPath)
    .map((spritePromise: Promise<{ spriteName: SpriteName, svg: string }>) => spritePromise.then(({ spriteName, svg }) => {
      const uid = generateUid(spriteName);
      const svgSpriteWrapper = document.getElementById(uid)
      || createSvgSpriteWrapper(uid, targetElement || document.body);
      svgSpriteWrapper.innerHTML = svg;
      return { spriteName, svg };
    }));
}

export function generateUid(spriteName: SpriteName) {
  return `svg-sprite-container-${spriteName}`;
}

function createSvgSpriteWrapper(id: string, targetElement: HTMLElement) {
  const spriteWrapper = document.createElement('div');
  spriteWrapper.id = id;
  spriteWrapper.style.display = 'none';
  spriteWrapper.hidden = true;
  targetElement.appendChild(spriteWrapper);
  return spriteWrapper;
}

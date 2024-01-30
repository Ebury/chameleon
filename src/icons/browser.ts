import { loadSvgSprites } from './loader';
import type { SpriteName, SvgSprite } from './types';

export function inlineSvgSprites(spriteNames: SpriteName[], publicPath: string, targetElement?: ShadowRoot | HTMLElement) {
  return loadSvgSprites(spriteNames, publicPath)
    .map((spritePromise: Promise<SvgSprite>) => spritePromise.then(({ spriteName, svg }) => {
      const uid = generateUid(spriteName);
      const svgSpriteWrapper = document.getElementById(uid) || createSvgSpriteWrapper(uid, targetElement || document.body);
      svgSpriteWrapper.innerHTML = svg;
      return { spriteName, svg };
    }));
}

export function generateUid(spriteName: SpriteName): string {
  return `svg-sprite-container-${spriteName}`;
}

function createSvgSpriteWrapper(id: string, targetElement: ShadowRoot | HTMLElement): HTMLElement {
  const spriteWrapper = document.createElement('div');
  spriteWrapper.id = id;
  spriteWrapper.style.display = 'none';
  spriteWrapper.hidden = true;
  targetElement.appendChild(spriteWrapper);
  return spriteWrapper;
}

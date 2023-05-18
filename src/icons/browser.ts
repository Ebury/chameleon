import type { IconName } from '../components/ec-icon/icon-names';
import { loadSvgSprites } from './loader';

export function inlineSvgSprites(spriteNames: IconName[], publicPath: string, targetElement?: HTMLElement) {
  return loadSvgSprites(spriteNames, publicPath)
    .map((spritePromise: Promise<{ spriteName: IconName, svg: string }>) => spritePromise.then(({ spriteName, svg }) => {
      const uid = generateUid(spriteName);
      const svgSpriteWrapper = document.getElementById(uid)
      || createSvgSpriteWrapper(uid, targetElement || document.body);
      svgSpriteWrapper.innerHTML = svg;
      return { spriteName, svg };
    }));
}

export function generateUid(spriteName: IconName) {
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

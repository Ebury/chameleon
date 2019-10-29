/* eslint-disable no-use-before-define */
import { loadSvgSprites } from './loader';

export function inlineSvgSprites(spriteNames, publicPath) {
  return loadSvgSprites(spriteNames, publicPath)
    .map(spritePromise => spritePromise.then(({ spriteName, svg }) => {
      const uid = generateUid(spriteName);
      const svgSpriteWrapper = document.getElementById(uid) || createSvgSpriteWrapper(uid);
      svgSpriteWrapper.innerHTML = svg;
      return { spriteName, svg };
    }));
}

export function generateUid(spriteName) {
  return `svg-sprite-container-${spriteName}`;
}

function createSvgSpriteWrapper(id) {
  const spriteWrapper = document.createElement('div');
  spriteWrapper.id = id;
  spriteWrapper.style.display = 'none';
  spriteWrapper.hidden = true;
  document.body.appendChild(spriteWrapper);
  return spriteWrapper;
}

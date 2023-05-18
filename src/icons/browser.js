import { loadSvgSprites } from './loader';

export function inlineSvgSprites(spriteNames, publicPath, targetElement) {
  return loadSvgSprites(spriteNames, publicPath)
    .map(spritePromise => spritePromise.then(({ spriteName, svg }) => {
      const uid = generateUid(spriteName);
      const svgSpriteWrapper = document.getElementById(uid)
      || createSvgSpriteWrapper(uid, targetElement || document.body);
      svgSpriteWrapper.innerHTML = svg;
      return { spriteName, svg };
    }));
}

export function generateUid(spriteName) {
  return `svg-sprite-container-${spriteName}`;
}

function createSvgSpriteWrapper(id, targetElement) {
  const spriteWrapper = document.createElement('div');
  spriteWrapper.id = id;
  spriteWrapper.style.display = 'none';
  spriteWrapper.hidden = true;
  targetElement.appendChild(spriteWrapper);
  return spriteWrapper;
}

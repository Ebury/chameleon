import type { SpriteName, SvgSprite } from './types';

export function loadSvgSprites(svgSpriteNames: SpriteName[], publicPath: string = ''): Promise<SvgSprite>[] {
  return svgSpriteNames.map(async (spriteName) => {
    const url = `${publicPath}/${spriteName}.svg`;
    const svg = await getSprite(url);
    return { spriteName, svg };
  });
}

function getSprite(url: string): Promise<string> {
  return new Promise(((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function onSpriteLoaded() {
      if (xhr.status >= 400) {
        const error = new Error(xhr.statusText);
        reject(error);
      } else {
        resolve(xhr.responseText);
      }
    };
    xhr.onerror = function onSpriteError() {
      reject(new Error(`Unexpected error when loading svg sprite. Status: ${xhr.status}`));
    };
    xhr.send();
  }));
}

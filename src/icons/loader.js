/* eslint-disable no-use-before-define */
export function loadSvgSprites(svgSpriteNames, publicPath = '') {
  return svgSpriteNames.map(async (spriteName) => {
    const url = `${publicPath}/${spriteName}-icons.svg`;
    const svg = await getSprite(url);
    return { spriteName, svg };
  });
}

function getSprite(url) {
  return new Promise(((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function onSpriteLoaded() {
      resolve(xhr.responseText);
    };
    xhr.onerror = function onSpriteError(err) {
      reject(err);
    };
    xhr.send();
  }));
}

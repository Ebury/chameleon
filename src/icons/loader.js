export function loadSvgSprites(svgSpriteNames, publicPath = '') {
  return svgSpriteNames.map(async (spriteName) => {
    const url = `${publicPath}/${spriteName}.svg`;
    const svg = await getSprite(url);
    return { spriteName, svg };
  });
}

function getSprite(url) {
  return new Promise(((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function onSpriteLoaded() {
      if (xhr.status >= 400) {
        const error = new Error(xhr.statusText);
        error.response = xhr.response;
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

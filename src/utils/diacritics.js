export function removeDiacritics(str) {
  if (typeof str === 'string' && str.normalize) {
    // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  // IE11 users will not enjoy this feature:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
  return str;
}

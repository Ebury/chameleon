export const arrayOfObjectsContainsKey = (array, keys) => {
  if (!Array.isArray(array) || !Array.isArray(keys) || array.length === 0 || keys.length === 0) {
    return false;
  }
  return array.every(obj => keys.every(key => (key in obj)));
};

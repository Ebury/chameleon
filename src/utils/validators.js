export const arrayOfObjectsContainsKey = (array, keys) => {
  if (!Array.isArray(array)) {
    return false;
  }
  return array.every(obj => keys.every(key => (key in obj)));
};

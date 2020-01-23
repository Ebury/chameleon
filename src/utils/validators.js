export const arrayOfObjectsContainsKey = (array, key) => {
  if (!Array.isArray(array)) {
    return false;
  }
  let isValid = true;
  array.forEach((obj) => {
    if (!Object.keys(obj).includes(key)) {
      isValid = false;
    }
  });
  return isValid;
};

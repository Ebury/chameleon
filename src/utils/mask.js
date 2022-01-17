export function mask(text, maskSymbol = '*', visibleChars = 2) {
  if (!text) {
    throw new Error('Text is required');
  }
  if (!maskSymbol) {
    throw new Error('Mask symbol cannot be empty');
  }
  if (!visibleChars || visibleChars < 0) {
    throw new Error('Visible characters must be a number greater than zero');
  }

  const digitsToBeMasked = text.length - visibleChars;
  return maskSymbol.repeat(digitsToBeMasked) + text.substr(digitsToBeMasked);
}

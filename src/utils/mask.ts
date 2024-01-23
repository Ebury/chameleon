export function mask(text: string, maskSymbol: string = '*', visibleChars: number = 2): string {
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
  return maskSymbol.repeat(digitsToBeMasked) + text.substring(digitsToBeMasked);
}

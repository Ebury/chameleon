import { mask } from './mask';

describe('Utils', () => {
  describe('mask', () => {
    it('should mask by default all but the last 3 characters with "*"', () => {
      const textToBeMasked = 'lorem1234';
      const expectedText = '*******34';

      const maskedText = mask(textToBeMasked);

      expect(maskedText).toBe(expectedText);
    });

    it('should mask the given text with "#"', () => {
      const textToBeMasked = 'lorem1234';
      const expectedText = '#######34';

      const maskedText = mask(textToBeMasked, '#');

      expect(maskedText).toBe(expectedText);
    });

    it('should mask all but the last 1 character', () => {
      const textToBeMasked = 'lorem1234';
      const expectedText = '********4';

      const maskedText = mask(textToBeMasked, undefined, 1);

      expect(maskedText).toBe(expectedText);
    });

    it('should throw if no text is provided', () => {
      const textToBeMasked = '';

      expect(() => mask(textToBeMasked)).toThrow(new Error('Text is required'));
    });

    it('should throw if no mask symbol is provided', () => {
      const textToBeMasked = 'lorem';
      const maskSymbol = '';

      expect(() => mask(textToBeMasked, maskSymbol)).toThrow(new Error('Mask symbol cannot be empty'));
    });

    it('should throw if visibleChars is not provided', () => {
      const textToBeMasked = 'lorem';
      const maskSymbol = '#';
      const visibleChars = 0;

      expect(() => mask(textToBeMasked, maskSymbol, visibleChars)).toThrow(new Error('Visible characters must be a number greater than zero'));
    });

    it('should throw if visibleChars is negative', () => {
      const textToBeMasked = 'lorem';
      const maskSymbol = '#';
      const visibleChars = -1;

      expect(() => mask(textToBeMasked, maskSymbol, visibleChars)).toThrow(new Error('Visible characters must be a number greater than zero'));
    });
  });
});

import { obfuscate } from './obfuscate';

describe('Utils', () => {
  describe('Obfuscate', () => {
    it('should obfuscate by default all but the last 3 characters with "*"', () => {
      const textToBeObfuscated = 'lorem1234';
      const expectedText = '******234';

      const obfuscatedText = obfuscate(textToBeObfuscated);

      expect(obfuscatedText).toBe(expectedText);
    });

    it('should obfuscate the given text with "#"', () => {
      const textToBeObfuscated = 'lorem1234';
      const expectedText = '######234';

      const obfuscatedText = obfuscate(textToBeObfuscated, '#');

      expect(obfuscatedText).toBe(expectedText);
    });

    it('should obfuscate all but the last 1 character', () => {
      const textToBeObfuscated = 'lorem1234';
      const expectedText = '********4';

      const obfuscatedText = obfuscate(textToBeObfuscated, undefined, 1);

      expect(obfuscatedText).toBe(expectedText);
    });
  });
});

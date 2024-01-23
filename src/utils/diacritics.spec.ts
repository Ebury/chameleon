import { removeDiacritics } from './diacritics';

describe('Utils', () => {
  describe('removeDiacritics', () => {
    it.each([
      ['ąśćńżóźćę', 'ascnzozce'],
      ['lłľĺ', 'lłll'],
      ['', ''],
    ])('should normalize "%s"', (str: string, expected: string) => {
      expect(removeDiacritics(str)).toEqual(expected);
    });
  });
});

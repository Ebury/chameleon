import { removeDiacritics } from './diacritics';

describe('Utils', () => {
  describe('removeDiacritics', () => {
    it.each([
      ['ąśćńżóźćę', 'ascnzozce'],
      ['lłľĺ', 'lłll'],
      ['', ''],
      [null, null],
      [undefined, undefined],
      [{}, {}],
      [[], []],
    ])('should normalize "%s"', (str, expected) => {
      expect(removeDiacritics(str)).toEqual(expected);
    });
  });
});

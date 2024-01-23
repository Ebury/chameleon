import fs from 'node:fs';

import { getDecimalSeparator, getGroupingSeparator } from './number-format';

describe('Utils', () => {
  // get list of all locales in the world from intl polyfill.
  const locales = fs.readdirSync('./node_modules/intl/locale-data/jsonp')
    .filter(fileName => fileName.match(/\.js$/))
    .map(fileName => fileName.replace(/\.js$/, ''));

  function getExpectedSeparator(locale: string, type: Intl.NumberFormatPartTypes) {
    return new Intl.NumberFormat(locale)
      .formatToParts(1111.1)
      .find(part => part.type === type)
      ?.value;
  }

  describe('getDecimalSeparator', () => {
    for (const locale of locales) {
      it(`should get decimal separator for locale ${locale}`, () => {
        const expected = getExpectedSeparator(locale, 'decimal'); // get the decimal separator using method that works in every modern browser
        const separator = getDecimalSeparator(locale); // get the decimal separator using our method
        expect(separator.length).toBe(1);
        expect(separator).toBe(expected);
      });
    }
  });

  describe('getGroupingSeparator', () => {
    for (const locale of locales) {
      it(`should get group separator for locale ${locale}`, () => {
        const expected = getExpectedSeparator(locale, 'group'); // get the group separator using method that works in every modern browser
        const separator = getGroupingSeparator(locale); // get the group separator using our method
        expect(separator.length).toBe(1);
        expect(separator).toBe(expected);
      });
    }
  });
});

import { format, unFormat, sanitizeInput } from './utils';

const defaultOptions = {
  groupingSeparator: ',',
  decimalSeparator: '.',
  precision: 2,
};
describe('Utils EcMoney', () => {
  describe('format', () => {
    it.each([
      ['', '', defaultOptions],
      ['abc', '', defaultOptions],
      ['.', '.', defaultOptions],
      ['.1', '.1', defaultOptions],
      ['0', '0', defaultOptions],
      ['0.', '0.', defaultOptions],
      ['0.0', '0.0', defaultOptions],
      ['0.00', '0.00', defaultOptions],
      [1111, '1,111', defaultOptions],
      [-1111, '-1,111', defaultOptions],
      ['111a1.11a', '1,111.11', defaultOptions],
      [111221, '111,221', undefined],
      [1111.11, '1,111.11', defaultOptions],
      [1111.112, '1,111.11', defaultOptions],
      [1.11, '1.11', defaultOptions],
      [1111111, '1,111,111', defaultOptions],
      [1111111, '1`111`111', { ...defaultOptions, groupingSeparator: '`' }],
      ['1111111`11', '1,111,111`11', { ...defaultOptions, decimalSeparator: '`' }],
    ])('should format the value %s into a %s', (value, valueFormatted, options) => {
      if (options !== undefined) {
        expect(format(value, options)).toBe(valueFormatted);
      } else {
        expect(format(value)).toBe(valueFormatted);
      }
    });
  });

  describe('unFormat', () => {
    it.each([
      ['1,111.11', '1111.11', ',', '.'],
      ['1,111.12', '1111.12', ',', '.'],
      ['1,111.11', '1111.11', ',', '.'],
      ['1.11', '1.11', ',', '.'],
      ['1.1111', '1.1111', ',', '.'],
      ['1,111,111.00', '1111111.00', ',', '.'],
      ['1`111`111.00', '1111111.00', '`', '.'],
      ['1,111,111`00', '1111111.00', ',', '`'],
      ['1,111,111.001', '1111111.001', ',', '.'],
    ])('should unFormat the u %s into a %s', (value, valueUnFormatted, groupSeparator, decimalSeparator) => {
      expect(unFormat(value, groupSeparator, decimalSeparator)).toBe(valueUnFormatted);
    });
  });

  describe('sanitizeInput', () => {
    it.each([
      ['1,111.00', '111100'],
      ['1,111.11', '111111'],
      ['1.11', '111'],
      ['1.1111', '11111'],
      ['1,111,111.00', '111111100'],
      ['1`111`111.00', '111111100'],
      ['1,111,111`00', '111111100'],
      ['£1,111,111.00', '111111100'],
      ['1,111,111.00£', '111111100'],
      ['1,111,111.001', '1111111001'],
    ])('should sanitize the u %s into a %s', (value, valueExpected) => {
      expect(sanitizeInput(value)).toBe(valueExpected);
    });
  });
});

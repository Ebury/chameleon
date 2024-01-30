import type { AmountDirectiveOptions } from './types';
import { format, sanitizeInput, unFormat } from './utils';

const defaultOptions: AmountDirectiveOptions = {
  groupingSeparator: ',',
  decimalSeparator: '.',
  precision: 2,
};

const optionsWithoutDecimals = {
  ...defaultOptions,
  precision: 0,
};

describe('EcAmount - utils', () => {
  describe('format', () => {
    it.each([
      ['', '', defaultOptions],
      ['abc', '', defaultOptions],
      ['.', '.', defaultOptions],
      ['.1', '.1', defaultOptions],
      ['.10', '.10', defaultOptions],
      ['0', '0', defaultOptions],
      ['0.', '0.', defaultOptions],
      ['0.0', '0.0', defaultOptions],
      ['0.00', '0.00', defaultOptions],
      [111, '111', defaultOptions],
      [1111, '1,111', defaultOptions],
      [-1111, '-1,111', defaultOptions],
      ['111a1.11a', '1,111.11', defaultOptions],
      ['1,1,1,1,', '1,111', defaultOptions],
      ['111,,111', '111,111', defaultOptions],
      ['111..111', '111.11', defaultOptions],
      ['11.3.1', '11.31', defaultOptions],
      [111221, '111,221', undefined],
      [1111.11, '1,111.11', defaultOptions],
      [1111.112, '1,111.11', defaultOptions],
      [1.11, '1.11', defaultOptions],
      [1111111, '1,111,111', defaultOptions],
      [1111111, '1`111`111', { ...defaultOptions, groupingSeparator: '`' }],
      ['1111111`11', '1,111,111`11', { ...defaultOptions, decimalSeparator: '`' }],
    ])('should format the value %s into a %s', (value: string | number, valueFormatted: string, options?: AmountDirectiveOptions) => {
      if (options !== undefined) {
        expect(format(value, options)).toBe(valueFormatted);
      } else {
        expect(format(value)).toBe(valueFormatted);
      }
    });

    it.each([
      ['', '', optionsWithoutDecimals],
      ['abc', '', optionsWithoutDecimals],
      ['.', '', optionsWithoutDecimals],
      ['111.51', '111', optionsWithoutDecimals],
      ['1111.11', '1,111', optionsWithoutDecimals],
      ['11.11.11', '11', optionsWithoutDecimals],
      [1.11, '1', optionsWithoutDecimals],
      [0.11, '0', optionsWithoutDecimals],
      [-1.11, '-1', optionsWithoutDecimals],
    ])('should format the value %s into a %s without decimal', (value: string | number, valueFormatted: string, options?: AmountDirectiveOptions) => {
      expect(format(value, options)).toBe(valueFormatted);
    });

    it.each([
      ['-', '-', defaultOptions],
      ['--', '-', defaultOptions],
      ['-1', '-1', defaultOptions],
      ['-.', '-.', defaultOptions],
      ['-.1', '-.1', defaultOptions],
      ['--1', '-1', defaultOptions],
      ['-1111.11', '-1,111.11', defaultOptions],
      [-1, '-1', defaultOptions],
      [-1111.11, '-1,111.11', defaultOptions],
      ['1-', '1', defaultOptions],
      ['1-1', '11', defaultOptions],
    ])('should format negative sign in the value %s into a %s', (value: string | number, valueFormatted: string, options?: AmountDirectiveOptions) => {
      expect(format(value, options)).toBe(valueFormatted);
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
    ])('should unFormat the %s into a %s', (value: string, valueUnFormatted: string, groupSeparator: string, decimalSeparator: string) => {
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
    ])('should sanitize the %s into a %s if decimal separator is not defined', (value: string, valueExpected: string) => {
      expect(sanitizeInput(value, '')).toBe(valueExpected);
    });

    it.each([
      ['1,111.00', '1111.00'],
      ['1,111.11', '1111.11'],
      ['1.11', '1.11'],
      ['1.1111', '1.1111'],
      ['1,111,111.00', '1111111.00'],
      ['1`111`111.00', '1111111.00'],
      ['1,111,111`00', '111111100'],
      ['£1,111,111.00', '1111111.00'],
      ['1,111,111.00£', '1111111.00'],
      ['1,111,111.001', '1111111.001'],
    ])('should sanitize the %s into a %s but preserve the given decimal separator', (value: string, valueExpected: string) => {
      expect(sanitizeInput(value, '.')).toBe(valueExpected);
    });
  });
});

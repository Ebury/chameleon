
import defaultOptions from './options';
import type { AmountDirectiveOptions } from './types';

function format(input: undefined, opts?: AmountDirectiveOptions): undefined;
function format(input: null, opts?: AmountDirectiveOptions): null;
function format(input: string | number, opts?: AmountDirectiveOptions): string;
function format(input: string | number | undefined | null, opts: AmountDirectiveOptions = defaultOptions): string | null | undefined {
  /* eslint-disable no-param-reassign */
  if (input === '' || input === null || input === undefined) {
    return input;
  }

  if (typeof input === 'number') {
    input = input.toString();
  }

  const negative = input.startsWith('-') ? '-' : '';

  input = sanitizeInput(input, opts.decimalSeparator);
  if (opts.precision > 0) {
    input = keepOnlyOneDecimalSeparator(input, opts.decimalSeparator);
  } else {
    input = removeDecimal(input, opts.decimalSeparator);
  }
  const parts = input.split(opts.decimalSeparator);
  let integralPart = parseToStr(parts[0]);
  let fractionalPart = parts[1];

  if (fractionalPart && fractionalPart.length > opts.precision) {
    fractionalPart = fractionalPart.substring(0, opts.precision);
  }

  integralPart = addGroupingSeparators(integralPart, opts.groupingSeparator);
  const result = negative + joinIntegralAndFractionalParts(integralPart, fractionalPart, opts.decimalSeparator);
  return result;
}

function parseToStr(number: string): string {
  const parsed = Number.parseFloat(number);
  if (Number.isNaN(parsed)) {
    return '';
  }
  return parsed.toString();
}

function keepOnlyOneDecimalSeparator(number: string, decimalSeparator: string): string {
  if (number.includes(decimalSeparator)) {
    const split = number.split(decimalSeparator);
    return split[0] + decimalSeparator + split.slice(1).join('');
  }
  return number;
}

function removeDecimal(number: string, decimalSeparator: string): string {
  const split = number.split(decimalSeparator);
  return split[0];
}

function unFormat(input: string, groupingSeparator: string, decimalSeparator: string): string {
  if (!input) {
    return input;
  }

  return input
    .replace(new RegExp(`\\${groupingSeparator}`, 'g'), '')
    .replace(new RegExp(`\\${decimalSeparator}`, 'g'), '.');
}

function sanitizeInput(input: string, decimalSeparator: string): string {
  return input.replace(new RegExp(`[^0-9${decimalSeparator}]`, 'g'), '') || '';
}

function addGroupingSeparators(integralPart: string, separator: string): string {
  return integralPart.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${separator}`);
}

function joinIntegralAndFractionalParts(integralPart: string, fractionalPart: string, decimalSeparator: string): string {
  return fractionalPart !== undefined ? integralPart + decimalSeparator + fractionalPart : integralPart;
}

/* c8 ignore start */
function setCursor(el: HTMLInputElement, position: number) {
  const setSelectionRange = function setSelectionRange() {
    el.setSelectionRange(position, position);
  };

  if (el === document.activeElement) {
    setSelectionRange();
    setTimeout(setSelectionRange, 1); // Android Fix
  }
}
/* c8 ignore stop */

export {
  format,
  sanitizeInput,
  setCursor,
  unFormat,
};

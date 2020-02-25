import defaults from './options';

function format(input, opt = defaults) {
  if (input === '' || input === null || input === undefined) {
    return input;
  }

  if (typeof input === 'number') {
    input = input.toString();
  }

  const negative = input.includes('-') ? '-' : '';

  input = sanitizeInput(input, opt.decimalSeparator);
  input = keepOnlyOneDecimalSeparator(input, opt.decimalSeparator);
  const parts = input.split(opt.decimalSeparator);
  let integer = parseToStr(parts[0]);
  let decimal = parts[1];

  if (decimal && decimal.length > opt.precision) {
    decimal = decimal.substr(0, opt.precision);
  }

  integer = addGroupingSeparators(integer, opt.groupingSeparator);
  const result = negative + joinIntegerAndDecimal(integer, decimal, opt.decimalSeparator);
  return result;
}

function parseToStr(number) {
  /* eslint no-restricted-globals: "off" */
  const parsed = parseFloat(number);
  if (isNaN(parsed)) {
    return '';
  }
  return parsed.toString();
}

function keepOnlyOneDecimalSeparator(number, decimalSeparator) {
  if (number.includes(decimalSeparator)) {
    const split = number.split(decimalSeparator);
    return split[0] + decimalSeparator + split.slice(1).join('');
  }
  return number;
}

function unFormat(input, groupingSeparator, decimalSeparator) {
  /* eslint no-param-reassign: "off" */
  input = (`${input}`).replace(new RegExp(`\\${groupingSeparator}`, 'g'), '');
  input = (`${input}`).replace(new RegExp(`\\${decimalSeparator}`, 'g'), '.');
  return input;
}

function sanitizeInput(input, decimalSeparator) {
  return input.replace(new RegExp(`[^0-9${decimalSeparator}]`, 'g'), '') || '';
}

function addGroupingSeparators(integer, separator) {
  return integer.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${separator}`);
}

function joinIntegerAndDecimal(integer, decimal, decimalSeparator) {
  return decimal !== undefined ? integer + decimalSeparator + decimal : integer;
}

function setCursor(el, position) {
  const setSelectionRange = function setSelectionRange() {
    el.setSelectionRange(position, position);
  };

  if (el === document.activeElement) {
    setSelectionRange();
    setTimeout(setSelectionRange, 1); // Android Fix
  }
}

// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#The_old-fashioned_way
function event(name) {
  const evt = document.createEvent('Event');
  evt.initEvent(name, true, true);
  return evt;
}

export {
  format,
  unFormat,
  setCursor,
  event,
  sanitizeInput,
};

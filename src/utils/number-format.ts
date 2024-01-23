export function getDecimalSeparator(locale: string | string[]): string {
  // we could just use formatToParts function but it's not supported on Safari 11 and 12
  // and there's no polyfill for NumberFormat, only for DateTimeFormat
  //
  // return new Intl.NumberFormat(locale)
  //     .formatToParts(1111.1)
  //     .find(part => part.type === 'decimal')
  //     .value;
  //
  // so we have to improvised and force the formatter to format number 0.1 in the format
  // 0<decimal separator>1 and then get the 2nd character from the string

  const formatted = new Intl.NumberFormat(locale, {
    useGrouping: false,
    minimumIntegerDigits: 1,
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 1,
  }).format(0.1);
  return formatted[1];
}

export function getGroupingSeparator(locale: string | string[]): string {
  // we could just use formatToParts function but it's not supported on Safari 11 and 12
  // and there's no polyfill for NumberFormat, only for DateTimeFormat
  //
  // return new Intl.NumberFormat(locale)
  //     .formatToParts(1111.1)
  //     .find(part => part.type === 'group')
  //     .value;
  //
  // so we have to improvised and force the formatter to format number 1000 in the format
  // 1<group separator>000 and then get the 2nd character from the string

  const formatted = new Intl.NumberFormat(locale, {
    useGrouping: true,
    minimumIntegerDigits: 5,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    minimumSignificantDigits: 5,
    maximumSignificantDigits: 5,
  }).format(10000);
  return formatted[2];
}

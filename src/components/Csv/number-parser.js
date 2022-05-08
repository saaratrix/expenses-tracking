// Source: https://stackoverflow.com/a/29273131/2437350
/**
 *
 * @param {string} value
 * @param {string }locale en-GB, fi-Fi ...
 */
export function parseNumber(value, locale) {
  const formatter = new Intl.NumberFormat(locale);

  const thousandSeparator = formatter.formatToParts(11111).find(f => f.type === 'group')?.value ?? '';
  const decimalSeparator = formatter.formatToParts(1.1).find(f => f.type === 'decimal')?.value ?? '';

  value = value.replace(new RegExp('\\' + thousandSeparator, 'g'), '')
    .replace(new RegExp('\\' + decimalSeparator), '.');

  return parseFloat(value);
}

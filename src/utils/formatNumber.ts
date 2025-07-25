/**
 * Formata números para exibição com casas decimais
 */

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

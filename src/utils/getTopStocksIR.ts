import type { StockSummary } from "@/types";

export function getTopStocksIR(
  stocks: StockSummary[],
  max = 6
): { symbol: string; ir: number; fill: string }[] {
  return stocks
    .map((stock) =>
      stock.totalTaxDue > 0
        ? {
            symbol: stock.symbol,
            ir: stock.totalTaxDue,
            fill: "#A259FF",
          }
        : null
    )
    .filter(
      (stock): stock is { symbol: string; ir: number; fill: string } =>
        stock !== null
    )
    .sort((a, b) => b.ir - a.ir)
    .slice(0, max);
}

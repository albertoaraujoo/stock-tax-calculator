import type {
  Stock,
  StockSummary,
  TaxCalculationResult,
  Operation,
} from "@/types";

export function calculateStocksSummary(
  stocks: Record<string, Stock>,
  sellResults: TaxCalculationResult[],
  operations: Operation[]
): StockSummary[] {
  return Object.values(stocks).map((stock) => ({
    symbol: stock.symbol,
    totalOperations: stock.operations.length,
    totalTaxDue: sellResults
      .filter((result) => {
        const operation = operations.find((op) => op.id === result.operationId);
        return operation && operation.stockSymbol === stock.symbol;
      })
      .reduce((total, result) => total + result.taxDue, 0),
    currentPosition: stock.averageQuantity,
    averagePrice: stock.averagePrice,
    accumulatedLoss: stock.accumulatedLoss,
    operations: stock.operations,
  }));
}

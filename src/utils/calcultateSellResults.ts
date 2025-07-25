import type { Stock, TaxCalculationResult } from "@/types";
import { calculateBuyOperation } from "./calculateBuyOperation";
import { calculateSellOperation } from "./calculateSellOperation";

export function calculateSellResults(
  stocks: Record<string, Stock>
): TaxCalculationResult[] {
  const results: TaxCalculationResult[] = [];

  Object.values(stocks).forEach((stock) => {
    let tempStock: Stock = {
      ...stock,
      operations: [],
    };

    stock.operations.forEach((operation) => {
      if (operation.type === "buy") {
        const { newAveragePrice, newAverageQuantity } = calculateBuyOperation(
          tempStock,
          operation
        );
        tempStock = {
          ...tempStock,
          averagePrice: newAveragePrice,
          averageQuantity: newAverageQuantity,
          operations: [...tempStock.operations, operation],
        };
      } else {
        const result = calculateSellOperation(tempStock, operation);
        results.push(result);
        tempStock = {
          ...tempStock,
          averagePrice: result.newAveragePrice,
          averageQuantity: result.newAverageQuantity,
          accumulatedLoss: result.newAccumulatedLoss,
          operations: [...tempStock.operations, operation],
        };
      }
    });
  });

  return results;
}

import type { Operation, Stock } from "@/types";

/**
 * Calcula o novo preço médio e quantidade após uma compra
 * PM = (PM * QM + PC * QC + TC) / (QM + QC)
 * QM = QM + QC
 */
export function calculateBuyOperation(
  stock: Stock,
  operation: Operation
): { newAveragePrice: number; newAverageQuantity: number } {
  const { averagePrice: PM, averageQuantity: QM } = stock;
  const { price: PC, quantity: QC, brokerageFee: TC } = operation;

  const newAverageQuantity = QM + QC;
  const newAveragePrice =
    newAverageQuantity > 0 ? (PM * QM + PC * QC + TC) / newAverageQuantity : 0;

  return {
    newAveragePrice,
    newAverageQuantity,
  };
}

import type { Operation, Stock, TaxCalculationResult } from "@/types";

/**
 * Calcula o resultado auferido, IR devido e atualiza PA
 * RA = (PV - PM) * QV - TV
 * IR = (RA - Min(RA, PA)) * 15%
 * PA = PA - Min(RA, PA)
 */
export function calculateSellOperation(
  stock: Stock,
  operation: Operation
): TaxCalculationResult {
  const { averagePrice: PM, averageQuantity: QM, accumulatedLoss: PA } = stock;
  const { price: PV, quantity: QV, brokerageFee: TV } = operation;

  // Calcular resultado auferido
  const earnedResult = (PV - PM) * QV - TV;

  // Nova quantidade
  const newAverageQuantity = QM - QV;

  let taxDue = 0;
  let newAccumulatedLoss = PA;

  if (earnedResult < 0) {
    // Prejuízo: somar ao PA
    newAccumulatedLoss = PA + Math.abs(earnedResult);
  } else {
    // Lucro: calcular IR
    const lossToOffset = Math.min(earnedResult, PA);
    const taxableAmount = earnedResult - lossToOffset;
    taxDue = taxableAmount * 0.15;
    newAccumulatedLoss = PA - lossToOffset;
  }

  return {
    operationId: operation.id,
    earnedResult,
    taxDue,
    newAccumulatedLoss,
    newAveragePrice: PM, // PM não muda na venda
    newAverageQuantity,
  };
}

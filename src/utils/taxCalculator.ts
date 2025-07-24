import type { Stock, Operation, TaxCalculationResult } from "@/types";

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

/**
 * Formata valores monetários para exibição
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/**
 * Formata números para exibição com casas decimais
 */

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

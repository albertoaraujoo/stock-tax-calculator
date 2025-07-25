import { useState, useCallback, useMemo } from "react";

import type { Operation, Stock } from "../types";

import { calculateBuyOperation } from "@/utils/calculateBuyOperation";
import { calculateSellOperation } from "@/utils/calculateSellOperation";
import { calculateSellResults } from "@/utils/calcultateSellResults";
import { calculateStocksSummary } from "@/utils/calculateStocksSummary";

export function useStockOperations() {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [stocks, setStocks] = useState<Record<string, Stock>>({});

  // Adicionar nova operação
  const addOperation = useCallback(
    (operationData: Omit<Operation, "id" | "createdAt">) => {
      const newOperation: Operation = {
        ...operationData,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      };

      setOperations((prev) => [...prev, newOperation]);

      // Atualizar stock correspondente
      setStocks((prevStocks) => {
        const currentStock = prevStocks[newOperation.stockSymbol] || {
          symbol: newOperation.stockSymbol,
          averagePrice: 0,
          averageQuantity: 0,
          accumulatedLoss: 0,
          operations: [],
        };

        let updatedStock: Stock;

        if (newOperation.type === "buy") {
          const { newAveragePrice, newAverageQuantity } = calculateBuyOperation(
            currentStock,
            newOperation
          );

          updatedStock = {
            ...currentStock,
            averagePrice: newAveragePrice,
            averageQuantity: newAverageQuantity,
            operations: [...currentStock.operations, newOperation],
          };
        } else {
          const result = calculateSellOperation(currentStock, newOperation);

          updatedStock = {
            ...currentStock,
            averagePrice: result.newAveragePrice,
            averageQuantity: result.newAverageQuantity,
            accumulatedLoss: result.newAccumulatedLoss,
            operations: [...currentStock.operations, newOperation],
          };
        }

        return {
          ...prevStocks,
          [newOperation.stockSymbol]: updatedStock,
        };
      });

      return newOperation;
    },
    []
  );

  // Remover operação
  const removeOperation = useCallback(
    (operationId: string) => {
      setOperations((prev) => prev.filter((op) => op.id !== operationId));

      // Recalcular stocks afetados
      setStocks((prevStocks) => {
        const operationToRemove = operations.find(
          (op) => op.id === operationId
        );
        if (!operationToRemove) return prevStocks;

        const stockSymbol = operationToRemove.stockSymbol;
        const stockOperations = operations.filter(
          (op) => op.stockSymbol === stockSymbol && op.id !== operationId
        );

        if (stockOperations.length === 0) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [stockSymbol]: _, ...remaining } = prevStocks;
          return remaining;
        }

        // Recalcular do zero
        let recalculatedStock: Stock = {
          symbol: stockSymbol,
          averagePrice: 0,
          averageQuantity: 0,
          accumulatedLoss: 0,
          operations: [] as Operation[],
        };

        for (const operation of stockOperations.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )) {
          if (operation.type === "buy") {
            const { newAveragePrice, newAverageQuantity } =
              calculateBuyOperation(recalculatedStock, operation);
            recalculatedStock = {
              ...recalculatedStock,
              averagePrice: newAveragePrice,
              averageQuantity: newAverageQuantity,
              operations: [...recalculatedStock.operations, operation],
            };
          } else {
            const result = calculateSellOperation(recalculatedStock, operation);
            recalculatedStock = {
              ...recalculatedStock,
              averagePrice: result.newAveragePrice,
              averageQuantity: result.newAverageQuantity,
              accumulatedLoss: result.newAccumulatedLoss,
              operations: [...recalculatedStock.operations, operation],
            };
          }
        }

        return {
          ...prevStocks,
          [stockSymbol]: recalculatedStock,
        };
      });
    },
    [operations]
  );

  // Calcular resultados de vendas
  const sellResults = useMemo(() => calculateSellResults(stocks), [stocks]);

  // Calcular resumo de todas as ações
  const stocksSummary = useMemo(
    () => calculateStocksSummary(stocks, sellResults, operations),
    [stocks, sellResults, operations]
  );

  return {
    operations,
    stocks,
    stocksSummary,
    sellResults,
    addOperation,
    removeOperation,
  };
}

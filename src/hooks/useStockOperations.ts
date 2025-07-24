import { useState, useCallback, useMemo } from "react";
import type {
  Operation,
  Stock,
  TaxCalculationResult,
  StockSummary,
} from "../types";
import {
  calculateBuyOperation,
  calculateSellOperation,
} from "../utils/taxCalculator";

export const useStockOperations = () => {
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

  // Calcular resumo de todas as ações
  const stocksSummary = useMemo((): StockSummary[] => {
    return Object.values(stocks).map((stock) => ({
      symbol: stock.symbol,
      totalOperations: stock.operations.length,
      totalTaxDue: stock.operations
        .filter((op) => op.type === "sell")
        .reduce((total, op) => {
          const result = calculateSellOperation(
            {
              ...stock,
              operations: stock.operations.slice(
                0,
                stock.operations.indexOf(op)
              ),
            },
            op
          );
          return total + result.taxDue;
        }, 0),
      currentPosition: stock.averageQuantity,
      averagePrice: stock.averagePrice,
      accumulatedLoss: stock.accumulatedLoss,
    }));
  }, [stocks]);

  // Calcular resultados de vendas
  const sellResults = useMemo((): TaxCalculationResult[] => {
    const results: TaxCalculationResult[] = [];

    Object.values(stocks).forEach((stock) => {
      let tempStock: Stock = {
        ...stock,
        operations: [] as Operation[],
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
  }, [stocks]);

  return {
    operations,
    stocks,
    stocksSummary,
    sellResults,
    addOperation,
    removeOperation,
  };
};

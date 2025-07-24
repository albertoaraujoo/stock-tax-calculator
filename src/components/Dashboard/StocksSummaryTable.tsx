import React from "react";
import type { StockSummary } from "@/types";
import { formatCurrency } from "@/utils/taxCalculator";

interface StocksSummaryTableProps {
  stocksSummary: StockSummary[];
}

const StocksSummaryTable: React.FC<StocksSummaryTableProps> = ({
  stocksSummary,
}) => {
  if (stocksSummary.length === 0) return null;

  return (
    <div className="bg-black p-8 rounded-lg">
      <h2 className="text-purple-light mb-6 text-xl font-semibold">
        Resumo por Ação
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-dark">
              <th className="text-white p-4 text-left">Ação</th>
              <th className="text-white p-4 text-right">Operações</th>
              <th className="text-white p-4 text-right">Posição Atual</th>
              <th className="text-white p-4 text-right">Preço Médio</th>
              <th className="text-white p-4 text-right">Prejuízo Acumulado</th>
              <th className="text-white p-4 text-right">IR Total Devido</th>
            </tr>
          </thead>
          <tbody>
            {stocksSummary.map((stock) => (
              <tr key={stock.symbol} className="border-b border-gray-dark">
                <td className="text-purple-light p-4 font-bold">
                  {stock.symbol}
                </td>
                <td className="text-white p-4 text-right">
                  {stock.totalOperations}
                </td>
                <td
                  className={`p-4 text-right ${stock.currentPosition > 0 ? "text-success" : "text-gray"}`}
                >
                  {stock.currentPosition > 0
                    ? stock.currentPosition.toLocaleString("pt-BR")
                    : "-"}
                </td>
                <td className="text-white p-4 text-right">
                  {stock.averagePrice > 0
                    ? formatCurrency(stock.averagePrice)
                    : "-"}
                </td>
                <td
                  className={`p-4 text-right ${stock.accumulatedLoss > 0 ? "text-danger" : "text-gray"}`}
                >
                  {stock.accumulatedLoss > 0
                    ? formatCurrency(stock.accumulatedLoss)
                    : "-"}
                </td>
                <td
                  className={`p-4 text-right font-bold ${stock.totalTaxDue > 0 ? "text-danger" : "text-success"}`}
                >
                  {formatCurrency(stock.totalTaxDue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StocksSummaryTable;

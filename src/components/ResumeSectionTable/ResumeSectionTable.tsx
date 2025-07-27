import type { StockSummary } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { MobileStockCard } from "../MobileStockCard/MobileStorckCard";

interface StocksSummaryDesktopProps {
  stocks: StockSummary[];
}

export function ResumeSectionTable({ stocks }: StocksSummaryDesktopProps) {
  return (
    <>
      {/* Tabela para desktop */}
      <div className="hidden md:block overflow-x-auto">
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
            {stocks.map((stock) => (
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

      {/* Cards para mobile */}
      <div className="md:hidden max-w-[300px] md:w-full flex overflow-x-auto gap-x-4 pb-2">
        {stocks.map((stock) => (
          <MobileStockCard key={stock.symbol} stock={stock} />
        ))}
      </div>
    </>
  );
}

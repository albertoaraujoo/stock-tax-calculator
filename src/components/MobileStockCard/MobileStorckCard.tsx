import type { StockSummary } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";

export function MobileStockCard({ stock }: { stock: StockSummary }) {
  return (
    <div
      key={stock.symbol}
      className="min-w-[240px] bg-dark p-4 rounded-lg border border-gray-dark flex-shrink-0"
    >
      <div className="mb-2">
        <h3 className="text-purple-light font-bold text-lg">{stock.symbol}</h3>
        <span className="text-white text-xs">
          {stock.totalOperations} operações
        </span>
      </div>
      <hr className="my-2 border-white" />

      <div className="flex flex-col gap-2 text-sm">
        <div>
          <span className="text-white font-medium">Posição:&nbsp;</span>
          <span
            className={`font-medium ${stock.currentPosition > 0 ? "text-success" : "text-gray-400"}`}
          >
            {stock.currentPosition > 0
              ? stock.currentPosition.toLocaleString("pt-BR")
              : "-"}
          </span>
        </div>
        <div>
          <span className="text-white font-medium">Preço Médio:&nbsp;</span>
          <span className="text-white ">
            {stock.averagePrice > 0 ? formatCurrency(stock.averagePrice) : "-"}
          </span>
        </div>
        <div>
          <span className="text-white font-medium">
            Prejuízo Acumulado:&nbsp;
          </span>
          <span
            className={`font-medium ${stock.accumulatedLoss > 0 ? "text-danger" : "text-gray-400"}`}
          >
            {stock.accumulatedLoss > 0
              ? formatCurrency(stock.accumulatedLoss)
              : "-"}
          </span>
        </div>
        <div>
          <span className="text-white font-medium">IR Total Devido:&nbsp;</span>
          <span
            className={`font-bold ${stock.totalTaxDue > 0 ? "text-danger" : "text-success"}`}
          >
            {formatCurrency(stock.totalTaxDue)}
          </span>
        </div>
      </div>
    </div>
  );
}

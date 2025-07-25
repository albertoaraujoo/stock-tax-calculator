import type { Operation } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { MobileOperationCard } from "../MobileOperationCard/MobileOperationCard";

interface OperationListProps {
  operations: Operation[];
  onRemoveOperation: (operationId: string) => void;
}

export function OperationListTable({
  operations,
  onRemoveOperation,
}: OperationListProps) {
  const sortedOperations = [...operations].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <div className="hidden md:block overflow-x-auto max-h-[420px] md:max-h-[600px] overflow-y-auto rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-dark">
              <th className="text-white p-4 text-left">Data</th>
              <th className="text-white p-4 text-left">Ação</th>
              <th className="text-white p-4 text-center">Tipo</th>
              <th className="text-white p-4 text-right">Preço</th>
              <th className="text-white p-4 text-right">Qtd</th>
              <th className="text-white p-4 text-right">Taxa</th>
              <th className="text-white p-4 text-right">Total</th>
              <th className="text-white p-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {sortedOperations.map((operation) => {
              const total =
                operation.price * operation.quantity + operation.brokerageFee;

              return (
                <tr
                  key={operation.id}
                  className={`border-b border-gray-dark ${operation.type === "buy" ? "bg-green-100/10" : "bg-red-100/10"}`}
                >
                  <td className="text-white p-4">
                    {new Date(operation.date).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="text-purple-light p-4 font-bold">
                    {operation.stockSymbol}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`font-bold px-2 py-1 rounded ${operation.type === "buy" ? "text-success bg-green-100/20" : "text-danger bg-red-100/20"}`}
                    >
                      {operation.type === "buy" ? "COMPRA" : "VENDA"}
                    </span>
                  </td>
                  <td className="text-white p-4 text-right">
                    {formatCurrency(operation.price)}
                  </td>
                  <td className="text-white p-4 text-right">
                    {operation.quantity.toLocaleString("pt-BR")}
                  </td>
                  <td className="text-white p-4 text-right">
                    {formatCurrency(operation.brokerageFee)}
                  </td>
                  <td
                    className={`p-4 text-right font-bold ${operation.type === "buy" ? "text-success" : "text-danger"}`}
                  >
                    {operation.type === "buy" ? "-" : "+"}
                    {formatCurrency(total)}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => onRemoveOperation(operation.id)}
                      className="bg-danger hover:bg-danger-dark text-white border-none px-2 py-1 rounded cursor-pointer text-sm"
                      title="Remover operação"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="md:hidden flex overflow-x-auto gap-x-4 pb-2">
        {sortedOperations.map((operation) => (
          <MobileOperationCard
            key={operation.id}
            operation={operation}
            onRemove={onRemoveOperation}
          />
        ))}
      </div>
    </>
  );
}

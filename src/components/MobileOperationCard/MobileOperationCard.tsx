import type { Operation } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";

interface MobileOperationCardProps {
  operation: Operation;
  onRemove: (operationId: string) => void;
}

export function MobileOperationCard({
  operation,
  onRemove,
}: MobileOperationCardProps) {
  const total = operation.price * operation.quantity + operation.brokerageFee;

  return (
    <div
      className={`min-w-[260px] bg-dark p-4 rounded-lg border border-gray-700 flex-shrink-0 shadow-md mb-2 ${
        operation.type === "buy"
          ? "border-success-light"
          : "border-danger-light"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-purple-light font-bold text-lg">
          {operation.stockSymbol}
        </span>
        <span
          className={`font-bold px-2 py-1 rounded text-xs ${
            operation.type === "buy"
              ? "text-success bg-green-100/20"
              : "text-danger bg-red-100/20"
          }`}
        >
          {operation.type === "buy" ? "COMPRA" : "VENDA"}
        </span>
      </div>
      <div className="border-t border-white my-2" />

      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-white font-semibold">Data:</span>
          <span className="text-white ">
            {new Date(operation.date).toLocaleDateString("pt-BR")}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-white font-semibold">Preço:</span>
          <span className="text-white">{formatCurrency(operation.price)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white font-semibold">Qtd:</span>
          <span className="text-white">
            {operation.quantity.toLocaleString("pt-BR")}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-white font-semibold">Taxa:</span>
          <span className="text-white">
            {formatCurrency(operation.brokerageFee)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-white font-semibold">Total:</span>
          <span
            className={`font-bold ${
              operation.type === "buy" ? "text-success" : "text-danger"
            }`}
          >
            {operation.type === "buy" ? "-" : "+"}
            {formatCurrency(total)}
          </span>
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <button
          onClick={() => onRemove(operation.id)}
          className="bg-danger hover:bg-danger-dark text-white border-none px-2 py-1 rounded cursor-pointer text-sm"
          title="Remover operação"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

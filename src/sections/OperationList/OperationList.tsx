import type { Operation } from "@/types";
import { OperationListTable } from "../OperationListTable/OperationListTable";

interface OperationListProps {
  operations: Operation[];
  onRemoveOperation: (operationId: string) => void;
}

export function OperationList({
  operations,
  onRemoveOperation,
}: OperationListProps) {
  if (operations.length === 0) {
    return (
      <section className="mb-8 bg-gray-dark p-8 rounded-lg text-center">
        <p className="text-gray text-lg">Nenhuma operação cadastrada ainda.</p>
      </section>
    );
  }

  return (
    <section
      className="bg-gray-dark p-8 rounded-lg mb-8"
      aria-labelledby="operation-history-title"
    >
      <header>
        <h2
          id="operation-history-title"
          className="text-xl md:text-2xl font-bold mb-6 text-purple-light"
        >
          Histórico de Operações ({operations.length})
        </h2>
      </header>
      <OperationListTable
        operations={operations}
        onRemoveOperation={onRemoveOperation}
      />
    </section>
  );
}

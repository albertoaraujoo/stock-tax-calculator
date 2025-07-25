import OperationListTable from "../OperationListTable/OperationListTable";
import type { Operation } from "@/types";

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
      <div className="bg-gray-dark p-8 rounded-lg text-center">
        <p className="text-gray text-lg">Nenhuma operação cadastrada ainda.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-dark p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-purple-light">
        Histórico de Operações ( {operations.length} )
      </h2>
      <OperationListTable
        operations={operations}
        onRemoveOperation={onRemoveOperation}
      />
    </div>
  );
}

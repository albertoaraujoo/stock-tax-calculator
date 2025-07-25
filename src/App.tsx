import { useStockOperations } from "@/hooks/useStockOperations";
import "./index.css";
import { OperationForm } from "@/components/OperationForm/OperationForm";
import { Dashboard } from "@/components/Dashboard/Dashboard";
import { OperationList } from "@/components/OperationList/OperationList";

function App() {
  const {
    addOperation,
    stocksSummary,
    sellResults,
    removeOperation,
    operations,
  } = useStockOperations();

  return (
    <div className="min-h-screen p-8 bg-dark">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard */}
        <Dashboard stocksSummary={stocksSummary} sellResults={sellResults} />

        {/* Form */}
        <OperationForm onAddOperation={addOperation} />

        {/* Operation List */}
        <OperationList
          operations={operations}
          onRemoveOperation={removeOperation}
        />
      </div>
    </div>
  );
}

export default App;

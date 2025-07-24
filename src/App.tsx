import { useStockOperations } from "@/hooks/useStockOperations";
import "./index.css";
import { OperationForm } from "@/components/OperationForm/OperationForm";
import { Dashboard } from "@/components/Dashboard/Dashboard";

function App() {
  const { addOperation, stocksSummary, sellResults } = useStockOperations();

  return (
    <div className="min-h-screen p-8 bg-gray-dark">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard */}
        <Dashboard stocksSummary={stocksSummary} sellResults={sellResults} />

        {/* Form */}
        <OperationForm onAddOperation={addOperation} />
      </div>
    </div>
  );
}

export default App;

import { useStockOperations } from "@/hooks/useStockOperations";
import "./index.css";
import { OperationForm } from "@/components/OperationForm/OperationForm";

function App() {
  const { addOperation } = useStockOperations();

  return (
    <div className="min-h-screen p-8 bg-gray-dark">
      <div className="max-w-7xl mx-auto">
        {/* Form */}
        <OperationForm onAddOperation={addOperation} />
      </div>
    </div>
  );
}

export default App;

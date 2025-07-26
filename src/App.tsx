import { useStockOperations } from "@/hooks/useStockOperations";
import "./index.css";
import { OperationForm } from "@/sections/OperationForm/OperationForm";
import { Dashboard } from "@/sections/Dashboard/Dashboard";
import { OperationList } from "@/sections/OperationList/OperationList";
import { CardsSection } from "@/sections/CardsSection/CardsSection";

function App() {
  const {
    addOperation,
    stocksSummary,
    sellResults,
    removeOperation,
    operations,
  } = useStockOperations();

  return (
    <div className="min-h-screen px-8 py-12 bg-dark flex flex-col gap-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-light">
          Calculadora de IR sobre Ações
        </h1>

        <p className="text-gray text-center mb-6">
          Calcule o imposto de renda sobre suas operações com ações de forma
          simples e rápida.
        </p>

        <Dashboard stocksSummary={stocksSummary} sellResults={sellResults} />
        <OperationForm onAddOperation={addOperation} />
        <OperationList
          operations={operations}
          onRemoveOperation={removeOperation}
        />
        <CardsSection />
      </div>
    </div>
  );
}

export default App;

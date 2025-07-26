import type { StockSummary, TaxCalculationResult } from "@/types";

import { ResumeCard } from "../../components/ResumeCard/ResumeCard";

import { formatCurrency } from "@/utils/formatCurrency";
import { StocksSummaryTable } from "../../components/StocksSummaryTable/StocksSummaryTable";

interface DashboardProps {
  stocksSummary: StockSummary[];
  sellResults: TaxCalculationResult[];
}

export function Dashboard({ stocksSummary, sellResults }: DashboardProps) {
  const totalTaxDue = sellResults.reduce(
    (sum, result) => sum + result.taxDue,
    0
  );
  const totalOperations = stocksSummary.reduce(
    (sum, stock) => sum + stock.totalOperations,
    0
  );
  const totalCurrentPosition = stocksSummary.reduce(
    (sum, stock) => sum + stock.currentPosition * stock.averagePrice,
    0
  );

  const totalStocksInPortfolio = stocksSummary.filter(
    (stock) => stock.currentPosition > 0
  ).length;

  return (
    <section className="mb-8" aria-labelledby="dashboard-title">
      <header>
        <h2
          id="dashboard-title"
          className="text-xl md:text-2xl font-bold mb-6 text-purple-light"
        >
          Resumo Geral
        </h2>
      </header>
      {/* Cards de resumo */}
      <div className="grid gap-4 mb-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ResumeCard
          title="TOTAL IR DEVIDO"
          text={formatCurrency(totalTaxDue)}
          borderColor="purple"
          titleColor="purple"
          textColor={totalTaxDue > 0 ? "danger" : "success"}
        />
        <ResumeCard
          title="TOTAL OPERAÇÕES"
          text={totalOperations.toString()}
          borderColor="success"
          titleColor="success"
          textColor="white"
        />

        <ResumeCard
          title="POSIÇÃO ATUAL"
          text={formatCurrency(totalCurrentPosition)}
          borderColor="gray"
          titleColor="gray"
          textColor="white"
        />

        <ResumeCard
          title="AÇÕES EM CARTEIRA"
          text={totalStocksInPortfolio.toString()}
          borderColor="gray"
          titleColor="gray"
          textColor="white"
        />
      </div>

      {/* Resumo por Ação */}
      <StocksSummaryTable stocksSummary={stocksSummary} />
    </section>
  );
}

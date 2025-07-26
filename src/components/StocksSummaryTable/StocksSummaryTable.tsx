import type { StockSummary } from "@/types";
import { ResumeSectionChart } from "../ResumeSectionChart/ResumeSectionChart";
import { useState } from "react";
import { ResumeSectionTable } from "../ResumeSectionTable/ResumeSectionTable";

export interface StocksSummaryTableProps {
  stocksSummary: StockSummary[];
  viewChoice?: "resume" | "chart";
}

export function StocksSummaryTable({
  stocksSummary,
  viewChoice: initialView = "resume",
}: StocksSummaryTableProps) {
  const [viewChoice, setViewChoice] = useState<"resume" | "chart">(initialView);

  if (stocksSummary.length === 0) return null;

  return (
    <div className="bg-gray-dark p-4 md:p-8 rounded-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-purple-light">
        Resumo por Ação
      </h2>

      {/* Botões de escolha de visualização */}
      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded font-bold transition ${
            viewChoice === "resume"
              ? "bg-purple-light text-white"
              : "bg-gray text-purple-light hover:bg-purple-light/20"
          }`}
          onClick={() => setViewChoice("resume")}
        >
          Resumo
        </button>
        <button
          className={`px-4 py-2 rounded font-bold transition ${
            viewChoice === "chart"
              ? "bg-purple-light text-white"
              : "bg-gray text-purple-light hover:bg-purple-light/20"
          }`}
          onClick={() => setViewChoice("chart")}
        >
          Gráfico
        </button>
      </div>

      {/* Visualização condicional */}
      {viewChoice === "resume" ? (
        <ResumeSectionTable stocks={stocksSummary} />
      ) : (
        <div className="mt-4">
          <ResumeSectionChart stocks={stocksSummary} />
        </div>
      )}
    </div>
  );
}

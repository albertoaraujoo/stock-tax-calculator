import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { StockSummary } from "@/types";

{
  /* Importando o mock para testes */
}
// import { mockStocksSummary } from "@/mocks/mockStocksSummary";

export const description = "Gráfico de IR devido por ação";

interface DesktopChartProps {
  stocks: StockSummary[];
}

const chartConfig: ChartConfig = {
  ir: {
    label: "IR Devido",
    color: "#A259FF",
  },
};

export function ResumeSectionChart({ stocks }: DesktopChartProps) {
  {
    /* Mock data for testing */
  }
  //   const dataMock = mockStocksSummary
  //     .map((stock) =>
  //       stock.totalTaxDue > 0
  //         ? {
  //             symbol: stock.symbol,
  //             ir: stock.totalTaxDue,
  //             fill: "#A259FF",
  //           }
  //         : null
  //     )
  //     .filter(Boolean);

  const chartData = stocks
    .map((stock) =>
      stock.totalTaxDue > 0
        ? {
            symbol: stock.symbol,
            ir: stock.totalTaxDue,
            fill: "#A259FF",
          }
        : null
    )
    .filter(Boolean);

  return (
    <Card className="bg-gray-dark">
      <CardHeader>
        <CardTitle className="text-purple-light">IR Devido por Ação</CardTitle>
        <CardDescription className="text-gray">
          Visualize o imposto devido por cada ação na sua carteira
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="w-full overflow-y-auto"
          style={{
            scrollbarColor: "#A259FF #232136",
            scrollbarWidth: "thin",
          }}
        >
          <ChartContainer config={chartConfig} className="w-full h-[150px]">
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: 0,
              }}
              barSize={12}
            >
              <YAxis
                dataKey="symbol"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
                tick={({ x, y, payload }) => (
                  <text
                    x={x}
                    y={y}
                    fill="#A259FF"
                    fontWeight="bold"
                    fontSize={12}
                    textAnchor="end"
                    alignmentBaseline="middle"
                  >
                    {payload.value}
                  </text>
                )}
              />
              <XAxis dataKey="ir" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="ir" layout="vertical" radius={2} fill="#A259FF" />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium text-gray">
          IR total devido:{" "}
          <span className="text-purple-light font-bold">
            {chartData
              .reduce((acc, item) => acc + item.ir, 0)
              .toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
          </span>
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-gray leading-none">
          Mostrando IR devido por ação cadastrada
        </div>
      </CardFooter>
    </Card>
  );
}

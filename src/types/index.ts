export interface Operation {
  id: string;
  date: string;
  type: 'buy' | 'sell';
  stockSymbol: string;
  price: number;
  quantity: number;
  brokerageFee: number;
  createdAt: Date;
}

export interface Stock {
  symbol: string;
  averagePrice: number; // PM
  averageQuantity: number; // QM
  accumulatedLoss: number; // PA
  operations: Operation[];
}

export interface TaxCalculationResult {
  operationId: string;
  earnedResult: number; // RA
  taxDue: number; // IR
  newAccumulatedLoss: number;
  newAveragePrice: number;
  newAverageQuantity: number;
}

export interface StockSummary {
  symbol: string;
  totalOperations: number;
  totalTaxDue: number;
  currentPosition: number;
  averagePrice: number;
  accumulatedLoss: number;
}

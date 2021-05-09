export interface Investment {
  id: number;
  symbol: string;
  quantity: number;
  transactTime: Date;
  strikePrice: number;
  tradeDate: Date;
}

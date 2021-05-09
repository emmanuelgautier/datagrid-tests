
export interface Investment {
  id: number,
  symbol: string,
  quantity: number,
  transactTime: string,
  strikePrice: number,
  tradeDate: string
}

export interface InvestmentsPayload {
  data: Investment[]
}

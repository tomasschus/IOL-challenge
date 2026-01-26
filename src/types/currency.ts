export interface Currency {
  code: string
  name: string
}

export interface ExchangeRate {
  from: string
  to: string
  rate: number
}

export interface ExchangeResponse {
  amount: number
  base: string
  date: string
  rates: Record<string, number>
}

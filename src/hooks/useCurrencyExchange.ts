import { useQuery } from '@tanstack/react-query'
import { getExchangeRate } from '../services/api'
import type { ExchangeResponse } from '../types/currency'
import { canEnableExchange } from '../utils/validation'

export const useCurrencyExchange = (
  from: string,
  to: string,
  amount: number,
  enabled: boolean = true
) => {
  const isEnabled = enabled && canEnableExchange(from, to, amount)
  return useQuery<ExchangeResponse>({
    queryKey: ['exchange', from, to],
    queryFn: () => getExchangeRate(from, to),
    enabled: isEnabled,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

import { useQuery } from '@tanstack/react-query'
import { getExchangeRate } from '../services/api'
import type { ExchangeResponse } from '../types/currency'

export const useCurrencyExchange = (
  from: string,
  to: string,
  amount: number,
  enabled: boolean = true
) => {
  const isEnabled = enabled && from !== to && amount > 0 && from.trim() !== '' && to.trim() !== ''
  return useQuery<ExchangeResponse>({
    queryKey: ['exchange', from, to, amount],
    queryFn: () => getExchangeRate(from, to),
    enabled: isEnabled,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

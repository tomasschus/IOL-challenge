import { useQuery } from '@tanstack/react-query'
import { getCurrencies } from '../services/api'
import type { Currency, CurrencyApiResponse } from '../types/currency'

export const useCurrencies = () => {
  const {
    data: currenciesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['currencies'],
    queryFn: getCurrencies,
    staleTime: 24 * 60 * 60 * 1000, // 24 horas
  })

  const currencies: Currency[] = currenciesData
    ? Object.entries(currenciesData as Record<string, CurrencyApiResponse>)
        .map(([code, { name, symbol }]) => ({
          code,
          name,
          symbol,
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
    : []

  return {
    currencies,
    isLoading,
    error,
  }
}

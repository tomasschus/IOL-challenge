import { useQuery } from '@tanstack/react-query'
import { getCurrencies } from '../services/api'
import type { Currency } from '../types/currency'

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
    ? Object.entries(currenciesData).map(([code, currencyData]) => {
        if (typeof currencyData === 'string') {
          return {
            code,
            name: currencyData,
          }
        } else if (currencyData && typeof currencyData === 'object') {
          return {
            code,
            name:
              (currencyData as { name?: string; symbol?: string }).name || code,
          }
        }
        return {
          code,
          name: code,
        }
      })
    : []

  return {
    currencies,
    isLoading,
    error,
  }
}

import axios from 'axios'
import type { ExchangeResponse } from '../types/currency'
import { validateCurrencyParams } from '../utils/validation'

const API_BASE_URL = 'https://api.vatcomply.com'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

export const getExchangeRate = async (
  from: string,
  to: string
): Promise<ExchangeResponse> => {
  const validation = validateCurrencyParams(from, to)
  if (!validation.isValid) {
    throw new Error(validation.error)
  }

  const response = await api.get('/rates', {
    params: {
      base: from,
      symbols: to,
    },
  })
  return response.data
}

export const getCurrencies = async () => {
  const response = await api.get('/currencies')
  return response.data
}

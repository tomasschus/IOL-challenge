import axios from 'axios'
import type { ExchangeResponse } from '../types/currency'

const API_BASE_URL = 'https://api.vatcomply.com'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

export const getExchangeRate = async (
  from: string,
  to: string
): Promise<ExchangeResponse> => {
  if (!from || from.trim() === '') {
    throw new Error('Base currency is required')
  }
  if (!to || to.trim() === '') {
    throw new Error('Target currency is required')
  }
  if (from === to) {
    throw new Error('Base and target currencies must be different')
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

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FiLoader } from 'react-icons/fi'
import { TbArrowsSort } from 'react-icons/tb'
import { useCurrencies } from '../hooks/useCurrencies'
import { useCurrencyExchange } from '../hooks/useCurrencyExchange'
import { CurrencyInput } from './CurrencyInput'
import { CurrencySelect } from './CurrencySelect'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface FormData {
  amount: string
  from: string
  to: string
}

export const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')

  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      amount: '1.00',
      from: 'USD',
      to: 'EUR',
    },
  })

  const { currencies } = useCurrencies()
  const fromCurrencyName =
    currencies.find(c => c.code === fromCurrency)?.name || fromCurrency
  const toCurrencyName =
    currencies.find(c => c.code === toCurrency)?.name || toCurrency

  const amount = watch('amount')
  const numericAmount = parseFloat(amount || '0') || 0

  const { data, isLoading, error } = useCurrencyExchange(
    fromCurrency,
    toCurrency,
    numericAmount,
    numericAmount > 0 && fromCurrency !== toCurrency
  )

  const calculateResult = () => {
    if (!data || !data.rates || !data.rates[toCurrency]) {
      return '0.00'
    }

    const rate = data.rates[toCurrency]
    const result = numericAmount * rate
    return result.toFixed(6)
  }

  const result = calculateResult()
  const inverseRate = data?.rates[toCurrency]
    ? (1 / data.rates[toCurrency]).toFixed(6)
    : '0.00'

  const handleSwap = () => {
    const tempFrom = fromCurrency
    const tempTo = toCurrency
    setFromCurrency(tempTo)
    setToCurrency(tempFrom)
    setValue('from', tempTo)
    setValue('to', tempFrom)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return (
      date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'UTC',
      }) + ' UTC'
    )
  }

  return (
    <div className="relative w-full bg-white font-sans">
      <div className="w-full h-10 bg-[var(--brand-900)] flex items-center pl-6">
        <span className="text-white text-sm font-bold">Currency Converter</span>
      </div>

      <div className="w-full bg-[var(--brand-500)] pt-12 pb-36">
        <div className="flex items-center justify-center h-full">
          <h1 className="text-[28px] font-semibold text-white">
            {numericAmount || 1} {fromCurrency} to {toCurrency} – Convert{' '}
            {fromCurrencyName} to {toCurrencyName}
          </h1>
        </div>
      </div>

      <Card
        className="relative z-10 mx-auto"
        style={{
          width: 'calc(100% - 96px)',
          maxWidth: '1000px',
          marginTop: '-100px',
        }}
      >
        <CardContent className="pt-8 pb-4 px-8">
          <form>
            <div className="grid gap-2 mb-20" style={{ gridTemplateColumns: '1fr 1fr 0.3fr 1fr' }}>
              <div>
                <Controller
                  name="amount"
                  control={control}
                  rules={{
                    required: 'Amount is required',
                    validate: {
                      positive: (v: string) => {
                        const num = parseFloat(v || '0')
                        return num >= 0 || 'Amount cannot be negative'
                      },
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <CurrencyInput
                      label="Amount"
                      value={field.value}
                      onChange={value => {
                        field.onChange(value)
                        setValue('amount', value)
                      }}
                      error={
                        fieldState.error?.message || errors.amount?.message
                      }
                    />
                  )}
                />
              </div>

              <div>
                <CurrencySelect
                  label="From"
                  value={fromCurrency}
                  onChange={value => {
                    setFromCurrency(value)
                    setValue('from', value)
                  }}
                  excludeCurrency={toCurrency}
                />
              </div>

              <div className="flex items-end justify-center pb-0.5">
                <Button
                  type="button"
                  onClick={handleSwap}
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-white border-2 border-[var(--brand-500)] text-[var(--brand-500)] hover:bg-[var(--brand-50)]"
                  aria-label="Swap currencies"
                >
                  <TbArrowsSort className="w-5 h-5" />
                </Button>
              </div>

              <div>
                <CurrencySelect
                  label="To"
                  value={toCurrency}
                  onChange={value => {
                    setToCurrency(value)
                    setValue('to', value)
                  }}
                  excludeCurrency={fromCurrency}
                />
              </div>
            </div>

            <div className="flex gap-8 mb-6">
              <div className="flex-shrink-0" style={{ width: '43%' }}>
                {isLoading ? (
                  <div className="flex items-center gap-3 py-4">
                    <FiLoader className="w-6 h-6 animate-spin text-[var(--brand-500)]" />
                    <span className="text-base text-[var(--neutral-700)]">
                      Calculating...
                    </span>
                  </div>
                ) : error ? (
                  <div className="text-[var(--error-600)]">
                    Error loading exchange rate. Please try again.
                  </div>
                ) : (
                  <div>
                    <div className="text-[32px] font-bold leading-tight">
                      {numericAmount || 1} {fromCurrencyName} =
                    </div>
                    <div className="text-[32px] font-bold mb-3 leading-tight">
                      {result} {toCurrencyName}
                    </div>
                    <div className="text-sm text-[var(--neutral-500)] ">
                      1 {toCurrency} = {inverseRate} {fromCurrency}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1 flex items-start mt-6">
                <div className="bg-[var(--brand-100)] rounded-lg px-4 py-6 w-full">
                  <p className="text-sm text-[var(--neutral-700)] flex flex-col gap-2">
                    <span>
                      We use the mid-market rate for our Converter. This is for
                      informational
                    </span> <span>purposes only. You won't receive this rate
                      when sending money.</span>
                  </p>
                </div>
              </div>
            </div>

            {data && (
              <div className="text-right">
                <p className="text-xs text-[var(--neutral-500)]">
                  <span className="underline">{fromCurrencyName}</span> to{' '}
                  <span className="underline">{toCurrencyName}</span> conversion — Last
                  updated {formatDate(data.date)}
                </p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

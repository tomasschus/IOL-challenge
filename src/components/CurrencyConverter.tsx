import { useCallback, useEffect, useMemo, useState } from 'react'
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

  const fromCurrencyName = useMemo(
    () => currencies.find(c => c.code === fromCurrency)?.name || fromCurrency,
    [currencies, fromCurrency]
  )

  const toCurrencyName = useMemo(
    () => currencies.find(c => c.code === toCurrency)?.name || toCurrency,
    [currencies, toCurrency]
  )

  const amount = watch('amount')
  const numericAmount = useMemo(
    () => parseFloat(amount || '0') || 0,
    [amount]
  )

  useEffect(() => {
    setValue('from', fromCurrency, { shouldValidate: false })
  }, [fromCurrency, setValue])

  useEffect(() => {
    setValue('to', toCurrency, { shouldValidate: false })
  }, [toCurrency, setValue])

  const { data, isLoading, error } = useCurrencyExchange(
    fromCurrency,
    toCurrency,
    numericAmount,
    numericAmount > 0 && fromCurrency !== toCurrency
  )

  const result = useMemo(() => {
    if (!data || !data.rates || !data.rates[toCurrency]) {
      return '0.00'
    }
    const rate = data.rates[toCurrency]
    return (numericAmount * rate).toFixed(6)
  }, [data, toCurrency, numericAmount])

  const inverseRate = useMemo(
    () => (data?.rates[toCurrency] ? (1 / data.rates[toCurrency]).toFixed(6) : '0.00'),
    [data, toCurrency]
  )

  const handleSwap = useCallback(() => {
    const newFrom = toCurrency
    const newTo = fromCurrency
    setFromCurrency(newFrom)
    setToCurrency(newTo)
  }, [fromCurrency, toCurrency])

  const handleFromChange = useCallback(
    (value: string) => {
      setFromCurrency(value)
      setValue('from', value)
    },
    [setValue]
  )

  const handleToChange = useCallback(
    (value: string) => {
      setToCurrency(value)
      setValue('to', value)
    },
    [setValue]
  )

  const formatDate = useCallback((dateString?: string) => {
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
  }, [])

  return (
    <div className="relative w-full bg-white font-sans">
      <header className="w-full h-10 bg-[var(--brand-900)] flex items-center pl-4 sm:pl-6">
        <h2 className="text-white text-sm font-bold">Currency Converter</h2>
      </header>

      <div className="w-full bg-[var(--brand-500)] pt-12 pb-36">
        <div className="flex items-center justify-center h-full px-4">
          <h1 className="text-base sm:text-[28px] font-semibold text-white text-center break-words max-w-4xl">
            {numericAmount || 1} {fromCurrency} to {toCurrency} – Convert{' '}
            {fromCurrencyName} to {toCurrencyName}
          </h1>
        </div>
      </div>

      <Card
        className="relative z-10 mx-auto w-[calc(100%-2rem)] sm:w-[calc(100%-96px)] max-w-[1000px] -mt-[100px]"
        role="region"
        aria-label="Currency conversion form"
      >
        <CardContent className="pt-8 pb-4 px-4 sm:px-8">
          <form>
            <div className="grid gap-4 sm:gap-2 mb-12 sm:mb-20 grid-cols-1 sm:grid-cols-[1fr_1fr_0.3fr_1fr]">
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
                  onChange={handleFromChange}
                  excludeCurrency={toCurrency}
                />
              </div>

              <div className="flex items-end justify-center pb-0.5 sm:pb-0.5 order-3 sm:order-none">
                <Button
                  type="button"
                  onClick={handleSwap}
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-white border-2 border-[var(--brand-500)] text-[var(--brand-500)] hover:bg-[var(--brand-50)] focus-visible:ring-2 focus-visible:ring-[var(--brand-500)]"
                  aria-label="Swap currencies"
                >
                  <TbArrowsSort className="w-5 h-5" aria-hidden="true" />
                </Button>
              </div>

              <div className="order-4 sm:order-none">
                <CurrencySelect
                  label="To"
                  value={toCurrency}
                  onChange={handleToChange}
                  excludeCurrency={fromCurrency}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-6">
              <div className="flex-shrink-0 w-full sm:w-[43%]">
                {isLoading ? (
                  <div className="flex items-center gap-3 py-4" role="status" aria-live="polite" aria-label="Loading exchange rate">
                    <FiLoader className="w-6 h-6 animate-spin text-[var(--brand-500)]" aria-hidden="true" />
                    <span className="text-base text-[var(--neutral-700)]">
                      Calculating...
                    </span>
                  </div>
                ) : error ? (
                  <div className="text-[var(--error-600)]" role="alert" aria-live="assertive">
                    Error loading exchange rate. Please try again.
                  </div>
                ) : (
                  <div role="status" aria-live="polite">
                    <div className="text-2xl sm:text-[32px] font-bold leading-tight">
                      {numericAmount || 1} {fromCurrencyName} =
                    </div>
                    <div className="text-2xl sm:text-[32px] font-bold mb-3 leading-tight">
                      {result} {toCurrencyName}
                    </div>
                    <div className="text-sm text-[var(--neutral-500)] ">
                      1 {toCurrency} = {inverseRate} {fromCurrency}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1 flex items-start mt-0 sm:mt-6">
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

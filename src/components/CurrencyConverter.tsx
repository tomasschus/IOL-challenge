import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCurrencies } from '../hooks/useCurrencies'
import { useCurrencyExchange } from '../hooks/useCurrencyExchange'
import { calculateConversion, calculateInverseRate } from '../utils/currency'
import { parseNumericAmount } from '../utils/validation'
import { ConversionForm } from './ConversionForm'
import { ConversionResult } from './ConversionResult'
import { ConverterHeader } from './ConverterHeader'
import { ConverterHero } from './ConverterHero'
import { InfoBox } from './InfoBox'
import { LastUpdated } from './LastUpdated'
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
  const numericAmount = useMemo(() => parseNumericAmount(amount), [amount])

  const { data, isLoading, error } = useCurrencyExchange(
    fromCurrency,
    toCurrency,
    numericAmount,
    numericAmount > 0 && fromCurrency !== toCurrency
  )

  const result = useMemo(() => {
    if (!data?.rates?.[toCurrency]) {
      return '0.00'
    }
    return calculateConversion(numericAmount, data.rates[toCurrency])
  }, [data, toCurrency, numericAmount])

  const inverseRate = useMemo(() => {
    if (!data?.rates?.[toCurrency]) {
      return '0.00'
    }
    return calculateInverseRate(data.rates[toCurrency])
  }, [data, toCurrency])

  const handleSwap = useCallback(() => {
    const newFrom = toCurrency
    const newTo = fromCurrency
    setFromCurrency(newFrom)
    setToCurrency(newTo)
    setValue('from', newFrom, { shouldValidate: false })
    setValue('to', newTo, { shouldValidate: false })
  }, [fromCurrency, toCurrency, setValue])

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

  return (
    <div className="relative w-full bg-white font-sans">
      <ConverterHeader />

      <ConverterHero
        amount={numericAmount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        fromCurrencyName={fromCurrencyName}
        toCurrencyName={toCurrencyName}
      />

      <Card
        className="relative z-10 mx-auto w-[calc(100%-2rem)] sm:w-[calc(100%-96px)] max-w-[1000px] -mt-[100px]"
        role="region"
        aria-label="Currency conversion form"
      >
        <CardContent className="pt-8 pb-4 px-4 sm:px-8">
          <form>
            <ConversionForm
              control={control}
              errors={errors}
              setValue={setValue}
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              onFromChange={handleFromChange}
              onToChange={handleToChange}
              onSwap={handleSwap}
            />

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-6">
              <div className="shrink-0 w-full sm:w-[43%]">
                <ConversionResult
                  isLoading={isLoading}
                  error={error}
                  numericAmount={numericAmount}
                  fromCurrencyName={fromCurrencyName}
                  toCurrencyName={toCurrencyName}
                  result={result}
                  fromCurrency={fromCurrency}
                  toCurrency={toCurrency}
                  inverseRate={inverseRate}
                />
              </div>

              <InfoBox />
            </div>

            {data && (
              <LastUpdated
                fromCurrencyName={fromCurrencyName}
                toCurrencyName={toCurrencyName}
                date={data.date}
              />
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

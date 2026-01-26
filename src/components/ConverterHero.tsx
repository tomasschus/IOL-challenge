interface ConverterHeroProps {
  amount: number
  fromCurrency: string
  toCurrency: string
  fromCurrencyName: string
  toCurrencyName: string
}

export const ConverterHero = ({
  amount,
  fromCurrency,
  toCurrency,
  fromCurrencyName,
  toCurrencyName,
}: ConverterHeroProps) => {
  return (
    <div className="w-full bg-[var(--brand-500)] pt-12 pb-36">
      <div className="flex items-center justify-center h-full px-4">
        <h1 className="text-base sm:text-[28px] font-semibold text-white text-center break-words max-w-4xl">
          {amount || 1} {fromCurrency} to {toCurrency} – Convert{' '}
          {fromCurrencyName} to {toCurrencyName}
        </h1>
      </div>
    </div>
  )
}

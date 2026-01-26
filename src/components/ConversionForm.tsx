import type { Control, FieldErrors } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { CurrencyInput } from './CurrencyInput'
import { CurrencySelect } from './CurrencySelect'
import { SwapButton } from './SwapButton'

interface FormData {
  amount: string
  from: string
  to: string
}

interface ConversionFormProps {
  control: Control<FormData>
  errors: FieldErrors<FormData>
  setValue: (name: keyof FormData, value: string) => void
  fromCurrency: string
  toCurrency: string
  onFromChange: (value: string) => void
  onToChange: (value: string) => void
  onSwap: () => void
}

export const ConversionForm = ({
  control,
  errors,
  setValue,
  fromCurrency,
  toCurrency,
  onFromChange,
  onToChange,
  onSwap,
}: ConversionFormProps) => {
  return (
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
              onBlur={field.onBlur}
              name={field.name}
              error={fieldState.error?.message || errors.amount?.message}
            />
          )}
        />
      </div>

      <div>
        <CurrencySelect
          label="From"
          value={fromCurrency}
          onChange={onFromChange}
          excludeCurrency={toCurrency}
        />
      </div>

      <SwapButton onClick={onSwap} />

      <div className="order-4 sm:order-none">
        <CurrencySelect
          label="To"
          value={toCurrency}
          onChange={onToChange}
          excludeCurrency={fromCurrency}
        />
      </div>
    </div>
  )
}

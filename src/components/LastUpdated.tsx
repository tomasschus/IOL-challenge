import { formatDate } from '@/utils/date'

interface LastUpdatedProps {
  fromCurrencyName: string
  toCurrencyName: string
  date: string
}

export const LastUpdated = ({
  fromCurrencyName,
  toCurrencyName,
  date,
}: LastUpdatedProps) => {
  return (
    <div className="text-right">
      <p className="text-xs text-[var(--neutral-500)]">
        <span className="underline">{fromCurrencyName}</span> to{' '}
        <span className="underline">{toCurrencyName}</span> conversion — Last
        updated {formatDate(date)}
      </p>
    </div>
  )
}

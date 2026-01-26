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
    const formatDate = (dateString: string) => {
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
        <div className="text-right">
            <p className="text-xs text-[var(--neutral-500)]">
                <span className="underline">{fromCurrencyName}</span> to{' '}
                <span className="underline">{toCurrencyName}</span> conversion — Last
                updated {formatDate(date)}
            </p>
        </div>
    )
}


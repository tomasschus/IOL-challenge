export const InfoBox = () => {
  return (
    <div className="flex-1 flex items-start mt-0 sm:mt-6">
      <div className="bg-[var(--brand-100)] rounded-lg px-4 py-6 w-full">
        <p className="text-sm text-[var(--neutral-700)] flex flex-col gap-2">
          <span>
            We use the mid-market rate for our Converter. This is for
            informational
          </span>{' '}
          <span>
            purposes only. You won't receive this rate when sending money.
          </span>
        </p>
      </div>
    </div>
  )
}

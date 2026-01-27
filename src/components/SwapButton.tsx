import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import swapIcon from '@/assets/currency-swap.png'

interface SwapButtonProps {
  onClick: () => void
}

export const SwapButton = ({ onClick }: SwapButtonProps) => {
  return (
    <div className="flex items-end justify-center pb-0.5 sm:pb-0.5 order-3 sm:order-none">
      <Button
        type="button"
        onClick={onClick}
        variant="secondary"
        size="icon"
        className={cn(
          'rounded-full bg-white border-2 border-[var(--brand-500)]',
          'text-[var(--brand-500)] hover:bg-[var(--brand-50)]',
          'focus-visible:ring-2 focus-visible:ring-[var(--brand-500)]'
        )}
        aria-label="Swap currencies"
      >
        <img 
          src={swapIcon} 
          alt="" 
          className="w-5 h-5" 
          aria-hidden="true" 
        />
      </Button>
    </div>
  )
}

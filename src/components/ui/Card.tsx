import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'neon' | 'glow'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-gray-800/50 border border-gray-700 backdrop-blur-sm',
      glass: 'bg-white/5 backdrop-blur-md border border-white/10 shadow-xl',
      neon: 'bg-gray-900/80 border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:border-cyan-400/70',
      glow: 'bg-gradient-to-br from-gray-800/40 to-gray-900/60 border border-purple-500/30 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/30'
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl p-6 transition-all duration-500 hover:transform hover:scale-[1.02]',
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export default Card

import { useState, useEffect } from 'react';
import { Option } from '@/types/vote';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface OptionCardProps {
  option: Option;
  index: number;
  isSelected: boolean;
  hasVoted: boolean;
  percentage: number;
  onSelect: () => void;
}

const OptionCard = ({ option, index, isSelected, hasVoted, percentage, onSelect }: OptionCardProps) => {
  const [animateBar, setAnimateBar] = useState(false);

  useEffect(() => {
    if (hasVoted) {
      // Trigger animation after a short delay
      setTimeout(() => setAnimateBar(true), 100);
    }
  }, [hasVoted]);

  const colorClasses = [
    'bg-option-1',
    'bg-option-2',
    'bg-option-3',
    'bg-option-4',
  ];

  return (
    <Card
      onClick={!hasVoted ? onSelect : undefined}
      className={cn(
        'group relative overflow-hidden border-2 transition-all duration-300',
        !hasVoted && 'cursor-pointer hover:scale-105 hover:shadow-hover',
        hasVoted && 'cursor-default',
        isSelected && 'border-primary ring-2 ring-primary ring-offset-2',
        !isSelected && 'border-border'
      )}
    >
      <div className="relative z-10 p-6">
        <div className="mb-4 flex items-center justify-center">
          <div className="text-6xl transition-transform duration-300 group-hover:scale-110">
            {option.image}
          </div>
        </div>
        <h3 className="mb-3 text-center text-xl font-semibold text-card-foreground">
          {option.name}
        </h3>
        
        {hasVoted && (
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Votes</span>
              <span className="text-lg font-bold text-foreground">{percentage}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-1000 ease-out',
                  colorClasses[index],
                  animateBar && 'opacity-100',
                  !animateBar && 'w-0 opacity-0'
                )}
                style={{ width: animateBar ? `${percentage}%` : '0%' }}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default OptionCard;


import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IcebergSectionProps {
  id: string;
  bgColor: string;
  buttonText: string;
  onClick: () => void;
  isLastLevel?: boolean;
  showArrow?: boolean;
  nextSectionId?: string;
  children?: React.ReactNode;
}

const IcebergSection = ({
  id,
  bgColor,
  buttonText,
  onClick,
  isLastLevel = false,
  showArrow = true,
  nextSectionId,
  children,
}: IcebergSectionProps) => {
  
  const handleArrowClick = () => {
    if (nextSectionId) {
      document.getElementById(nextSectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id={id} className={cn('iceberg-section', bgColor)}>
      <div className="container max-w-4xl mx-auto flex flex-col items-center justify-center gap-8 p-4">
        {children || (
          <Button 
            className={cn(
              "iceberg-button bg-white/20 backdrop-blur-sm text-white border border-white/40 text-lg font-semibold",
              isLastLevel && "animate-pulse-red"
            )}
            onClick={onClick}
          >
            {buttonText}
          </Button>
        )}
        
        {showArrow && nextSectionId && (
          <div 
            className="absolute bottom-8 animate-float cursor-pointer" 
            onClick={handleArrowClick}
          >
            <ChevronDown className="h-10 w-10 text-white/70" />
          </div>
        )}
      </div>
    </section>
  );
};

export default IcebergSection;

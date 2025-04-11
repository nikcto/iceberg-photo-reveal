
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SkullConfirmationProps {
  onConfirm: () => void;
}

const SkullConfirmation = ({ onConfirm }: SkullConfirmationProps) => {
  const [confirmationLevel, setConfirmationLevel] = useState(0);
  
  const confirmationMessages = [
    "Вы уверены, что хотите открыть этот файл?",
    "ВНИМАНИЕ! Файл может содержать шокирующий контент. Продолжить?",
    "ПОСЛЕДНЕЕ ПРЕДУПРЕЖДЕНИЕ! Вы берете на себя всю ответственность за просмотр этого контента!"
  ];
  
  const handleConfirmClick = () => {
    if (confirmationLevel < 2) {
      setConfirmationLevel(prev => prev + 1);
    } else {
      onConfirm();
      setConfirmationLevel(0);
    }
  };
  
  const handleCancelClick = () => {
    setConfirmationLevel(0);
  };
  
  return (
    <div className="bg-black/90 p-8 rounded-lg flex flex-col items-center max-w-md w-full">
      <div className="mb-6">
        <svg 
          className={cn(
            "w-24 h-24 text-white",
            confirmationLevel === 1 ? "animate-pulse text-red-400" : "",
            confirmationLevel === 2 ? "animate-pulse-red text-red-600" : ""
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="9" r="8" fill="currentColor" />
          <path d="M9 9.2C9 8.6 9.4 8 10 8C10.6 8 11 8.4 11 9V13L11.6 12.6C12 12.2 12.6 12.4 13 12.8C13.4 13.2 13.2 13.8 12.8 14.2L10.8 16.2C10.4 16.6 9.6 16.6 9.2 16.2L7.2 14.2C6.8 13.8 6.6 13.2 7 12.8C7.4 12.4 8 12.2 8.4 12.6L9 13V9.2Z" fill="black" />
          <path d="M8.8 4.8C8.6 4.2 8.2 3.6 7.6 3.2C7 2.8 6.2 3 5.8 3.6C5.4 4.2 5.6 5 6.2 5.4C6.6 5.8 7.2 5.6 7.4 5.2" stroke="black" strokeWidth="0.5" />
          <path d="M15.2 4.8C15.4 4.2 15.8 3.6 16.4 3.2C17 2.8 17.8 3 18.2 3.6C18.6 4.2 18.4 5 17.8 5.4C17.4 5.8 16.8 5.6 16.6 5.2" stroke="black" strokeWidth="0.5" />
          <path d="M2 18C2 16.8 2.8 16 4 16H20C21.2 16 22 16.8 22 18V22C22 23.2 21.2 24 20 24H4C2.8 24 2 23.2 2 22V18Z" fill="currentColor" />
          <path d="M5 20H19" stroke="black" strokeWidth="0.5" />
          <path d="M5 22H19" stroke="black" strokeWidth="0.5" />
        </svg>
      </div>
      
      <p className={cn(
        "text-white text-center mb-6 text-lg",
        confirmationLevel === 1 ? "text-red-400 font-semibold" : "",
        confirmationLevel === 2 ? "text-red-600 font-bold uppercase" : ""
      )}>
        {confirmationMessages[confirmationLevel]}
      </p>
      
      <div className="flex space-x-4">
        <Button 
          onClick={handleCancelClick} 
          variant="outline"
          className="bg-transparent border-white/30 text-white hover:bg-white/20"
        >
          Отмена
        </Button>
        
        <Button 
          onClick={handleConfirmClick}
          className={cn(
            "bg-white/20 text-white hover:bg-white/30",
            confirmationLevel === 1 ? "bg-red-600/50 hover:bg-red-600/70" : "",
            confirmationLevel === 2 ? "bg-red-600 hover:bg-red-700 animate-pulse" : ""
          )}
        >
          Подтвердить
        </Button>
      </div>
    </div>
  );
};

export default SkullConfirmation;

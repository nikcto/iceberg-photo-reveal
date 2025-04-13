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
        <img 
          src="/skull-image.jpg" 
          alt="Предупреждение"
          className={cn(
            "w-24 h-24 object-cover rounded-full",
            confirmationLevel === 1 ? "animate-pulse ring-2 ring-red-400" : "",
            confirmationLevel === 2 ? "animate-pulse ring-4 ring-red-600" : ""
          )}
        />
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

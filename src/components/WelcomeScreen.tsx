
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface WelcomeScreenProps {
  onClose: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-iceberg-level1 to-iceberg-level2 text-white animate-fade-in">
      <div className="w-full max-w-md text-center px-6">
        <h1 className="text-4xl font-bold mb-4">Добро пожаловать</h1>
        <p className="text-xl mb-8">
          Вы стоите на вершине информационного айсберга. Готовы ли вы погрузиться глубже и узнать больше?
        </p>
        <Button 
          onClick={onClose} 
          className="iceberg-button bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 mb-12 group"
        >
          Узнать Больше <ChevronDown className="ml-1 group-hover:translate-y-1 transition-transform" />
        </Button>
      </div>
      
      <div className="absolute bottom-12 animate-bounce">
        <ChevronDown className="h-8 w-8 text-white/70" />
      </div>
    </div>
  );
};

export default WelcomeScreen;

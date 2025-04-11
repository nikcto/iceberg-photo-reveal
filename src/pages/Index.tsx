
import React, { useState, useEffect } from 'react';
import IcebergSection from '@/components/IcebergSection';
import ImageModal from '@/components/ImageModal';
import SkullConfirmation from '@/components/SkullConfirmation';
import WelcomeScreen from '@/components/WelcomeScreen';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | undefined>(undefined);
  const [showSkullConfirmation, setShowSkullConfirmation] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if this is the first visit
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (hasVisitedBefore) {
      setShowWelcome(false);
    }
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('hasVisitedBefore', 'true');
    
    // Scroll to the first level
    document.getElementById('level1')?.scrollIntoView({ behavior: 'smooth' });
    
    toast({
      title: "Начинаем погружение",
      description: "Нажимайте на кнопки, чтобы открывать скрытые слои информации.",
    });
  };

  const handleOpenImage = (level: number) => {
    // Здесь будут разные изображения для каждого уровня
    // Пользователь сам вставит свои изображения позже
    const placeholderImage = `/placeholder-level-${level}.jpg`;
    setCurrentImage(placeholderImage);
    setIsModalOpen(true);
    
    toast({
      title: `Уровень ${level} открыт`,
      description: "Фотография загружена. Продолжайте погружение.",
    });
  };

  const handleSkullClick = () => {
    setShowSkullConfirmation(true);
  };

  const handleSkullConfirm = () => {
    setShowSkullConfirmation(false);
    // Открываем финальное изображение
    setCurrentImage('/placeholder-final.jpg');
    setIsModalOpen(true);
    
    toast({
      title: "ФИНАЛЬНЫЙ УРОВЕНЬ ОТКРЫТ",
      description: "Вы достигли дна айсберга.",
      variant: "destructive",
    });
  };

  return (
    <div className="w-full">
      {showWelcome && <WelcomeScreen onClose={handleCloseWelcome} />}
      
      {/* Уровень 1 */}
      <IcebergSection 
        id="level1"
        bgColor="bg-gradient-to-b from-blue-300 to-iceberg-level1"
        buttonText="Что скрывается под поверхностью?"
        onClick={() => handleOpenImage(1)}
        nextSectionId="level2"
      />
      
      {/* Уровень 2 */}
      <IcebergSection 
        id="level2"
        bgColor="bg-gradient-to-b from-iceberg-level1 to-iceberg-level2"
        buttonText="Погрузиться глубже?"
        onClick={() => handleOpenImage(2)}
        nextSectionId="level3"
      />
      
      {/* Уровень 3 */}
      <IcebergSection 
        id="level3"
        bgColor="bg-gradient-to-b from-iceberg-level2 to-iceberg-level3"
        buttonText="Узнать больше тайн?"
        onClick={() => handleOpenImage(3)}
        nextSectionId="level4"
      />
      
      {/* Финальный уровень - Череп */}
      <IcebergSection 
        id="level4"
        bgColor="bg-gradient-to-b from-iceberg-level3 to-black"
        buttonText="???"
        onClick={handleSkullClick}
        isLastLevel={true}
        showArrow={false}
      >
        {showSkullConfirmation ? (
          <SkullConfirmation onConfirm={handleSkullConfirm} />
        ) : (
          <div onClick={handleSkullClick} className="cursor-pointer group">
            <svg 
              className="w-24 h-24 text-white/80 group-hover:text-white transition-all duration-300 group-hover:scale-110"
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
            <p className="mt-4 text-white/80 group-hover:text-white transition-colors text-lg">Нажмите, чтобы открыть</p>
          </div>
        )}
      </IcebergSection>
      
      {/* Модальное окно для изображений */}
      <ImageModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={currentImage}
        altText="Discovered content"
      />
    </div>
  );
};

export default Index;

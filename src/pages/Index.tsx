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
    const imagePath = `/level-${level}.jpg`;
    setCurrentImage(imagePath);
    setIsModalOpen(true);
  };

  const handleSkullClick = () => {
    setShowSkullConfirmation(true);
  };

  const handleSkullConfirm = () => {
    setShowSkullConfirmation(false);
    setCurrentImage('/whaat.mp4');
    setIsModalOpen(true);
    
  };

  return (
    <div className="w-full bg-gradient-to-b from-red-900 to-black min-h-screen">
      {showWelcome && <WelcomeScreen onClose={handleCloseWelcome} />}
      
      {/* Уровень 1 */}
      <IcebergSection 
        id="level1"
        bgColor="bg-gradient-to-b from-red-800 to-red-900"
        buttonText="КСЮША!?"
        onClick={() => handleOpenImage(1)}
        nextSectionId="level2"
      />
      
      {/* Уровень 2 */}
      <IcebergSection 
        id="level2"
        bgColor="bg-gradient-to-b from-red-900 to-red-950"
        buttonText="ДАНИЛ!?"
        onClick={() => handleOpenImage(2)}
        nextSectionId="level3"
      />
      
      {/* Уровень 3 */}
      <IcebergSection 
        id="level3"
        bgColor="bg-gradient-to-b from-red-950 to-black"
        buttonText="ЧТО ДЕЛАЛИ!?"
        onClick={() => handleOpenImage(3)}
        nextSectionId="level4"
      />
      
      {/* Финальный уровень - Череп */}
      <IcebergSection 
        id="level4"
        bgColor="bg-black"
        buttonText="???"
        onClick={handleSkullClick}
        isLastLevel={true}
        showArrow={false}
      >
        {showSkullConfirmation ? (
          <SkullConfirmation onConfirm={handleSkullConfirm} />
        ) : (
          <div onClick={handleSkullClick} className="cursor-pointer group flex flex-col items-center justify-center h-full">
            <img 
              src="/final-image.jpg" 
              alt="ВЫ НЕ ГОТОВЫ!"
              className="w-32 h-32 object-cover rounded-full opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
            />
            <p className="mt-4 text-white/80 group-hover:text-white transition-colors text-lg">Нажмите, чтобы открыть</p>
          </div>
        )}
      </IcebergSection>
      
      {/* Модальное окно для изображений */}
      <ImageModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={currentImage}
        altText={`Скрытое изображение уровня ${currentImage?.includes('final') ? 'финального' : currentImage?.match(/\d+/)?.[0] || ''}`}
      />
    </div>
  );
};

export default Index;


import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc?: string;
  altText?: string;
}

const ImageModal = ({ isOpen, onClose, imageSrc, altText }: ImageModalProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {imageSrc ? (
          <img 
            src={imageSrc} 
            alt={altText || "Revealed image"} 
            className="w-full h-auto object-contain max-h-[80vh] rounded-md"
          />
        ) : (
          <div className="w-full h-64 bg-gray-800 rounded-md flex items-center justify-center">
            <p className="text-white/70 text-lg">Изображение отсутствует</p>
          </div>
        )}
        
        <button 
          className="absolute top-4 right-4 bg-black/50 rounded-full p-2 text-white/90 hover:bg-white/20 transition-colors"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default ImageModal;

import React from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc?: string;
  altText?: string;
}

const ImageModal = ({ isOpen, onClose, imageSrc, altText }: ImageModalProps) => {
  if (!isOpen) return null;
  
  const isVideo = imageSrc?.endsWith('.mp4');
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/90 border-none p-0 overflow-hidden [&>button]:hidden max-w-4xl">
        <div className="relative w-full h-full flex items-center justify-center">
          {isVideo ? (
            <video
              src={imageSrc}
              autoPlay
              controls
              loop
              className="w-full h-auto max-h-[80vh] rounded-lg"
            />
          ) : (
            <img
              src={imageSrc}
              alt={altText}
              className="w-auto h-auto max-h-[80vh] max-w-full object-contain rounded-lg"
            />
          )}
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/50 hover:bg-black/70 text-white"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;

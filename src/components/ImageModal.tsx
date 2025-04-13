import React, { useState } from 'react';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc?: string;
  altText?: string;
}

const ImageModal = ({ isOpen, onClose, imageSrc, altText }: ImageModalProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  if (!isOpen) return null;
  
  const isVideo = imageSrc?.endsWith('.mp4');
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "bg-black/90 border-none p-0 overflow-hidden [&>button]:hidden",
        isFullscreen ? "w-screen h-screen max-w-none max-h-none" : "max-w-4xl"
      )}>
        <div className={cn(
          "relative w-full h-full overflow-hidden",
          isFullscreen ? "w-full h-full" : ""
        )}>
          {isVideo ? (
            <video
              src={imageSrc}
              autoPlay
              controls
              loop
              className={cn(
                "w-full h-auto rounded-lg",
                isFullscreen ? "h-full object-cover" : "max-h-[80vh]"
              )}
              onClick={toggleFullscreen}
            />
          ) : (
            <img
              src={imageSrc}
              alt={altText}
              className={cn(
                "w-full h-auto rounded-lg cursor-pointer",
                isFullscreen ? "h-full object-cover" : "max-h-[80vh] object-contain"
              )}
              onClick={toggleFullscreen}
            />
          )}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/50 hover:bg-black/70 text-white"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <Minimize2 className="h-5 w-5" />
              ) : (
                <Maximize2 className="h-5 w-5" />
              )}
            </Button>
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

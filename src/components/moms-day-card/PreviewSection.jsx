
import React from 'react';
import { Button } from '@/components/ui/button';
import { ImageOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const PreviewSection = ({ message, generatedMessage, images, removeImage, selectedFont, selectedFontColor, selectedBackground, backgroundOptions }) => {
  const displayMessage = generatedMessage || message || "Para a melhor mãe do mundo!";
  const currentBackground = backgroundOptions.find(bg => bg.id === selectedBackground) || backgroundOptions[0];

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className={cn(
        "preview-section-container p-4 sm:p-6 rounded-xl shadow-inner min-h-[380px] sm:min-h-[420px] flex flex-col items-center justify-start relative overflow-hidden",
        currentBackground.className
      )}
      style={currentBackground.style} 
    >
      <h3 
        className={cn(
          "card-message-text text-2xl sm:text-3xl mb-4 sm:mb-6 text-center whitespace-pre-wrap leading-tight p-2 rounded-md",
          selectedFont, 
          selectedFontColor
        )}
        style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.15)' }} 
      >
        {displayMessage}
      </h3>

      <AnimatePresence>
        {images.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center text-pink-600/80 flex flex-col items-center justify-center flex-grow bg-white/20 backdrop-blur-sm p-4 rounded-lg"
          >
            <ImageOff className="h-20 w-20 sm:h-24 sm:w-24 mx-auto text-pink-400/70 opacity-70 mb-3 sm:mb-4" />
            <p className="text-sm sm:text-md">Adicione suas fotos favoritas!</p>
            <p className="text-xs sm:text-sm">Elas aparecerão aqui.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className={`grid gap-3 sm:gap-4 w-full px-2 pb-2
          ${images.length === 1 ? 'grid-cols-1' : ''}
          ${images.length === 2 ? 'grid-cols-2' : ''}
          ${images.length === 3 ? 'grid-cols-2 sm:grid-cols-3' : ''}
          ${images.length >= 4 ? 'grid-cols-2 sm:grid-cols-2' : ''} 
          place-items-center`}
      >
        <AnimatePresence>
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              className="polaroid relative group w-full max-w-[130px] sm:max-w-[150px]"
              initial={{ opacity: 0, y: 50, rotate: Math.random() * 6 - 3 }}
              animate={{ opacity: 1, y: 0, rotate: (Math.random() * 3 - 1.5) }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
              transition={{ type: 'spring', stiffness: 100, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            >
              <img 
                src={img.url || img.dataUrl} 
                alt={img.name || 'Uploaded image'} 
                className="w-full h-28 sm:h-32 object-cover" 
                onError={(e) => { e.target.alt = "Falha ao carregar imagem"; e.target.src = ""; }}
              />
              <div className="polaroid-caption-area">
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 sm:h-7 sm:w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-md"
                onClick={() => removeImage(img.id)}
              >
                <span className="text-xs">X</span>
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PreviewSection;
  

import React from 'react';
import { Label } from '@/components/ui/label';
import { FileImage as ImageIcon, Lock, Sparkles as PremiumIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export const BackgroundSelector = ({ selectedBackground, setSelectedBackground, backgroundOptions, isPremium }) => {
  const availableBackgrounds = backgroundOptions.filter(bg => !bg.premium || isPremium);
  const premiumBackgrounds = backgroundOptions.filter(bg => bg.premium && !isPremium);

  const renderBackgroundOption = (bg, isLocked) => (
    <button
      key={bg.id}
      type="button"
      onClick={() => !isLocked && setSelectedBackground(bg.id)}
      disabled={isLocked}
      className={cn(
        'h-20 sm:h-24 rounded-lg border-2 p-1 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-105 relative group',
        selectedBackground === bg.id ? 'border-pink-500 ring-2 ring-pink-500 ring-offset-1' : 'border-pink-200 hover:border-pink-400',
        isLocked && 'opacity-60 cursor-not-allowed hover:scale-100'
      )}
      aria-label={`Selecionar fundo: ${bg.name}${isLocked ? ' (Premium)' : ''}`}
    >
      <div
        className={cn("w-full h-full rounded-md bg-cover bg-center relative", bg.className)}
        style={bg.style}
        title={bg.name}
      >
        {isLocked && (
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center rounded-md p-1">
            <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 mb-0.5 sm:mb-1" />
            <span className="text-[10px] sm:text-xs text-white font-semibold text-center">Premium</span>
          </div>
        )}
        {!isLocked && bg.premium && (
           <Badge variant="secondary" className="absolute top-1 right-1 text-[10px] sm:text-xs bg-yellow-400 text-yellow-900 px-1.5 py-0.5">
             <PremiumIcon className="h-3 w-3 mr-1" /> Premium
           </Badge>
         )}
         <div className="absolute bottom-0 left-0 right-0 bg-black/30 text-white text-[10px] sm:text-xs p-0.5 sm:p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-b-md">
            {bg.name}
         </div>
      </div>
    </button>
  );

  return (
    <div>
      <Label className="text-md sm:text-lg font-medium text-pink-600 flex items-center mb-2">
        <ImageIcon size={20} className="mr-2 text-pink-500" />
        Escolha o Fundo do Cartão:
      </Label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {availableBackgrounds.map(bg => renderBackgroundOption(bg, false))}
        {premiumBackgrounds.map(bg => renderBackgroundOption(bg, true))}
      </div>
    </div>
  );
};
  
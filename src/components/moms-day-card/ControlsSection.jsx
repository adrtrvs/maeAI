
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, Sparkles, MessageSquare, Settings2, Image as ImageIcon, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { MAX_FREE_IMAGES, MAX_PREMIUM_IMAGES } from '@/pages/HomePage';
import { FontSelector } from '@/components/moms-day-card/FontSelector';
import { BackgroundSelector } from '@/components/moms-day-card/BackgroundSelector';
import { FontColorSelector } from '@/components/moms-day-card/FontColorSelector';

const ControlsSection = ({
  message, setMessage,
  generatedMessage, setGeneratedMessage,
  handleImageUpload, fileInputRef,
  isPremium, images,
  onGenerateAIMessage,
  selectedFont, setSelectedFont, fontOptions,
  selectedFontColor, setSelectedFontColor, fontColorOptions,
  selectedBackground, setSelectedBackground, backgroundOptions
}) => {
  return (
    <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl flex items-center text-pink-700">
            <Settings2 className="mr-2 h-6 w-6 text-pink-500" />
            Personalize seu Cartão
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <Label htmlFor="message" className="text-md sm:text-lg font-medium text-pink-600">Sua Mensagem Especial:</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escreva algo do coração..."
              className={`mt-2 text-md sm:text-lg border-pink-300 focus:border-pink-500 focus:ring-pink-500 min-h-[100px] ${selectedFont} ${selectedFontColor}`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FontSelector 
              selectedFont={selectedFont} 
              setSelectedFont={setSelectedFont} 
              fontOptions={fontOptions} 
            />
            <FontColorSelector
              selectedFontColor={selectedFontColor}
              setSelectedFontColor={setSelectedFontColor}
              fontColorOptions={fontColorOptions}
            />
          </div>

          <div>
            <BackgroundSelector
              selectedBackground={selectedBackground}
              setSelectedBackground={setSelectedBackground}
              backgroundOptions={backgroundOptions}
              isPremium={isPremium}
            />
          </div>

          {isPremium && (
            <div>
              <Button
                variant="outline"
                className="w-full mt-1 border-purple-400 text-purple-600 hover:bg-purple-100 flex items-center justify-center gap-2 text-sm sm:text-md py-2.5 sm:py-3"
                onClick={onGenerateAIMessage}
              >
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" /> Gerar Texto com IA (Premium)
              </Button>
              {generatedMessage && (
                <p className={`mt-2 text-xs sm:text-sm bg-purple-50 p-2 sm:p-3 rounded-md border border-purple-200 ${selectedFontColor} text-opacity-80`}>
                  <strong className={`${selectedFontColor}`}>Sugestão IA:</strong> <span className={selectedFont}>{generatedMessage}</span>
                </p>
              )}
            </div>
          )}

          <div>
            <Label className="text-md sm:text-lg font-medium text-pink-600">Adicionar Fotos (Estilo Polaroid):</Label>
            <Button
              variant="outline"
              className="w-full mt-2 border-pink-400 text-pink-600 hover:bg-pink-100 flex items-center justify-center gap-2 text-sm sm:text-md py-3 sm:py-4"
              onClick={() => fileInputRef.current?.click()}
              disabled={(isPremium ? images.length >= MAX_PREMIUM_IMAGES : images.length >= MAX_FREE_IMAGES)}
            >
              <UploadCloud className="h-5 w-5 sm:h-6 sm:w-6" /> Escolher Imagens
            </Button>
            <Input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <p className="text-xs sm:text-sm text-pink-500 mt-1.5">
              {isPremium ? `Até ${MAX_PREMIUM_IMAGES} imagens.` : `Grátis: Até ${MAX_FREE_IMAGES} imagens.`}
            </p>
          </div>

          {isPremium && (
            <div className="mt-3 p-3 bg-green-50 border border-green-300 rounded-lg text-green-700">
              <p className="font-semibold flex items-center text-sm sm:text-md"><Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-yellow-500" /> Você é Premium!</p>
              <p className="text-xs sm:text-sm">Aproveite todos os recursos exclusivos.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ControlsSection;
  
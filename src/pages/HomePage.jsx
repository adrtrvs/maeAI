
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Heart, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import ControlsSection from '@/components/moms-day-card/ControlsSection';
import PreviewSection from '@/components/moms-day-card/PreviewSection';
import PremiumDialog from '@/components/moms-day-card/PremiumDialog';
import { useMotherDayCardState } from '@/hooks/useMotherDayCardState';
import html2canvas from 'html2canvas';
import { useToast } from '@/components/ui/use-toast';
import { StripePaymentButton } from '@/components/moms-day-card/StripePaymentButton';
import { StripeProvider } from '@/components/StripeProvider';
import { cn } from '@/lib/utils';


export const MAX_FREE_IMAGES = 2;
export const MAX_PREMIUM_IMAGES = 10;

export const fontOptions = [
  { value: 'font-great-vibes', label: 'Great Vibes (Padrão)', className: 'font-great-vibes' },
  { value: 'font-caveat', label: 'Caveat', className: 'font-caveat' },
  { value: 'font-pacifico', label: 'Pacifico', className: 'font-pacifico' },
  { value: 'font-dancing-script', label: 'Dancing Script', className: 'font-dancing-script' },
  { value: 'font-lobster', label: 'Lobster', className: 'font-lobster' },
  { value: 'font-sacramento', label: 'Sacramento', className: 'font-sacramento' },
  { value: 'font-kalam', label: 'Kalam', className: 'font-kalam' },
  { value: 'font-cookie', label: 'Cookie', className: 'font-cookie' },
  { value: 'font-satisfy', label: 'Satisfy', className: 'font-satisfy' },
  { value: 'font-montserrat', label: 'Montserrat', className: 'font-montserrat' },
  { value: 'font-inter', label: 'Inter', className: 'font-inter' },
];

export const fontColorOptions = [
  { value: 'text-pink-700', label: 'Rosa Escuro (Padrão)', className: 'bg-pink-700', hex: '#be185d'},
  { value: 'text-black', label: 'Preto', className: 'bg-black', hex: '#000000' },
  { value: 'text-purple-700', label: 'Roxo', className: 'bg-purple-700', hex: '#7e22ce' },
  { value: 'text-red-600', label: 'Vermelho', className: 'bg-red-600', hex: '#dc2626' },
  { value: 'text-blue-600', label: 'Azul', className: 'bg-blue-600', hex: '#2563eb' },
  { value: 'text-green-700', label: 'Verde Escuro', className: 'bg-green-700', hex: '#15803d' },
  { value: 'text-gray-700', label: 'Cinza Escuro', className: 'bg-gray-700', hex: '#374151' },
  { value: 'text-white', label: 'Branco', className: 'bg-white border border-gray-300', hex: '#FFFFFF' },
];

export const backgroundOptions = [
  { id: 'bg-default', name: 'Padrão (Rosa Claro)', value: 'bg-pink-50', style: { backgroundColor: '#FFF0F5' }, className: 'bg-pink-50', staticEquivalent: { backgroundColor: '#FFF0F5' } },
  { id: 'bg-animated-hearts', name: 'Corações Animados', value: 'animated-hearts-bg', style: {}, className: 'animated-hearts-bg', staticEquivalent: { backgroundColor: '#ffe4e1' } },
  { id: 'bg-animated-flowers', name: 'Flores Animadas', value: 'animated-flowers-bg', style: {}, className: 'animated-flowers-bg', staticEquivalent: { backgroundColor: '#f0fff0' } },
  { id: 'bg-subtle-sparkle', name: 'Brilho Suave', value: 'bg-subtle-sparkle', style: {}, className: 'bg-subtle-sparkle', staticEquivalent: { backgroundColor: '#fff0f5' } },
  { id: 'bg-floral-vintage', name: 'Floral Vintage', value: 'floral-vintage', style: { backgroundImage: 'url("https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")' }, staticEquivalent: { backgroundImage: 'url("https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' } },
  { id: 'bg-hearts-pattern', name: 'Padrão de Corações', value: 'hearts-pattern', style: { backgroundImage: 'url("https://images.unsplash.com/photo-1580790742713-a0f309956c6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")' }, staticEquivalent: { backgroundImage: 'url("https://images.unsplash.com/photo-1580790742713-a0f309956c6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' } },
  { id: 'bg-soft-roses', name: 'Rosas Suaves', value: 'soft-roses', style: { backgroundImage: 'url("https://images.unsplash.com/photo-1560938189-96e0274a5015?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")' }, staticEquivalent: { backgroundImage: 'url("https://images.unsplash.com/photo-1560938189-96e0274a5015?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' } },
  { id: 'bg-watercolor-hearts', name: 'Corações Aquarela', value: 'watercolor-hearts', style: { backgroundImage: 'url("https://images.unsplash.com/photo-1559601968-16d3b1a1983f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")' }, premium: true, staticEquivalent: { backgroundImage: 'url("https://images.unsplash.com/photo-1559601968-16d3b1a1983f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' } },
  { id: 'bg-delicate-flowers', name: 'Flores Delicadas', value: 'delicate-flowers', style: { backgroundImage: 'url("https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")' }, premium: true, staticEquivalent: { backgroundImage: 'url("https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' } },
  { id: 'bg-pink-gradient-hearts', name: 'Gradiente Rosa Corações', value: 'pink-gradient-hearts', style: { background: 'linear-gradient(135deg, #ffdde1 0%, #ee9ca7 100%)' }, premium: true, staticEquivalent: { background: 'linear-gradient(135deg, #ffdde1 0%, #ee9ca7 100%)' } },
  { id: 'bg-pastel-floral-border', name: 'Borda Floral Pastel', value: 'pastel-floral-border', style: { backgroundImage: 'url("https://images.unsplash.com/photo-1520052205864-92d242b367b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")' }, premium: true, staticEquivalent: { backgroundImage: 'url("https://images.unsplash.com/photo-1520052205864-92d242b367b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' } },
  { id: 'bg-love-letter', name: 'Carta de Amor (Textura)', value: 'love-letter', style: { backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-paper.png")', backgroundColor: '#fdf5e6', backgroundBlendMode: 'multiply' }, premium: true, staticEquivalent: { backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-paper.png")', backgroundColor: '#fdf5e6', backgroundBlendMode: 'multiply', backgroundSize: 'auto', backgroundPosition: 'initial' } },
];


const HomePage = () => {
  const {
    images,
    isPremium,
    setIsPremium,
    message,
    setMessage,
    generatedMessage,
    setGeneratedMessage,
    selectedFont,
    setSelectedFont,
    selectedFontColor,
    setSelectedFontColor,
    selectedBackground,
    setSelectedBackground,
    fileInputRef,
    handleImageUpload,
    removeImage,
    handleGenerateAIMessage,
  } = useMotherDayCardState();

  const { toast } = useToast();
  const cardPreviewRef = useRef(null);

  const handleDownloadCard = async () => {
    if (cardPreviewRef.current) {
      toast({
        title: 'Preparando seu cartão...',
        description: 'O download começará em breve.',
      });
      try {
        const previewElement = cardPreviewRef.current;
        
        const canvas = await html2canvas(previewElement, {
          useCORS: true,
          allowTaint: true,
          backgroundColor: null, 
          scale: 3, 
          imageTimeout: 20000, 
          onclone: (documentClone) => {
            const clonedPreviewArea = documentClone.querySelector('.card-preview-area-capture-for-download');
            if (clonedPreviewArea) {
              const currentBgOption = backgroundOptions.find(bg => bg.id === selectedBackground) || backgroundOptions[0];
              
              clonedPreviewArea.className = 'p-4 sm:p-6 rounded-xl shadow-inner min-h-[380px] sm:min-h-[420px] flex flex-col items-center justify-start relative overflow-hidden';
              
              let inlineStyle = '';
              const staticStyle = currentBgOption.staticEquivalent || currentBgOption.style;
              if (staticStyle) {
                for (const prop in staticStyle) {
                  inlineStyle += `${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${staticStyle[prop]}; `;
                }
              }
              inlineStyle += 'background-size: cover !important; background-position: center center !important; background-repeat: no-repeat !important; width: 100%; height: 100%;';
              clonedPreviewArea.setAttribute('style', inlineStyle);
              
              if (currentBgOption.className && !currentBgOption.staticEquivalent) {
                 clonedPreviewArea.classList.add(currentBgOption.className);
              }


              const textElement = clonedPreviewArea.querySelector('.card-message-text');
              if (textElement) {
                  const fontColorObj = fontColorOptions.find(fc => fc.value === selectedFontColor);
                  if (fontColorObj && fontColorObj.hex) {
                    textElement.style.color = fontColorObj.hex;
                  } else {
                    textElement.style.color = '#000000'; 
                  }
                  textElement.style.backgroundColor = 'transparent';
                  textElement.style.textShadow = '1px 1px 2px rgba(0,0,0,0.1)';
              }
              
              Array.from(documentClone.querySelectorAll('.polaroid img')).forEach(img => {
                img.style.objectFit = 'contain';
              });
            }
          }
        });
        const image = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.href = image;
        link.download = 'cartao-dia-das-maes.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({
          title: 'Cartão baixado!',
          description: 'Seu cartão personalizado foi salvo com sucesso.',
        });
      } catch (error) {
        console.error("Erro ao gerar imagem do cartão:", error);
        toast({
          title: 'Erro ao baixar',
          description: 'Não foi possível gerar a imagem do cartão. Tente novamente.',
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: 'Erro',
        description: 'Não foi possível encontrar a área do cartão para baixar.',
        variant: 'destructive',
      });
    }
  };

  const handlePaymentSuccess = () => {
    setIsPremium(true);
    toast({
      title: 'Pagamento Aprovado!',
      description: 'Seu plano Premium foi ativado. Aproveite os recursos exclusivos!',
      className: 'bg-green-500 text-white',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 md:p-8 max-w-6xl" 
    >
      <Card className="overflow-hidden shadow-2xl bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50">
        <CardHeader className="text-center bg-pink-500/10 p-6 sm:p-8">
          <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}>
            <Heart className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-pink-500 mb-3 sm:mb-4" />
          </motion.div>
          <CardTitle className={`text-3xl sm:text-4xl font-bold ${selectedFont} ${selectedFontColor}`}>Cartão de Dia das Mães</CardTitle>
          <CardDescription className={`text-md sm:text-lg ${selectedFontColor} opacity-80`}>Crie uma linda surpresa cheia de amor!</CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 md:p-8">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            <ControlsSection
              message={message}
              setMessage={setMessage}
              generatedMessage={generatedMessage}
              setGeneratedMessage={setGeneratedMessage}
              handleImageUpload={handleImageUpload}
              fileInputRef={fileInputRef}
              isPremium={isPremium}
              images={images}
              onGenerateAIMessage={handleGenerateAIMessage}
              selectedFont={selectedFont}
              setSelectedFont={setSelectedFont}
              fontOptions={fontOptions}
              selectedFontColor={selectedFontColor}
              setSelectedFontColor={setSelectedFontColor}
              fontColorOptions={fontColorOptions}
              selectedBackground={selectedBackground}
              setSelectedBackground={setSelectedBackground}
              backgroundOptions={backgroundOptions}
            />
            <div ref={cardPreviewRef} className="card-preview-area-capture-for-download">
              <PreviewSection
                message={message}
                generatedMessage={generatedMessage}
                images={images}
                removeImage={removeImage}
                isPremium={isPremium}
                selectedFont={selectedFont}
                selectedFontColor={selectedFontColor}
                selectedBackground={selectedBackground}
                backgroundOptions={backgroundOptions}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 sm:p-6 md:p-8 bg-pink-500/10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {!isPremium ? (
            <StripeProvider>
              <StripePaymentButton 
                onSuccess={handlePaymentSuccess} 
                buttonTrigger={<PremiumDialog />} 
              />
            </StripeProvider>
          ) : (
            <p className="text-green-600 font-semibold">Você já é Premium!</p>
          )}
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3 px-6 sm:px-8 text-md sm:text-lg flex items-center gap-2 w-full sm:w-auto"
            onClick={handleDownloadCard}
          >
            <Download className="h-5 w-5" /> Baixar Cartão
          </Button>
        </CardFooter>
      </Card>
      <footer className="text-center mt-6 sm:mt-8 text-pink-600">
        <p>Feito com <Heart className="inline h-4 w-4 text-red-500" /> para todas as mães!</p>
      </footer>
    </motion.div>
  );
};

export default HomePage;
  
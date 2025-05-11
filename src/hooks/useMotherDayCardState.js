
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { MAX_FREE_IMAGES, MAX_PREMIUM_IMAGES, fontOptions, fontColorOptions, backgroundOptions } from '@/pages/HomePage';

export const useMotherDayCardState = () => {
  const [images, setImages] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [message, setMessage] = useState('Para a melhor mãe do mundo!');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [selectedFont, setSelectedFont] = useState(fontOptions[0].value); // Default to Great Vibes
  const [selectedFontColor, setSelectedFontColor] = useState(fontColorOptions[0].value);
  const [selectedBackground, setSelectedBackground] = useState(backgroundOptions[0].id);
  const { toast } = useToast();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('mothersDayImages') || '[]');
    const storedPremiumStatus = JSON.parse(localStorage.getItem('isPremiumUser') || 'false');
    const storedMessage = localStorage.getItem('mothersDayMessage') || 'Para a melhor mãe do mundo!';
    const storedGeneratedMessage = localStorage.getItem('mothersDayGeneratedMessage') || '';
    const storedFont = localStorage.getItem('mothersDayFont') || fontOptions[0].value; // Default to Great Vibes
    const storedFontColor = localStorage.getItem('mothersDayFontColor') || fontColorOptions[0].value;
    const storedBackground = localStorage.getItem('mothersDayBackground') || backgroundOptions[0].id;

    setImages(storedImages);
    setIsPremium(storedPremiumStatus);
    setMessage(storedMessage);
    setGeneratedMessage(storedGeneratedMessage);
    setSelectedFont(storedFont);
    setSelectedFontColor(storedFontColor);
    setSelectedBackground(storedBackground);
  }, []);

  useEffect(() => {
    localStorage.setItem('mothersDayImages', JSON.stringify(images));
  }, [images]);

  useEffect(() => {
    localStorage.setItem('isPremiumUser', JSON.stringify(isPremium));
  }, [isPremium]);

  useEffect(() => {
    localStorage.setItem('mothersDayMessage', message);
  }, [message]);

  useEffect(() => {
    localStorage.setItem('mothersDayGeneratedMessage', generatedMessage);
  }, [generatedMessage]);

  useEffect(() => {
    localStorage.setItem('mothersDayFont', selectedFont);
  }, [selectedFont]);

  useEffect(() => {
    localStorage.setItem('mothersDayFontColor', selectedFontColor);
  }, [selectedFontColor]);

  useEffect(() => {
    localStorage.setItem('mothersDayBackground', selectedBackground);
  }, [selectedBackground]);


  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const maxImagesAllowed = isPremium ? MAX_PREMIUM_IMAGES : MAX_FREE_IMAGES;

    if (images.length + files.length > maxImagesAllowed) {
      toast({
        title: 'Limite de imagens atingido!',
        description: `Você pode adicionar ${isPremium ? `${MAX_PREMIUM_IMAGES} imagens` : `${MAX_FREE_IMAGES} imagens`}. Faça upgrade para mais.`,
        variant: 'destructive',
      });
      if(fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    const newImagesPromises = files.map(file => {
      return new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/')) {
          resolve(null); 
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            id: Date.now() + Math.random(),
            url: reader.result, 
            dataUrl: reader.result,
            name: file.name,
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImagesPromises).then(newImagesData => {
      const validNewImages = newImagesData.filter(img => img !== null); 
      if (validNewImages.length > 0) {
        setImages(prev => [...prev, ...validNewImages]);
        toast({
          title: 'Imagens adicionadas!',
          description: `${validNewImages.length} imagem(ns) carregada(s) com sucesso.`,
        });
      }
      if (validNewImages.length < files.length) {
         toast({
          title: 'Aviso de Upload',
          description: `${files.length - validNewImages.length} arquivo(s) não eram imagens válidas e foram ignorados.`,
          variant: 'default',
        });
      }
    }).catch(error => {
      console.error("Erro ao carregar imagens:", error);
      toast({
        title: 'Erro no Upload',
        description: 'Ocorreu um erro ao carregar uma ou mais imagens.',
        variant: 'destructive',
      });
    });
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
    toast({
      title: 'Imagem removida.',
      variant: 'default',
    });
  };

  const handleGenerateAIMessage = () => {
    if (!isPremium) {
      toast({
        title: 'Recurso Premium',
        description: 'Faça upgrade para Premium para gerar mensagens com IA.',
        variant: 'destructive',
      });
      return;
    }
    setGeneratedMessage("Com amor, para a melhor mãe do universo, que ilumina todos os meus dias! (IA - Em Breve)");
    toast({
      title: 'IA em Ação (Simulação)',
      description: 'Uma mensagem especial está sendo preparada! (Funcionalidade de IA será implementada em breve).',
    });
  };

  return {
    images,
    isPremium,
    message,
    generatedMessage,
    selectedFont,
    selectedFontColor,
    selectedBackground,
    fileInputRef,
    setImages,
    setIsPremium,
    setMessage,
    setGeneratedMessage,
    setSelectedFont,
    setSelectedFontColor,
    setSelectedBackground,
    handleImageUpload,
    removeImage,
    handleGenerateAIMessage,
  };
};
  
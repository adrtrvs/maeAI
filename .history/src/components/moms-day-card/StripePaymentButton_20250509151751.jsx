
import React from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { useToast } from '@/components/ui/use-toast';

const STRIPE_PRICE_ID = 'SEU_ID_DE_PRECO_AQUI'; // Substitua pelo seu ID de preço real

export const StripePaymentButton = ({ onSuccess, buttonTrigger }) => {
  const stripe = useStripe();
  const { toast } = useToast();

  const handleCheckout = async () => {
    if (!stripe) {
      toast({
        title: 'Erro no Stripe',
        description: 'A plataforma de pagamento não está pronta. Verifique a configuração da chave publicável.',
        variant: 'destructive',
      });
      console.error('Stripe.js has not loaded yet.');
      return;
    }

    if (!STRIPE_PRICE_ID.startsWith('price_')) {
       toast({
        title: 'Erro de Configuração',
        description: "O ID do preço do Stripe não está configurado corretamente. Pagamento indisponível.",
        variant: 'destructive',
      });
      console.error(
        "ID do Preço (Price ID) do Stripe não configurado ou inválido. " +
        "Por favor, substitua 'SEU_ID_DE_PRECO_AQUI' em src/components/moms-day-card/StripePaymentButton.jsx pelo seu ID de Preço real do Stripe. " +
        "Você pode criar um produto e preço em: https://dashboard.stripe.com/products"
      );
      return;
    }

    try {
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
        mode: 'payment',
        successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`, // Stripe anexa o session_id
        cancelUrl: `${window.location.origin}`,
      });

      if (error) {
        console.error('Stripe checkout error:', error);
        toast({
          title: 'Erro no Pagamento',
          description: error.message || 'Ocorreu um erro ao tentar processar o pagamento.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      console.error('Unexpected error during checkout:', err);
      toast({
        title: 'Erro Inesperado',
        description: 'Ocorreu um erro inesperado. Tente novamente.',
        variant: 'destructive',
      });
    }
  };
  
  // Verifica se há um session_id na URL para confirmar o pagamento
  // Isso é uma verificação client-side simples. Idealmente, você teria um backend para verificar o status da sessão.
  React.useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('session_id')) {
      // Simula a verificação e chama onSuccess.
      // Em um app real, você verificaria o status da sessão com o backend do Stripe.
      onSuccess();
      // Remove o session_id da URL para evitar reprocessamento
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [onSuccess]);


  // Se o buttonTrigger for um componente (como PremiumDialog), precisamos clonar o elemento
  // e passar o onClick para ele.
  if (React.isValidElement(buttonTrigger)) {
    return React.cloneElement(buttonTrigger, { onStripeCheckout: handleCheckout });
  }

  // Caso contrário, renderiza um botão padrão (fallback, não deve ser o caso normal aqui)
  return (
    <button onClick={handleCheckout} className="stripe-checkout-button">
      Pagar com Stripe
    </button>
  );
};
  

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const STRIPE_PUBLISHABLE_KEY = 'pk_live_51RN1CEBtTEK0dC23zFSNHcyBxXrXSzj8CLOQKhbHZ5iMQ0WwOmUWI5Q09JdbYmIKTgmgFudGhiEZ6Qw5helvjcjp008qm4ie1M'; 

let stripePromise;

if (STRIPE_PUBLISHABLE_KEY && STRIPE_PUBLISHABLE_KEY.startsWith('pk_test_') || STRIPE_PUBLISHABLE_KEY.startsWith('pk_live_')) {
  stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
} else {
  console.warn(
    "Chave publicável do Stripe não configurada ou inválida. " +
    "O pagamento não funcionará. " +
    "Por favor, substitua 'SUA_CHAVE_PUBLICAVEL_AQUI' em src/components/StripeProvider.jsx pela sua chave real do Stripe. " +
    "Você pode obter sua chave em: https://dashboard.stripe.com/apikeys"
  );
}

export const StripeProvider = ({ children }) => {
  if (!stripePromise) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '5px', color: '#d8000c' }}>
        <strong>Aviso de Configuração do Stripe:</strong> A chave publicável do Stripe não está configurada ou é inválida.
        Por favor, verifique o arquivo <code>src/components/StripeProvider.jsx</code> e insira uma chave válida.
        A funcionalidade de pagamento estará desabilitada até que isso seja corrigido.
      </div>
    );
  }
  return <Elements stripe={stripePromise}>{children}</Elements>;
};
  
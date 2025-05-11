
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Gift, Sparkles, MessageSquare, Info } from 'lucide-react';

const PremiumDialog = ({ onStripeCheckout }) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 text-lg flex items-center gap-2"
        >
          <Gift className="h-5 w-5" /> Desbloquear Premium (R$ 4,99)
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-pink-700 text-center">✨ Plano Premium ✨</DialogTitle>
          <DialogDescription className="text-center text-pink-600 mt-2">
            Desbloqueie recursos incríveis para um cartão ainda mais especial!
          </DialogDescription>
        </DialogHeader>
        <div className="my-6 space-y-3 text-pink-700">
          <p className="flex items-center"><Sparkles className="h-5 w-5 mr-2 text-yellow-400" /> Adicione até <strong>10 imagens</strong> em formato Polaroid.</p>
          <p className="flex items-center"><MessageSquare className="h-5 w-5 mr-2 text-blue-500" /> Gere um <strong>texto único e emocionante</strong> com IA (em breve).</p>
          <p className="text-sm text-gray-600 mt-3 flex items-start">
            <Info size={18} className="mr-2 mt-0.5 text-gray-500 shrink-0" />
            <span>A funcionalidade de geração de texto com IA será implementada em breve e pode depender de serviços de terceiros.</span>
          </p>
          <p className="text-center text-3xl font-bold text-pink-500 mt-4">Apenas R$ 4,99</p>
          <p className="text-sm text-center text-gray-500">(Pagamento único)</p>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="w-full sm:w-auto border-pink-400 text-pink-600 hover:bg-pink-100">Fechar</Button>
          </DialogClose>
          <Button
            type="button"
            className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
            onClick={onStripeCheckout}
          >
            Pagar com Stripe
          </Button>
        </DialogFooter>
        <div className="mt-6 p-4 border-t border-pink-200">
          <h4 className="font-semibold text-pink-700 mb-2">Para ativar o pagamento com Stripe:</h4>
          <ol className="list-decimal list-inside text-sm text-pink-600 space-y-1">
            <li>Crie uma conta no Stripe (se ainda não tiver): <a href="https://dashboard.stripe.com/register" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Registrar no Stripe</a></li>
            <li>Ative o Checkout no modo "Client-only":
              <ul className="list-disc list-inside ml-4">
                <li>Acesse: <a href="https://dashboard.stripe.com/settings/checkout" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Configurações do Checkout Stripe</a> (role até o final da página)</li>
                <li>Guia de referência: <a href="https://docs.stripe.com/payments/checkout/client" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Documentação Stripe</a></li>
              </ul>
            </li>
            <li>Crie um produto e defina o preço (R$ 4,99):
              <ul className="list-disc list-inside ml-4">
                <li>Guia: <a href="https://support.stripe.com/questions/how-to-create-products-and-prices" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Criar Produtos e Preços no Stripe</a></li>
                <li>Após criar, copie o ID do Preço (Price ID).</li>
              </ul>
            </li>
            <li>Obtenha sua chave publicável (Publishable API key): <a href="https://dashboard.stripe.com/apikeys" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Chaves de API Stripe</a></li>
            <li>Adicione seu domínio à lista de permissões para o modo Live do Stripe (após publicar seu site):
              <ul className="list-disc list-inside ml-4">
                <li>Acesse: <a href="https://dashboard.stripe.com/settings/checkout" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Configurações do Checkout Stripe</a> (role até o final da página)</li>
                <li>Insira o domínio do seu site publicado. O URL de preview atual não precisa ser adicionado.</li>
              </ul>
            </li>
            <li>Forneça-me a <strong>Chave Publicável (Publishable API key)</strong> e o <strong>ID do Preço (Price ID)</strong> para que eu possa integrar o pagamento.</li>
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumDialog;
  
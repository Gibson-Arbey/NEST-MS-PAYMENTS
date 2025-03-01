import { Injectable } from '@nestjs/common';
import { PaymentSessionDto } from './dto/payment-session.dto';
import { envs } from 'src/config/envs';

@Injectable()
export class PaymentsService {
  async createPaymentSession(paymentSessionDto: PaymentSessionDto) {
    try {
      const { currency, items, orderId } = paymentSessionDto;

      const lineItems = items.map((item) => ({
        price_data: {
          currency,
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      const response = await fetch(`${envs.pasarelaUrl}/checkout/sessions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${envs.pasarelaApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_intent_data: { metadata: { orderId } },
          mode: 'payment',
          success_url: `${envs.pasarelaUrl}/payments/success`,
          cancel_url: `${envs.pasarelaUrl}/payments/cancel`,
          items: lineItems,
        }),
      });

      const session = await response.json();
      return session;
    } catch (error) {
      console.error('Error creando sesión de pago:', error);
      throw new Error('No se pudo crear la sesión de pago');
    }
  }

}

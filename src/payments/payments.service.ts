import { Injectable } from '@nestjs/common';
import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  constructor(@InjectStripeClient() private readonly stripeClient: Stripe) {}
  createPaymentIntent(amount: number, currency = 'USD') {
    return this.stripeClient.paymentIntents.create({
      amount,
      currency,
    });
  }
}

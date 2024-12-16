import { Body, Controller, Post } from '@nestjs/common';
import { StripeWebhookHandler } from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';
import { StripeService } from './stripe.service';
import { ApiTags } from '@nestjs/swagger';
import { Payment } from './types/payment.enum';
import { Plan } from '../storage/types/plan.enum';

@ApiTags('Stripe')
@Controller('stripe-webhook')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}
  @Post()
  @StripeWebhookHandler('payment_intent.succeeded')
  handlePaymentSuccess(@Body() event: Stripe.PaymentIntentSucceededEvent) {
    if (event.type !== 'payment_intent.succeeded') return;
    const metadata = event.data.object.metadata;
    const type = metadata.type as Payment;
    switch (type) {
      case Payment.PayCourse: {
        const { courseId, userId } = metadata;
        return this.stripeService.paymentCourseSuccess(courseId, userId);
      }
      case Payment.UpgradePlans:
        const { userId } = metadata;
        const plans = metadata.plan as Plan;
        return this.stripeService.upgradePlans(userId, plans);
    }

    // Update database or send email
  }

  @StripeWebhookHandler('payment_intent.payment_failed')
  handlePaymentFailure(@Body() event: Stripe.PaymentIntentPaymentFailedEvent) {
    const metadata = event.data.object.metadata;
    console.log(metadata);
    // Send email notify payment failure
  }
}

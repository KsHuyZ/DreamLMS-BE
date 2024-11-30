import { Body, Controller, Post } from '@nestjs/common';
import { StripeWebhookHandler } from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';
import { StripeService } from './stripe.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Stripe')
@Controller('stripe-webhook')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}
  @Post()
  @StripeWebhookHandler('payment_intent.succeeded')
  handlePaymentSuccess(@Body() event: Stripe.PaymentIntentSucceededEvent) {
    const metadata = event.data.object.metadata;
    const { courseId, userId } = metadata;
    return this.stripeService.paymentCourseSuccess(courseId, userId);
    // Update database or send email
  }

  @StripeWebhookHandler('payment_intent.payment_failed')
  handlePaymentFailure(@Body() event: Stripe.PaymentIntentPaymentFailedEvent) {
    const metadata = event.data.object.metadata;
    console.log(metadata);
    // Send email notify payment failure
  }
}

import { Injectable } from '@nestjs/common';
import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';
import { Course } from '../courses/domain/course';

@Injectable()
export class PaymentsService {
  constructor(@InjectStripeClient() private readonly stripeClient: Stripe) {}
  createPaymentIntent(course: Course, userId: string, currency = 'usd') {
    const amount = course.price * 100;
    return this.stripeClient.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
      metadata: {
        courseId: course.id,
        userId,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';
import { Course } from '../courses/domain/course';
import { Plan } from '../storage/types/plan.enum';
import { Payment } from '../stripe/types/payment.enum';

@Injectable()
export class PaymentsService {
  constructor(@InjectStripeClient() private readonly stripeClient: Stripe) {}
  createPaymentIntent(course: Course, userId: string, currency = 'usd') {
    const amount = course.price * 100;
    return this.stripeClient.paymentIntents.create({
      amount,
      currency,
      confirm: false,
      payment_method_types: ['card'],
      metadata: {
        courseId: course.id,
        userId,
        type: Payment.PayCourse,
      },
    });
  }

  createPaymentUpgradePlans(
    plan: Plan,
    userId: string,
    amount: number,
    currency = 'usd',
  ) {
    return this.stripeClient.paymentIntents.create({
      amount: amount * 100,
      currency,
      confirm: false,
      payment_method_types: ['card'],
      metadata: {
        plan,
        userId,
        type: Payment.UpgradePlans,
      },
    });
  }
}

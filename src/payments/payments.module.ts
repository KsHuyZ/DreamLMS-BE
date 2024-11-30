import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { StripeModule } from '@golevelup/nestjs-stripe';

@Module({
  imports: [
    StripeModule.forRoot(StripeModule, {
      apiKey: process.env.STRIPE_PRIVATE_KEY ?? '',
      webhookConfig: {
        stripeSecrets: {
          account: process.env.STRIPE_ACCOUNT_KEY ?? '',
          accountTest: process.env.STRIPE_ACCOUNT_TEST_KEY ?? '',
        },
        requestBodyProperty: 'rawBody',
      },
    }),
  ],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}

import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionResolver } from './subscription.resolver';
import { DbModule } from 'src/DB/db.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
 imports:[DbModule,AuthModule],
  providers: [SubscriptionResolver, SubscriptionService]
})
export class SubscriptionModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TouristsModule } from './tourists/tourists.module';
import { ProvidersModule } from './providers/providers.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { BookingsModule } from './bookings/bookings.module';
import { FinanceModule } from './finance/finance.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TouristsModule, 
    ProvidersModule, 
    ExperiencesModule, 
    BookingsModule, 
    FinanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HealthModule } from './health/health.module';
import { TouristsModule } from './tourists/tourists.module';
import { ProvidersModule } from './providers/providers.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { BookingsModule } from './bookings/bookings.module';
import { FinanceModule } from './finance/finance.module';

@Module({
  imports: [
    // Carga las variables de entorno desde el archivo .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configura TypeORM para conectarse a la base de datos de Supabase usando las variables de entorno
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // El tipo de base de datos que estamos usando
        url: configService.get<string>('DATABASE_URL'), // La URL de conexión a la base de datos se obtiene de las variables de entorno
        autoLoadEntities: true, // Carga automáticamente las clases marcadas con @Entity()
        synchronize: true, // Sincroniza las entidades con la DB (solo para desarrollo)
        ssl: {
          rejectUnauthorized: false, // Permite certificados auto-firmados en desarrollo
        },
      }),
    }),

    // Importa los módulos de la aplicación
    HealthModule,
    TouristsModule,
    ProvidersModule,
    ExperiencesModule,
    BookingsModule,
    FinanceModule,
  ],
})
export class AppModule {}

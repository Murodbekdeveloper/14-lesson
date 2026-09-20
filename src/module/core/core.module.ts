import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: './env',
    //   isGlobal: true,
    // }),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   global: true,
    //   useFactory: (configService: ConfigService) => ({
    //     secret: configService.get('DATABASE_URL'),
    //     signOptions: {
    //       expiresIn: '7d',
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('DATABASE_URL'),
        signOptions: {
          expiresIn: '8d',
        }
      })
    }),
    AuthModule,
    PrismaModule,
  ],
  exports: [],
})
export class CoreModule {}

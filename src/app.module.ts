import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { WebsocketsModule } from './websockets/websockets.module';

@Module({
  imports: [
    // MulterModule.register({
    //   dest: './uploads'
    // }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/archivos' 
    }),

   // 1️⃣ Cargar .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      schema:'nest_schema',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: false,
      logging: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}']
    }),
    UsersModule,
    WebsocketsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

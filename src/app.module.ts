import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenModule } from 'token/token.module';
import { ProxyModule } from './proxy/proxy.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    TokenModule,
    ProxyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class ApplicationModule {}

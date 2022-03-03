import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TokensModule } from 'tokens/tokens.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017'), TokensModule],
  controllers: [AppController],
  providers: [AppService],
})
export class ApplicationModule {}

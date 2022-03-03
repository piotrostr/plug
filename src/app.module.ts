import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TokensModule } from 'tokens/tokens.module';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      debug: true,
    }),
    TokensModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class ApplicationModule {}

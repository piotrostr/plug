import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokensModule } from 'tokens/tokens.module';
import { join } from 'path';
import { Token } from 'tokens/token.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      database: 'test',
      port: 27017,
      synchronize: true,
      entities: [Token],
    }),
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

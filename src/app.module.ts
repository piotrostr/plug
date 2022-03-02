import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { TokensModule } from './tokens/tokens.module';
import { ProxiesModule } from './proxies/proxies.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      debug: true,
      playground: true,
      installSubscriptionHandlers: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
      },
    }),
    TokensModule,
    ProxiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class ApplicationModule {}

/*
kaja zbrodnia skradzenia przyjazni

zuzia rzysko byla z ada w klasie, a ona w ib

stala i rozmawiala, domi wbila sie w ich rozmowe, powiedziala 'jest zuzia w szkole?' i zaczela do tej baby gadac i nawet nie powiedziala czesc adzie i zaczela gadac z tamta babka i ada poszla :(

domi = zrodlo wkurwien
*/

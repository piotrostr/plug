import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.graphql',
      debug: true,
      playground: true,
      installSubscriptionHandlers: true,
    }),
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

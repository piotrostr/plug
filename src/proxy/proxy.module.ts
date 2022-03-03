import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProxyService } from "./proxy.service";
import { ProxyResolver } from "./proxy.resolver";
import { Proxy, ProxySchema } from "./proxy.schema";
import { ProxyController } from "./proxy.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Proxy.name, schema: ProxySchema }]),
  ],
  controllers: [ProxyController],
  providers: [ProxyResolver, ProxyService],
})
export class ProxyModule {}

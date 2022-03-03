import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Proxy, ProxyDocument } from "proxy/proxy.schema";
import { CreateProxyInput, UpdateProxyInput } from "proxy/proxy.mutations";

@Injectable()
export class ProxyService {
  constructor(
    @InjectModel(Proxy.name) private proxyModel: Model<ProxyDocument>,
  ) {}

  async createProxy(createProxyInput: CreateProxyInput): Promise<Proxy> {
    const proxy = new this.proxyModel(createProxyInput);
    return proxy.save();
  }

  /**
   * get proxy that is not banned, not used,
   * */
  async getProxy(): Promise<Proxy> {
    const proxy = this.proxyModel.findOne({
      isBanned: false,
      isCurrentlyUsed: false,
    });
    // TODO verify it updates (need a spec file I guess)
    proxy.update({ isCurrentlyUsed: true }).exec();
    return proxy;
  }

  /**
   * return proxy, update its status if needed (if banned)
   * */
  async returnProxy(updateProxyInput: UpdateProxyInput): Promise<boolean> {
    // TODO see some real life crud to see how to do it well
    const updatedProxy = this.proxyModel.updateOne(updateProxyInput);
    const result = await updatedProxy.exec();
    return result.acknowledged;
  }

  async getUnverifiedProxy(): Promise<Proxy> {
    const unverifiedProxy = this.proxyModel.findOne({
      needsVerification: true,
    });
    return unverifiedProxy.exec();
  }
}

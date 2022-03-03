import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Proxy, ProxyDocument } from "./proxy.schema";
import { CreateProxyInput, UpdateProxyInput } from "./proxy.mutations";

@Injectable()
export class ProxyService {
  constructor(
    @InjectModel(Proxy.name) private proxyModel: Model<ProxyDocument>,
  ) {}

  async createProxy(createProxyInput: CreateProxyInput): Promise<Proxy> {
    const addedProxy = new this.proxyModel(createProxyInput);
    return addedProxy.save();
  }

  /**
   * get proxy that is not banned, not used,
   * */
  async getProxy(): Promise<Proxy> {
    return await this.proxyModel.findOneAndUpdate(
      {
        isBanned: false,
        isCurrentlyUsed: false,
      },
      { isCurrentlyUsed: true },
    );
  }

  /**
   * return proxy, update its status if needed (if banned)
   * */
  async returnProxy(updateProxyInput: UpdateProxyInput): Promise<boolean> {
    const updatedProxy = this.proxyModel.updateOne(updateProxyInput);
    const result = await updatedProxy.exec();
    return result.acknowledged;
  }
}

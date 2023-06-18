import { createClient } from "redis";
import { Room } from "../interfaces/room";

type DataValue =
  | Record<string | number, unknown>
  | string
  | boolean
  | number
  | Room[];

export class RedisDB {
  private readonly client;
  constructor(url: string) {
    this.client = createClient({ url });
  }

  private async connectIfNecessary() {
    if (this.client.isReady) return;
    await this.client.connect();
  }

  public async getServicesState() {
    try {
      await this.connectIfNecessary();
      const isOk = await this.client.ping();
      return "OK";
    } catch (err) {
      return "NOT_WORKING";
    }
  }

  public async set(
    key: string,
    value: DataValue,
    options: { PX?: number } = {}
  ) {
    await this.connectIfNecessary();
    const dataToStore =
      typeof value === "string" ? value : JSON.stringify(value);
    await this.client.set(key, dataToStore, options);
  }

  public async get(key: string): Promise<DataValue | null> {
    await this.connectIfNecessary();
    const value = await this.client.get(key);
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }

  public async clear() {
    await this.connectIfNecessary();
    await this.client.flushAll();
  }
}

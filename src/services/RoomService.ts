import { randomInt } from "crypto";
import { RedisDB } from "./RedisDB";
import { Room, Point3D } from "../interfaces/room";

export class RoomService {
  constructor(private redisDb: RedisDB) {}

  public async addCoinsToRooms() {
    const rooms = await this.redisDb.get("rooms");
    if (!rooms) return;
    const roomsParsed = rooms as Room[];
    const roomsWithGeneratedCoin = roomsParsed.map((r) =>
      this.generateCoins(r)
    );
    await this.redisDb.set("rooms", roomsWithGeneratedCoin);
  }

  private generateCoins(r: Room): Room {
    const coins = [];
    for (let i = 0; i < r.totalCoins; i++) {
      coins.push({
        x: randomInt(r.area.x.min, r.area.x.max + 1),
        y: randomInt(r.area.y.min, r.area.y.max + 1),
        z: randomInt(r.area.z.min, r.area.z.max + 1),
      });
    }
    return {
      ...r,
      coins,
      dateCoinsGenerated: new Date(),
    };
  }
  private async updateRooms(room: Room) {
    const rooms = (await this.redisDb.get("rooms")) as Room[];
    await this.redisDb.set(
      "rooms",
      rooms.map((r) => {
        if (r.num === room.num) {
          return room;
        }
        return r;
      })
    );
  }
  private async getRoom(num: number) {
    const rooms = (await this.redisDb.get("rooms")) as Room[];
    const room = rooms.find((r) => r.num === num);
    return room;
  }

  public async getAllRooms() {
    const rooms = await this.redisDb.get("rooms");

    return rooms;
  }

  public async getNumberCoins(num: number) {
    const room = await this.getRoom(num);
    if (!room) return 0;
    return room.coins ? room.coins.length : 0;
  }

  public async getCoinsByRoom(num: number) {
    const room = await this.getRoom(num);
    if (!room) return null;
    return room.coins;
  }

  public async removeCoin(num: number, point: Point3D) {
    const comparePoints = (p1: Point3D, p2: Point3D) => {
      return p1.x === p2.x && p1.y === p2.y && p1.z === p2.z;
    };
    const room = await this.getRoom(num);
    if (!room) return "not room";
    const existCoin = room.coins?.some((coin) => comparePoints(coin, point));

    if (!existCoin) {
      return "not coin founded";
    }

    room.coins = room.coins?.filter((coin) => !comparePoints(coin, point));
    await this.updateRooms(room);
  }
}

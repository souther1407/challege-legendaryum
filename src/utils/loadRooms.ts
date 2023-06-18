import devs from "../dependencies.js";
const { redisService } = devs;
import fs from "fs/promises";

export default async () => {
  const rooms = await fs.readFile("./rooms.json", { encoding: "utf-8" });
  await redisService.set("rooms", JSON.parse(rooms));
};

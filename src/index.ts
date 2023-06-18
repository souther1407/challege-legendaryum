import deps from "./dependencies.js";
const { server, redisService, roomService } = deps;
import config from "./config/config.js";
import "./app.js";
import "./websocket.js";
import loadRooms from "./utils/loadRooms.js";

server.listen(config.server.port, async () => {
  console.log(`running at port: ${config.server.port}`);
  const statusRedis = await redisService.getServicesState();
  console.log("redis: ", statusRedis);
  await loadRooms();
  console.log("rooms loaded");
  await roomService.addCoinsToRooms();
  setInterval(async () => {
    await roomService.addCoinsToRooms();
  }, 1000 * 60 * 60);
});

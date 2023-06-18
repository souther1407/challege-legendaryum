import deps from "./dependencies.js";
const { websocket, roomService } = deps;
import { Point3D } from "./interfaces/room.js";

websocket.on("connection", (socket) => {
  console.log("conection accepted");
  socket.emit("saludo", "hola");

  socket.on("room", async (roomNum: string) =>
    socket.emit(
      "coins_available",
      await roomService.getCoinsByRoom(parseInt(roomNum))
    )
  );

  socket.on("collect", async (roomNum: string, pos: Point3D) => {
    const msg = await roomService.removeCoin(parseInt(roomNum), pos);
    if (msg) return socket.emit("error", msg);
    websocket.emit(
      "coin_collected",
      `a coin has been collected in room ${roomNum}, position: {${pos.x},${pos.y},${pos.z}}`
    );
  });
});

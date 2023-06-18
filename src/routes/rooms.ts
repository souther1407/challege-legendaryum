import { Router } from "express";
import deps from "../dependencies.js";
const { roomService } = deps;
import { RoomsController } from "../constrollers/rooms.js";
const controller = new RoomsController(roomService);
const router = Router();

router.get("/", controller.getAllRooms);
router.get("/:num", controller.getTotalCoinsByRoom);

export default router;

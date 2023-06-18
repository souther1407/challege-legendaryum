import { Request, Response } from "express";
import httpStatusCodes from "../utils/constants/httpStatusCodes.js";
import { RoomService } from "../services/RoomService.js";

export class RoomsController {
  constructor(private roomService: RoomService) {}

  public getAllRooms = async (req: Request, res: Response) => {
    try {
      const rooms = await this.roomService.getAllRooms();
      res.status(httpStatusCodes.OK).json(rooms);
    } catch (error) {
      console.log(error);
      res.status(httpStatusCodes.CLIENT_ERROR).json({ error });
    }
  };

  public getTotalCoinsByRoom = async (req: Request, res: Response) => {
    try {
      const roomNumber = parseInt(req.params.num);
      const coinsNumber = await this.roomService.getNumberCoins(roomNumber);
      res.status(httpStatusCodes.OK).json({ roomNumber, coinsNumber });
    } catch (error) {
      res.status(httpStatusCodes.CLIENT_ERROR).json({ error });
    }
  };
}

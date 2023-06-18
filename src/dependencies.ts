import express from "express";
import http from "http";
import { Server } from "socket.io";
import { RedisDB } from "./services/RedisDB.js";
import config from "./config/config.js";
import { RoomService } from "./services/RoomService.js";
const app = express();

const server = http.createServer(app);
const websocket = new Server(server);
const redisService = new RedisDB(config.redis.url);
const roomService = new RoomService(redisService);

export default { app, server, websocket, redisService, roomService };

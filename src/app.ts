import deps from "./dependencies.js";
const { app } = deps;
import roomRouter from "./routes/rooms.js";
import express from "express";
app.use(express.json());
app.use("/rooms", roomRouter);

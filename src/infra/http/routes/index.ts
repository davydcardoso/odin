import { Router } from "express";
import { broadcastingRoutes } from "./broadcasting.routes";

const routes = Router();

routes.use("/broadcasting", broadcastingRoutes);

export { routes };

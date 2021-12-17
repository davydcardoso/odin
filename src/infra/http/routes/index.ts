import { Router } from "express";
import { messagesRoutes } from "./messages.routes";

const routes = Router();

routes.use("/messages", messagesRoutes);

export { routes };

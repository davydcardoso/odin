import { Router } from "express";
import { messagesRouter } from "./messages.routes";
import { sessionsRouter } from "./sessions.routes";
import { usersRouter } from "./users.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/messages", messagesRouter);

export { routes };

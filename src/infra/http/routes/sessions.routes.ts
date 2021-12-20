import { Router } from "express";
import { adaptRoute } from "../../../core/infra/adpters/ExpressRouteAdapter";
import { makeAuthenticateUserControllerFactory } from "../factories/controllers/AuthenticateUserControllerFactory";

const sessionsRouter = Router();

sessionsRouter.post("/signin", adaptRoute(makeAuthenticateUserControllerFactory()));

export { sessionsRouter };

import { Router } from "express";
import { adaptMiddleware } from "../../../core/infra/adpters/ExpressMiddlewareAdapter";
import { adaptRoute } from "../../../core/infra/adpters/ExpressRouteAdapter";
import { makeRegisterUserControllerFactory } from "../factories/controllers/RegisterUserControllerFactory";
import { makeEnsureAuthenticatedMiddleware } from "../factories/middlewares/EnsureAuthenticatedMiddlewareFactory";

const usersRouter = Router();

usersRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()));

usersRouter.post("/", adaptRoute(makeRegisterUserControllerFactory()));

export { usersRouter };

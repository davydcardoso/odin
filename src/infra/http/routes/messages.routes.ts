import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { adaptRoute } from "../../../core/infra/adpters/ExpressRouteAdapter";
import { AddMessageToBroadcastingQueueFactory } from "../factories/controllers/AddBroasdcastingToQueueFactory";
import { makeSendMessageToGroupTagFactory } from "../factories/controllers/SendMessageToGroupTagFactory";
import { adaptMiddleware } from "../../../core/infra/adpters/ExpressMiddlewareAdapter";
import { makeEnsureAuthenticatedMiddleware } from "../factories/middlewares/EnsureAuthenticatedMiddlewareFactory";

const messagesRouter = Router();

messagesRouter.post(
  "/queue",
  celebrate({
    [Segments.HEADERS]: Joi.object({}).options({ allowUnknown: true }),
    [Segments.BODY]: Joi.object({
      to: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
      }),
      subject: Joi.string().required(),
      body: Joi.any().required(),
    }),
  }),
  adaptRoute(AddMessageToBroadcastingQueueFactory())
);

messagesRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()));

messagesRouter.post(
  "/:groupTag/send",
  adaptRoute(makeSendMessageToGroupTagFactory())
);

messagesRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object({}),
  })
);

export { messagesRouter };
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { adaptRoute } from "../../../core/infra/adpters/ExpressRouteAdapter";
import { AddMessageToBroadcastingQueueFactory } from "../factories/controllers/makeAddBroasdcastingToQueueFactory";
import { makeSendMessageToGroupTagFactory } from "../factories/controllers/makeSendMessageToGroupTagFactory";
import { adaptMiddleware } from "../../../core/infra/adpters/ExpressMiddlewareAdapter";
import { makeEnsureAuthenticatedMiddleware } from "../factories/middlewares/EnsureAuthenticatedMiddlewareFactory";

const messagesRoutes = Router();

messagesRoutes.post(
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

messagesRoutes.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()));

messagesRoutes.post(
  "/:groupTag/send",
  adaptRoute(makeSendMessageToGroupTagFactory())
);

messagesRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object({}),
  })
);

export { messagesRoutes };

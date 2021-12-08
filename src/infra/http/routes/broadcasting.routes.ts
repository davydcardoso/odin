import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { adaptRoute } from "../../../core/infra/adpters/ExpressRouteAdapter";
import { makeAddBroasdcastingToQueueFactory } from "../factories/controllers/makeAddBroasdcastingToQueueFactory";

const broadcastingRoutes = Router();

broadcastingRoutes.post(
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
  adaptRoute(makeAddBroasdcastingToQueueFactory())
);

export { broadcastingRoutes };

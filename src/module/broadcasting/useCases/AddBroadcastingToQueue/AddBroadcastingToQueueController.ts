import { Controller } from "../../../../core/infra/Controller";
import {
  clientError,
  fail,
  HttpResponse,
  ok,
} from "../../../../core/infra/HttpResponse";
import { AddMessageToBroadcastingQueue } from "./AddBroadcastingToQueue";

type AddBroadcastingToQueueRequest = {
  to: {
    name: string;
    email: string;
  };
  from?: {
    name: string;
    email: string;
  };
  subject: string;
  body: string;
};

export class AddMessageToBroadcastingQueueController implements Controller {
  constructor(private addBoardcastingToQueue: AddMessageToBroadcastingQueue) {}
  async handle(request: AddBroadcastingToQueueRequest): Promise<HttpResponse> {
    try {
      const { to, from, subject, body } = request;

      const result = await this.addBoardcastingToQueue.execute({
        to,
        from,
        subject,
        body,
      });

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case Error:
            return clientError(error);
          default:
            return fail(error);
        }
      }

      return ok({});
    } catch (err) {
      return fail(err);
    }
  }
}

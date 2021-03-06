import { v4 } from "uuid";
import { Either, right } from "../../../../core/logic/Either";
import { BullProvider } from "../../../../infra/providers/implementations/queue/BullProvider";

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

type AddBroadcastingToQueueResponse = Either<Error, object>;

export class AddMessageToBroadcastingQueue {
  constructor(private bullProvider: BullProvider) {}

  async execute({
    to,
    from,
    subject,
    body,
  }: AddBroadcastingToQueueRequest): Promise<AddBroadcastingToQueueResponse> {
    await this.bullProvider.addJob({
      message: {
        id: v4(),
        body,
        subject,
      },
      recipient: {
        id: v4(),
        email: to.email,
        name: to.email,
      },
      sender: {
        email: process.env.MAIL_USER,
        name: from.email ? from.email : process.env.MAIL_USER,
      },
    });

    return right({});
  }
}

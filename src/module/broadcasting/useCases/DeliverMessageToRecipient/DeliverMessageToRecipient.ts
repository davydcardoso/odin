import { IMailProvider } from "../../../../infra/providers/models/IMailProvider";
import { IDeliverMessageJob } from "../../jobs/IDeliverMessageJob";

type DeliverMessageToRecipientRequest = IDeliverMessageJob;

export class DeliverMessageToRecipient {
  constructor(private mailProvider: IMailProvider) {}

  async execute({
    recipient,
    message,
    sender,
  }: DeliverMessageToRecipientRequest): Promise<void> {
    console.log(`Send e-mail to:${recipient.email}`);
    await this.mailProvider
      .sendEmail(
        {
          from: {
            name: sender.name,
            email: sender.email,
          },
          to: {
            name: recipient.name,
            email: recipient.email,
          },
          subject: message.subject,
          body: message.body,
        },
        {
          messageId: message.id,
          contactId: recipient.id,
        }
      )
      .catch((err: any) => console.log(err));
  }
}

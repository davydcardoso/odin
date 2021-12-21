import { config } from "dotenv-flow";

config({ silent: true });

import { MailtrapProvider } from "../providers/implementations/mail/MailtrapProvider";
import { BullProvider } from "../providers/implementations/queue/BullProvider";
import { DeliverMessageToRecipient } from "../../module/broadcasting/useCases/DeliverMessageToRecipient/DeliverMessageToRecipient";
import { SyncQueueProviders } from "../providers/implementations/queue/SyncQueueProviders";
import { SESProvider } from "../providers/implementations/mail/AmazonSESProvider";

const mailProvider = new MailtrapProvider({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  ssl: false,
  tls: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const mailSESProvider = new SESProvider();

const mailQueueProvider = new BullProvider();

const deliverMessageToRecipient = new DeliverMessageToRecipient(mailSESProvider);

mailQueueProvider.process(async ({ data }) => {
  await deliverMessageToRecipient.execute(data);
});

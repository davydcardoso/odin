import { config } from "dotenv-flow";

config({ silent: true });

import { MailtrapProvider } from "../providers/implementations/mail/MailtrapProvider";
import { BullProvider } from "../providers/implementations/queue/BullProvider";
import { DeliverMessageToRecipient } from "../../module/broadcasting/useCases/DeliverMessageToRecipient/DeliverMessageToRecipient";
import { SyncQueueProviders } from "../providers/implementations/queue/SyncQueueProviders";

const mailQueueProvider = new BullProvider();
const syncMailQueueProvider = new SyncQueueProviders();
const mailProvider = new MailtrapProvider({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  ssl: false,
  tls: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  // tls: { rejectUnauthorized: false },
});
const deliverMessageToRecipient = new DeliverMessageToRecipient(mailProvider);

mailQueueProvider.process(async ({ data }) => {
  await deliverMessageToRecipient.execute(data);
});

syncMailQueueProvider.process(async ({ data }) => {
  await deliverMessageToRecipient.execute(data);
});

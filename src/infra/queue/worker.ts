import { config } from "dotenv-flow";

config({ silent: true });

import { MailtrapProvider } from "../providers/implementations/mail/MailtrapProvider";
import { BullProvider } from "../providers/implementations/queue/BullProvider";
import { DeliverMessageToRecipient } from "../../module/broadcasting/useCases/DeliverMessageToRecipient/DeliverMessageToRecipient";

const mailQueueProvider = new BullProvider();
const mailProvider = new MailtrapProvider({
  host: process.env.MAIL_HOST,
  port: 465,
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

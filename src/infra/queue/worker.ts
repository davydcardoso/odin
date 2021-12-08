import { config } from "dotenv-flow";

config({ silent: true });

import { MailtrapProvider } from "../providers/implementations/mail/MailtrapProvider";
import { BullProvider } from "../providers/implementations/queue/BullProvider";
import { DeliverMessageToRecipient } from "../../module/broadcasting/useCases/DeliverMessageToRecipient/DeliverMessageToRecipient";

const mailQueueProvider = new BullProvider();
const mailProvider = new MailtrapProvider({});
const deliverMessageToRecipient = new DeliverMessageToRecipient(mailProvider);

mailQueueProvider.process(async ({ data }) => {
  await deliverMessageToRecipient.execute(data);
});

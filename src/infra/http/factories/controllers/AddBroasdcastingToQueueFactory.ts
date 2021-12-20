import { Controller } from "../../../../core/infra/Controller";
import { AddMessageToBroadcastingQueue } from "../../../../module/broadcasting/useCases/AddBroadcastingToQueue/AddBroadcastingToQueue";

import { AddMessageToBroadcastingQueueController } from "../../../../module/broadcasting/useCases/AddBroadcastingToQueue/AddBroadcastingToQueueController";
import { BullProvider } from "../../../providers/implementations/queue/BullProvider";

export function AddMessageToBroadcastingQueueFactory(): Controller {
  const mailQueueProvider = new BullProvider();
  const addMessageToBroadcastingQueue = new AddMessageToBroadcastingQueue(
    mailQueueProvider
  );

  const addMessageToBroadcastingQueueController =
    new AddMessageToBroadcastingQueueController(addMessageToBroadcastingQueue);
  return addMessageToBroadcastingQueueController;
}

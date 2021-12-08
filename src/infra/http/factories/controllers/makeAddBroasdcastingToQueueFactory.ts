import { Controller } from "../../../../core/infra/Controller";
import { AddBroadcastingToQueue } from "../../../../module/broadcasting/useCases/AddBroadcastingToQueue/AddBroadcastingToQueue";
import { AddBroadcastingToQueueController } from "../../../../module/broadcasting/useCases/AddBroadcastingToQueue/AddBroadcastingToQueueController";
import { BullProvider } from "../../../providers/implementations/queue/BullProvider";

export function makeAddBroasdcastingToQueueFactory(): Controller {
  const mailQueueProvider = new BullProvider();
  const addBoardcastingToQueue = new AddBroadcastingToQueue(mailQueueProvider);

  const addBroadcastingToQueueController = new AddBroadcastingToQueueController(
    addBoardcastingToQueue
  );
  return addBroadcastingToQueueController;
}

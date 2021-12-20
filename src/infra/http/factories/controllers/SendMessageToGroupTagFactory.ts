import { Controller } from "../../../../core/infra/Controller";
import { SendMessageToGroupTagController } from "../../../../module/broadcasting/useCases/SendMessageToGroupTag/SendMessageToGroupTagController";

export function makeSendMessageToGroupTagFactory(): Controller {
  const sendMessageToGroupTagController = new SendMessageToGroupTagController();

  return sendMessageToGroupTagController;
}

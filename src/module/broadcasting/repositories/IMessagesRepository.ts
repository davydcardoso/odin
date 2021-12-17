import { Messages } from "../domain/message/messages";

export interface IMessagesRepository {
  searchAll(): Promise<Messages[]>;
}
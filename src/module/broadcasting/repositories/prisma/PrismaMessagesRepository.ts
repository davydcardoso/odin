import { prisma } from "../../../../infra/prisma/connection";
import { Messages } from "../../domain/message/messages";
import { IMessagesRepository } from "../IMessagesRepository";

export class PrismaMessagesRepository implements IMessagesRepository {
  async searchAll(): Promise<Messages[]> {
      return await prisma.messages.findMany();
  }
}
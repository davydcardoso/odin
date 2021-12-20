import { prisma } from "../../../../infra/prisma/connection";
import { User } from "../../domain/users/users";
import { UserMapper } from "../../mappers/UserMapper";
import { IUserRepository } from "../IUserRepository";

export class PrismaUserRepository implements IUserRepository {
  async exists(email: string): Promise<boolean> {
    const userExists = await prisma.users.findUnique({ where: { email } });

    return !!userExists;
  }

  async create(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user);

    await prisma.users.create({ data });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  async save(user: User): Promise<void> {}
}

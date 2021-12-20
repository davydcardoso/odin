import { Controller } from "../../../../core/infra/Controller";
import { PrismaUserRepository } from "../../../../module/users/repositories/prisma/PrismaUserRepository";
import { AuthenticateUser } from "../../../../module/users/useCases/AuthenticateUser/AuthenticateUser";
import { AuthenticateUserController } from "../../../../module/users/useCases/AuthenticateUser/AuthenticateUserController";

export function makeAuthenticateUserControllerFactory(): Controller {
  const prismaUserRepository = new PrismaUserRepository();

  const authenticateUser = new AuthenticateUser(prismaUserRepository);

  const authenticateUserController = new AuthenticateUserController(
    authenticateUser
  );

  return authenticateUserController;
}

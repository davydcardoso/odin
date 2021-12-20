import { Controller } from "../../../../core/infra/Controller";
import { PrismaUserRepository } from "../../../../module/users/repositories/prisma/PrismaUserRepository";
import { RegisterUser } from "../../../../module/users/useCases/RegisterUserController/RegisterUser";
import { RegisterUserController } from "../../../../module/users/useCases/RegisterUserController/RegisterUserController";
import { CompareFieldsValidator } from "../../../validation/CompareFieldsValidator";
import { ValidatorCompositor } from "../../../validation/Compositor";

export function makeRegisterUserControllerFactory(): Controller {
  const prismaUserRepository = new PrismaUserRepository();

  const registerUser = new RegisterUser(prismaUserRepository);

  const validator = new ValidatorCompositor([
    new CompareFieldsValidator("password", "password_confirmation"),
  ]);

  const registerUserController = new RegisterUserController(
    validator,
    registerUser
  );

  return registerUserController;
}

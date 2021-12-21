import { Either, left, right } from "../../../../core/logic/Either";
import { JWT } from "../../domain/users/jwt";
import { User } from "../../domain/users/users";
import { IUserRepository } from "../../repositories/IUserRepository";
import { InvalidEmailOrPasswordError } from "./errors/InvalidEmailOrPasswordError";

type AuthResponse = {
  token: string;
  user: User;
};

type AuthenticateUserControllerRequest = {
  email: string;
  password: string;
};

type AuthenticateUserControllerResponse = Either<
  InvalidEmailOrPasswordError,
  AuthResponse
>;

export class AuthenticateUser {
  constructor(private usersRepository: IUserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserControllerRequest): Promise<AuthenticateUserControllerResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return left(new InvalidEmailOrPasswordError());
    }

    const isPasswordInvalid = await user.password.comparePassword(password);

    if (!isPasswordInvalid) {
      return left(new InvalidEmailOrPasswordError());
    }

    const { token } = JWT.signUser(user);

    return right({ token, user });
  }
}

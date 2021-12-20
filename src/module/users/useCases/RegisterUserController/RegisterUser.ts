import { Either, left, right } from "../../../../core/logic/Either";
import { Email } from "../../domain/users/email";
import { InvalidEmailError } from "../../domain/users/errors/InvalidEmailError";
import { InvalidNameError } from "../../domain/users/errors/InvalidNameError";
import { InvalidPasswordLengthError } from "../../domain/users/errors/InvalidPasswordLengthError";
import { Name } from "../../domain/users/name";
import { Password } from "../../domain/users/password";
import { User } from "../../domain/users/users";
import { IUserRepository } from "../../repositories/IUserRepository";
import { AccountAlreadyExistsError } from "./errors/AccountAlreadyExistsError";

type RegisterUserRequest = {
  name: string;
  email: string;
  password: string;
};

type RegisterUserResponse = Either<
  | AccountAlreadyExistsError
  | InvalidNameError
  | InvalidEmailError
  | InvalidPasswordLengthError,
  User
>;

export class RegisterUser {
  constructor(private usersRepository: IUserRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserRequest): Promise<RegisterUserResponse> {
    const nameOrError = Name.create(name);
    const emailOrError = Email.create(email);
    const passwordOrError = Password.create(password);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const userOrError = User.create({
      name: nameOrError.value,
      email: emailOrError.value,
      password: passwordOrError.value,
    });

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user = userOrError.value;

    const userAlreadyExists = await this.usersRepository.exists(
      user.email.value
    );

    if (userAlreadyExists) {
      return left(new AccountAlreadyExistsError(user.email.value));
    }

    await this.usersRepository.create(user);

    return right(user);
  }
}

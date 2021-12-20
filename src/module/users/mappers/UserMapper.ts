import { Users as PersistenceUser } from "@prisma/client";
import { Email } from "../domain/users/email";
import { Name } from "../domain/users/name";
import { Password } from "../domain/users/password";
import { User } from "../domain/users/users";

export class UserMapper {
  static toDomain(raw: PersistenceUser): User {
    const nameOrError = Name.create(raw.name);
    const emailOrError = Email.create(raw.email);
    const passwordOrError = Password.create(raw.password, true);

    if (nameOrError.isLeft()) {
      throw new Error("Name value is invalid.");
    }

    if (emailOrError.isLeft()) {
      throw new Error("Email value is invalid.");
    }

    if (passwordOrError.isLeft()) {
      throw new Error("Password value is invalid.");
    }

    const userOrError = User.create(
      {
        name: nameOrError.value,
        email: emailOrError.value,
        password: passwordOrError.value,
      },
      raw.id
    );

    if (userOrError.isRight()) {
      return userOrError.value;
    }

    return null;
  }

  static async toPersistence(user: User) {
    return {
      id: user.id,
      name: user.name.value,
      email: user.email.value,
      password: await user.password.getHashedValue(),
    };
  }
}

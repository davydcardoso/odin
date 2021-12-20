import { User } from "../domain/users/users";

export interface IUserRepository {
  exists(email: string): Promise<boolean>;
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<void>;
  create(user: User): Promise<void>;
}

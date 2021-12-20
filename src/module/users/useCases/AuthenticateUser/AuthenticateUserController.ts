import { Controller } from "../../../../core/infra/Controller";
import {
  clientError,
  fail,
  HttpResponse,
  ok,
} from "../../../../core/infra/HttpResponse";
import { AuthenticateUser } from "./AuthenticateUser";

type AuthenticateUserControllerRequest = {
  email: string;
  password: string;
};

export class AuthenticateUserController implements Controller {
  constructor(private authenticateUser: AuthenticateUser) {}

  async handle(
    request: AuthenticateUserControllerRequest
  ): Promise<HttpResponse> {
    try {
      const { email, password } = request;

      const result = await this.authenticateUser.execute({
        email,
        password,
      });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return clientError(error);
        }
      }

      return ok(result.value);
    } catch (err) {
      return fail(err);
    }
  }
}

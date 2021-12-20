import { decode } from "jsonwebtoken";
import {
  fail,
  forbidden,
  HttpResponse,
  ok,
} from "../../../core/infra/HttpResponse";
import { Middleware } from "../../../core/infra/Middleware";
import { AccessDeniedError } from "../errors/AccessDeniedError";

type EnsureAuthenticatedMiddlewareRequest = {
  accessToken: string;
};

type DecodedJwt = {
  sub: string;
};

export class EnsureAuthenticatedMiddleware implements Middleware {
  constructor() {}

  async handle(
    request: EnsureAuthenticatedMiddlewareRequest
  ): Promise<HttpResponse> {
    try {
      const { accessToken } = request;

      const [, token] = accessToken.split(" ");

      if (accessToken) {
        try {
          const decoded = decode(token) as DecodedJwt;

          return ok({ userId: decoded.sub });
        } catch (err) {
          return forbidden(new AccessDeniedError());
        }
      }
      return forbidden(new AccessDeniedError());
    } catch (err) {
      return fail(err);
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string;
  };
}

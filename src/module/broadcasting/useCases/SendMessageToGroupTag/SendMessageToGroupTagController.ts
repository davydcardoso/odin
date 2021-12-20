import { Controller } from "../../../../core/infra/Controller";
import { fail, HttpResponse, ok } from "../../../../core/infra/HttpResponse";

export class SendMessageToGroupTagController implements Controller {
  async handle(request: any): Promise<HttpResponse> {
    try {
      return ok();
    } catch (err) {
      return fail(err);
    }
  }
}

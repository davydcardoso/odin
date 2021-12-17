export class Messages {
  id: string;
  subject: string;
  body: string;
  template_id: string;
  sender_id: string;

  sent_at?: Date;

  private constructor(messages: Messages) {
    return Object.assign(this, messages);
  }

  static create(messages: Messages) {
    return new Messages(messages);
  }
}

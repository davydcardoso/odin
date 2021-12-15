export class Senders {
  name: string;
  email: string;
  isValidated?: boolean;
  isDefault?: boolean;

  private constructor(senders: Senders) {
    return Object.assign(this, senders);
  }

  static create(senders: Senders) {
    return new Senders(senders);
  }
}

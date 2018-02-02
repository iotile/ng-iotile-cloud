export interface PendingInviteDictionary {
  [index: string]: PendingInvite;
}

export class PendingInvite {

  public email: string;
  public sentOn: Date;
  public sentBy: string;

  constructor(data: any = {}) {
    if ('email' in data) {
      this.email = data.email;
    }

    if ('sent_on' in data) {
      this.sentOn = new Date(data.sent_on);
    }

    if ('sent_by' in data) {
      this.sentBy = data.sent_by;
    }
  }
}

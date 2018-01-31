import { User } from './user';

export interface MemberDictionary {
  [index: string]: Member;
}

export class Member {
  public user: User;
  public createdOn: Date;
  public isActive: boolean;
  public isOrgAdmin: boolean = false;

  constructor(data: any = {}) {
    if ('user_details' in data) {
      this.user = new User(data['user_details']);
    }

    if ('created_on' in data) {
      this.createdOn = new Date(data['created_on']);
    }

    if ('is_active' in data) {
      this.isActive = data['is_active'];
    }

    if ('is_org_admin' in data) {
      this.isOrgAdmin = data['is_org_admin'];
    }
  }
}

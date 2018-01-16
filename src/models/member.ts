export class Member {

  public user: string;
  public createdOn: Date;
  public isActive: boolean;
  public isOrgAdmin: boolean = false;

  constructor(data: any = {}) {

    if ('user' in data) {
      this.user = data['user'];
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

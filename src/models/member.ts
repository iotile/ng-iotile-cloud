import { User } from './user';

export interface MemberDictionary {
  [index: string]: Member;
}

export class Member {
  public user: User;
  public createdOn: Date;
  public isActive: boolean;
  public isOrgAdmin: boolean = false;
  public permissions: {
    [permissionKey: string]: boolean;
  };

  public role: string;
  public roleName: string;

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

    if ('role' in data) {
      this.role = data['role'];
    }

    if ('permissions' in data) {
      this.permissions = data['permissions'];
    }

    if ('role_name' in data) {
      this.roleName = data['role_name'];
    }
  }

  public getPermission(permissionKey: string): boolean | undefined {
    if (permissionKey in this.permissions) {
      return this.permissions[permissionKey];
    }

    return;
  }
}

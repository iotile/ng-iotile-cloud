import { Member, MemberDictionary } from './member';
import { Invitation, InvitationPendingDictionary } from './invitation';
import { OrgTemplate } from './org-template';


export class Org {
  public slug: string;
  public name: string;
  public about: string = '';
  public createdBy: string;
  public createdOn: Date;
  public thumbnailUrl: string;
  public tinyUrl: string;
  public orgTemplate: OrgTemplate;
  public members: Array<Member> = [];
  public memberMap: MemberDictionary = {};
  public pendingInvites: Array<Invitation> = [];
  public pendingInviteMap: InvitationPendingDictionary = {};

  public currentMember: Member;
  public counts: { [index: string]: number };

  constructor(data: any = {}) {
    this.slug = data.slug;
    this.name = data.name;
    this.createdBy = data.created_by;
    this.createdOn = new Date(data.created_on);

    if (data.about) {
      this.about = data.about;
    }

    if (data.avatar) {
      this.thumbnailUrl = data.avatar.thumbnail;
      this.tinyUrl = data.avatar.tiny;
    }

    if (data.current_member) {
      this.currentMember = new Member(data.current_member);
    }

    if (data.counts) {
      this.counts = data.counts;
    }

    if (data.ot) {
      this.orgTemplate = data.ot;
    }
  }

  public getPatchPayload(): any {
    let payload: any = {
      name: this.name
    };

    if (this.about) {
      payload.about = this.about;
    }

    return payload;
  }

  public addMembers(members: Array<Member>): void {
    this.members = members;
    this.memberMap = {};
    this.members.forEach((m: Member) => this.memberMap[m.user.email] = m);
  }

  public getMember(slug: string): Member {
    return this.memberMap[slug];
  }

  public addPendingInvites(pendingInvites: Array<Invitation>): void {
    this.pendingInvites = pendingInvites;
    this.pendingInviteMap = {};
    this.pendingInvites.forEach((pv: Invitation) => this.pendingInviteMap[pv.email] = pv);
  }

  public getPendingInvite(email: string): Invitation {
    return this.pendingInviteMap[email];
  }
}

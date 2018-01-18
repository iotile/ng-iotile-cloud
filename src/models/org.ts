import { Member, MemberDictionary } from './member';

export class Org {
  public slug: string;
  public name: string;
  public about: string;
  public createdBy: string;
  public createdOn: Date;
  public thumbnailUrl: string;
  public tinyUrl: string;
  public members: Array<Member> = [];
  public memberMap: MemberDictionary = {};

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
    this.members.forEach((m: Member) => this.memberMap[m.user] = m);
  }

  public getMember(slug: string): Member {
    return this.memberMap[slug];
  }
}

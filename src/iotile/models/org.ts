
export class Org {
  public slug: string;
  public name: string;
  public about: string;
  public createdBy: string;
  public createdOn: Date;
  public thumbnailUrl: string;
  public tinyUrl: string;

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
  }

  public getPatchPayload(): any {
    let payload: any = {
      name: this.name
    }
    if (this.about) {
      payload.about = this.about;
    }
    return payload;
  }

}

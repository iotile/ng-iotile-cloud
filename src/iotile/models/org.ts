
export class Org {
  public slug: string;
  public name: string;
  public thumbnailUrl: string;
  public tinyUrl: string;

  constructor(data: any = {}) {
    this.slug = data.slug;
    this.name = data.name;
    if (data.avatar) {
      this.thumbnailUrl = data.avatar.thumbnail;
      this.tinyUrl = data.avatar.tiny;
    }
  }
}
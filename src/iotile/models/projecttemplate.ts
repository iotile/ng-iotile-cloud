export class ProjectTemplate {
  public id: number;
  public slug: string;
  public name: string;
  public org: string;
  public version: string;
  public extraData: any;

  constructor(data: any = {}) {
    this.id = data.id;
    this.slug = data.slug;
    this.org = data.org;
    if ('version' in data) {
      this.version = data.version;
    }
    this.name = data.name;
    if ('extra_data' in data) {
      this.extraData = data['extra_data'];
    }
  }
}
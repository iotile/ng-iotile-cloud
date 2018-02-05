export class OrgTemplate {
  public id: number;
  public name: string;
  public slug: string;
  public version: string;
  public createdOn: Date;
  public extraData: any;

  constructor(data: any = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.slug = data.slug || '';
    this.createdOn = new Date(data.created_on);

    if ('version' in data) {
      this.version = data.version;
    }

    if ('extra_data' in data) {
      this.extraData = data['extra_data'];
    }
  }

  public getExtraData(): any {
    if (this.extraData && 'web' in this.extraData) {
      return this.extraData['web'];
    }
  }
}

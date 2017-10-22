export class DataBlock {
  public id: number;
  public slug: string;
  public title: string;
  public org: string;
  public block: number;
  public sensorGraphSlug: string;
  public createdOn: Date;
  public createdBy: Date;
  public description: string;

  public constructor(data: any) {
    this.id = data.id;
    this.slug = data.slug;
    this.title = data.title;
    this.org = data.org;
    this.block = data.block;
    this.sensorGraphSlug = data.sg;
    this.createdOn = new Date(data.created_on);
    this.createdBy = data.created_by;

    if ('description' in data) {
      this.description = data.description;
    }
  }

  public getPostPayload() {
    let payload = {
      title: this.title,
      device: this.slug,
      description: ''
    };

    if (this.description) {
      payload.description = this.description;
    }

    return payload;
  }
}

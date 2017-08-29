export class Archive {
  public id: number;
  public slug: string;
  public title: string;
  public org: string;
  public block: number;
  public sensorGraphSlug: string;
  public createdOn: Date;
  public createdBy: Date;

  public constructor(data) {
    this.id = data.id;
    this.slug = data.slug;
    this.title = data.title;
    this.org = data.org;
    this.block = data.block;
    this.sensorGraphSlug = data.sg;
    this.createdOn = new Date(data.created_on);
    this.createdBy = new Date(data.created_by);
  }
}

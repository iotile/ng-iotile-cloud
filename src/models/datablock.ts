export class DataBlock {
  public id: number;
  public slug: string;
  public title: string;
  public org: string;
  public block: number;
  public sensorGraphSlug: string;
  public createdOn: Date;
  public createdBy: string = '';
  public description: string = '';
  public pid: string = '';
  public onComplete: any;

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

    if ('pid' in data) {
      this.pid = data.pid;
    }
  }

  public getPostPayload() {
    let payload: any = {
      title: this.title,
      device: this.slug,
      description: ''
    };

    if (this.description) {
      payload.description = this.description;
    }

    if (this.onComplete) {
      payload['on_complete'] = this.onComplete;
    }

    return payload;
  }
}

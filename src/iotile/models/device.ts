
export class Device {
  public id: number;
  public slug: string;
  public gid: string;
  public label: string;
  public lat: number;
  public lng: number;
  public template: string;

  constructor(data: any = {}) {
    this.id = data.id;
    this.slug = data.slug;
    this.gid = data.gid;
    this.label = data.label || data.slug;
    this.lat = parseFloat(data.lat || 0);
    this.lng = parseFloat(data.lon || 0);
    this.template = data.template || '';
  }
}
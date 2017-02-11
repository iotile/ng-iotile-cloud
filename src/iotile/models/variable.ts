import { Mdo } from './mdo';

export class Variable {
  public id: number;
  public slug: string;
  public lid: number;
  public name: string;
  public units: string;
  public appOnly: boolean;
  public sysVar: boolean;
  public about: string;
  public mdo: Mdo;

  constructor(data: any = {}) {
    this.id = data.id;
    this.slug = data.slug;
    this.lid = data.lid;
    this.name = data.name || data.slug;
    this.units = data.units;
    this.appOnly = data.app_only;
    this.sysVar = data.project === null;
    this.about = data.about || '';
    this.mdo = new Mdo(data);
  }

  public getHexLid(): string {
    if (this.slug) {
      let elements: Array<string> = this.slug.split('--');
      if (elements.length === 3) {
          return elements[2];
      }
    }
    return '';
  }

  public getPatchPayload(): any {
    let basic: any = {
      name: this.name,
      units: this.units
    }
    let payload: any = Object.assign(basic, this.mdo.getPatchPayload());
    return payload;
  }
}
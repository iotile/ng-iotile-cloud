import { Mdo } from './mdo';
import { Unit } from './unit';

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
  public inputUnit: Unit;
  public outputUnit: Unit;
  public type;

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
    this.type = data.var_type;
    if (data.input_unit) {
      this.inputUnit = new Unit(data.input_unit);
    }
    if (data.output_unit) {
      this.outputUnit = new Unit(data.output_unit);
    }
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
    if (this.inputUnit) {
      payload['input_unit'] = this.inputUnit.id;
    }
    if (this.outputUnit) {
      payload['output_unit'] = this.outputUnit.id;
    }
    if (this.about) {
      payload['about'] = this.about;
    }
    return payload;
  }
}
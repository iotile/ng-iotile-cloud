import { Mdo } from './mdo';
import { Unit } from './unit';

export interface VariableDictionary {
    [ index: string ]: Variable;
}

export class Variable {
  public id: string;
  public slug: string;
  public lid: number;
  public name: string;
  public units: string;
  public appOnly: boolean;
  public webOnly: boolean;
  public sysVar: boolean;
  public about: string;
  public mdo: Mdo;
  public inputUnit: Unit;
  public outputUnit: Unit;
  public type: string;

  constructor(data: any = {}) {
    this.id = data.id;
    this.slug = data.slug;
    this.lid = data.lid;
    this.name = data.name || data.slug;
    this.units = data.units;
    this.appOnly = data.app_only || false;
    this.webOnly = data.web_only || false;
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
      name: this.name
    };
    let payload: any = Object.assign(basic, this.mdo.getPatchPayload());
    if (this.units) {
      payload['units'] = this.units;
    }
    if (this.inputUnit) {
      payload['input_unit'] = this.inputUnit.slug;
    }
    if (this.outputUnit) {
      payload['output_unit'] = this.outputUnit.slug;
    }
    if (this.about) {
      payload['about'] = this.about;
    }
    return payload;
  }
}
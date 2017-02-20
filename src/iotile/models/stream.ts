import { Stats } from './stats';
import { DataPoint } from './datapoint';
import { Mdo } from './mdo';
import { Unit } from './unit';

export class Stream {
  public slug: string;
  public variable: string;
  public device: string;
  public project: string;
  public template: string;
  public mdoType: string;
  public mdo: Mdo;
  public inputUnit: Unit;
  public outputUnit: Unit; 
  public stats: Stats;
  public data: Array<DataPoint>;

  constructor(data: any = {}) {
    this.slug = data.slug;
    this.variable = data.variable;
    this.device = data.device;
    this.project = data.project;
    this.mdoType = data.mdo_type || null;
    this.mdo = new Mdo(data);
    this.stats = new Stats();
    this.data;
    if (data.input_unit) {
      this.inputUnit = new Unit(data.input_unit);
    }
    if (data.output_unit) {
      this.outputUnit = new Unit(data.output_unit);
    }
  }

  public addStats(stats: Stats): void {
    this.stats = stats;
  }

  public addData(data: Array<DataPoint>): void {
    this.data = data;
  }

  public getLocalVarId(): string {
    if (this.variable) {
      let elements: Array<string> = this.variable.split('--');
      if (elements.length === 3) {
          return elements[2];
      }
    }
    return '';
  }

  public getPatchPayload(): any {
    let basic: any = {
      mdo_type: this.mdoType
    }
    let payload: any = Object.assign(basic, this.mdo.getPatchPayload());
    if (this.inputUnit) {
      payload['input_unit'] = this.inputUnit.id;
    }
    if (this.outputUnit) {
      payload['output_unit'] = this.outputUnit.id;
    }
    return payload;
  }
}
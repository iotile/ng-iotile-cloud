import { Stats } from './stats';
import { DataPoint } from './datapoint';
import { Mdo } from './mdo';
import { Unit } from './unit';

export interface StreamDictionary {
    [ index: string ]: Stream
}

export class Stream {
  public slug: string;
  public variable: string;
  public block: string;
  public variableName: string;
  public variableType: string;
  public variableLocalId: number;
  public device: string;
  public project: string;
  public enabled: boolean = true;
  public template: string;
  public mdoType: string;
  public mdo: Mdo;
  public inputUnit: Unit;
  public outputUnit: Unit; 
  public stats: Stats;
  public dataLabel: string;
  public data: Array<DataPoint>;

  constructor(data: any = {}) {
    this.slug = data.slug;
    this.variable = data.variable;
    this.device = data.device;
    this.project = data.project;
    this.mdoType = data.mdo_type || null;
    this.mdo = new Mdo(data);
    this.stats = new Stats();
    this.enabled = data.enabled;
    if (data.block) {
      this.block = data.block;
    }
    if (data.var_name) {
      this.variableName = data.var_name;
    }
    if (data.var_type) {
      this.variableType = data.var_type;
    }
    this.variableLocalId = data.var_lid;
    if (data.data_label) {
      this.dataLabel = data.data_label;
    }
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

  public resetData(): void {
    this.data = [];
  }

  public getPatchPayload(): any {
    let basic: any = {
      mdo_type: this.mdoType,
      enabled: this.enabled
    }
    let payload: any = Object.assign(basic, this.mdo.getPatchPayload());
    if (this.inputUnit) {
      payload['input_unit'] = this.inputUnit.slug;
    }
    if (this.outputUnit) {
      payload['output_unit'] = this.outputUnit.slug;
    }
    if (this.dataLabel) {
      payload['data_label'] = this.dataLabel;
    }
    return payload;
  }
}
import { Unit } from './unit';
import { Mdo } from './mdo';

export interface VarTypeDictionary {
    [ slug: string ]: VarType;
}

class SchemaKey {
  type: string;
  units: string;
  decimal: number;
  label: string;
  outputUnits: {
    [units: string]: Mdo
  };
};

class Schema {
  schemaKeys: Array<SchemaKey>;
}

export class VarType {
  public name: string;
  public slug: string;
  public unitFullName: string;
  public availableInputUnits: Array<Unit>;
  public availableOutputUnits: Array<Unit>;
  public schema: Schema;

  constructor(data: any = {}) {
    this.name = data.name;
    this.slug = data.slug;
    this.unitFullName = data.storage_units_full;

    if ('available_input_units' in data) {
      data['available_input_units'].forEach((u: any) => {
        if (!this.availableInputUnits) {
          this.availableInputUnits = [];
        }
        let unit: Unit = new Unit(u);
        this.availableInputUnits.push(unit);
      });
    }

    if ('available_output_units' in data) {
      data['available_output_units'].forEach((u: any) => {
        if (!this.availableOutputUnits) {
          this.availableOutputUnits = [];
        }
        let unit: Unit = new Unit(u);
        this.availableOutputUnits.push(unit);
      });
    }

    if ('schema' in data) {
      let schema = data['schema'];
      this.schema = new Schema();
      this.schema.schemaKeys = Object.keys(schema.keys).map(i => schema.keys[i])

      console.log('What is THIS SCHEMA', this.schema);
    }
  }

  public getInputUnitForSlug(slug: string): Unit | undefined {
    let resultingUnit: Unit | undefined;

    this.availableInputUnits.forEach(u => {
      if (u.slug === slug) {
        resultingUnit = u;
      }
    });

    return resultingUnit;
  }

  public getOutputUnitForSlug(slug: string): Unit | undefined {
    let resultingUnit: Unit | undefined;

    this.availableOutputUnits.forEach(u => {
      if (u.slug === slug) {
        resultingUnit = u;
      }
    });

    return resultingUnit;
  }
}

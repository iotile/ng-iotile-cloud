import { Unit } from './unit';

export interface VarTypeDictionary {
    [ slug: string ]: VarType
}

export class VarType {
  public name: string;
  public slug: string;
  public unitFullName: string;
  public availableInputUnits: Array<Unit>;
  public availableOutputUnits: Array<Unit>;

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
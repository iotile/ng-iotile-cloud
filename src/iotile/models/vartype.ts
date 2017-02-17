import { Unit } from './unit';

export class VarType {
  public name: string;
  public unitFullName: string;
  public unitShortName: string;
  public availableInputUnits: Array<Unit>;
  public availableOutputUnits: Array<Unit>;

  constructor(data: any = {}) {
    this.name = data.name;
    this.unitFullName = data.storage_units_full;
    this.unitShortName = data.storage_units_short;

    data['available_input_units'].forEach(u => {
      if (!this.availableInputUnits) {
        this.availableInputUnits = [];
      }
      let unit: Unit = new Unit(u);
      this.availableInputUnits.push(unit);
    });
    
    data['available_output_units'].forEach(u => {
      if (!this.availableOutputUnits) {
        this.availableOutputUnits = [];
      }
      let unit: Unit = new Unit(u);
      this.availableOutputUnits.push(unit);
    });
  }
}
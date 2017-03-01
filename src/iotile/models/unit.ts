import { Mdo, MdoDictionary } from './mdo';



export interface DerviceUnitTypeDictionary {
  [ index: string ]: MdoDictionary;
}

export class Unit {
  public mdo: Mdo;
  public fullName: string;
  public shortName: string;
  public slug: string;
  public decimalPlaces: number;
  public derivedUnits: DerviceUnitTypeDictionary;

  constructor(data: any = {}) {
    this.mdo = new Mdo(data);
    this.fullName = data.unit_full;
    this.shortName = data.unit_short;
    this.slug = data.slug;
    if ('decimal_places' in data) {
      this.decimalPlaces = data.decimal_places;
    }

    if ('derived_units' in data) {
      this.derivedUnits = data.derived_units;
    }
  }

  public deriveUnitTypes(): string[] {
    var keySet: string[] = [];

    for (var prop in this.derivedUnits) {
      if (this.derivedUnits.hasOwnProperty(prop)) {
        keySet.push(prop);
      }
    }

    return keySet;
  }

  public deriveUnitsByType(type: string): string[] {
    var keySet: string[] = [];

    for (var prop in this.derivedUnits[type]) {
      if (this.derivedUnits[type].hasOwnProperty(prop)) {
        keySet.push(prop);
      }
    }

    return keySet;
  }
}

import { Unit, DerviceUnitTypeDictionary,  } from '../../src/models/unit';
import { Mdo, MdoDictionary } from '../../src/models/mdo';

const inputUnit: Unit = new Unit({
  "slug": "in--water-meter-volume--gallons",
  "unit_full": "Gallons",
  "unit_short": "g",
  "m": 378,
  "d": 100,
  "o": 0.0
});

const outputUnit: Unit = new Unit({
  "slug": "out--water-meter-volume--liters",
  "unit_full": "Liters",
  "unit_short": "l",
  "m": 2,
  "d": 1,
  "o": 0.0,
  "decimal_places": 2,
  "derived_units": {
    "rate": {
      "lph": {
        "d": 1,
        "m": 6
      },
      "lpm": {
        "d": 10,
        "m": 2
      }
    }
  }
});

describe('UnitsTest', () => {

  it('check basic inputUnit', () => {
    let u: Unit = inputUnit;
    expect(u.slug).toEqual('in--water-meter-volume--gallons');
    expect(u.fullName).toEqual('Gallons');
    expect(u.shortName).toEqual('g');
    expect(u.mdo.m).toEqual(378);
    expect(u.mdo.d).toEqual(100);
    expect(u.mdo.o).toEqual(0.0);
    expect(u.decimalPlaces).toBeUndefined();
    expect(u.derivedUnits).toBeUndefined();
  });

  it('check basic outputUnit', () => {
    let u: Unit = outputUnit;
    expect(u.slug).toEqual('out--water-meter-volume--liters');
    expect(u.fullName).toEqual('Liters');
    expect(u.shortName).toEqual('l');
    expect(u.mdo.m).toEqual(2);
    expect(u.mdo.d).toEqual(1);
    expect(u.mdo.o).toEqual(0.0);
    expect(u.decimalPlaces).toEqual(2);
  });

  it('check output derivedUnits', () => {
    let u: Unit = outputUnit;

    expect(u.deriveUnitTypes()).toEqual(['rate']);
    expect(u.deriveUnitsByType('rate')).toEqual(['lph', 'lpm']);

    let derivedUnits: DerviceUnitTypeDictionary = u.derivedUnits;
    expect(derivedUnits['rate']['lph'].m).toEqual(6);
    expect(derivedUnits['rate']['lph'].d).toEqual(1);
    expect(derivedUnits['rate']['lpm'].d).toEqual(10);
    expect(derivedUnits['rate']['lpm'].m).toEqual(2);
  });

  it('check setFromUnit', () => {
    let srcUnit: Unit = outputUnit;
    let dstUnit: Unit = new Unit();
    dstUnit.setFromUnit(srcUnit);
    expect(dstUnit.slug).toEqual('out--water-meter-volume--liters');
    expect(dstUnit.fullName).toEqual('Liters');
    expect(dstUnit.shortName).toEqual('l');
    expect(dstUnit.mdo.m).toEqual(2);
    expect(dstUnit.mdo.d).toEqual(1);
    expect(dstUnit.mdo.o).toBeUndefined();
    expect(dstUnit.decimalPlaces).toEqual(2);
  });

});
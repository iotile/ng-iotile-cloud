'use strict';

import { Project } from '../../iotile/models/project';
import { Variable } from '../../iotile/models/variable';
import { Unit } from '../../iotile/models/unit';
import { Mdo } from '../../iotile/models/mdo';

const dummyVariable: Variable = new Variable({
  "id": "e83cdfaf-144e-478a-92b2-b05a52bea2ae",
  "name": "IO 1",
  "lid": 20481,
  "var_type": "water-meter-volume",
  "input_unit": {
    "unit_full": "Gallons",
    "unit_short": "g",
    "m": 378,
    "d": 100,
    "o": 0.0
  },
  "output_unit": null,
  "project": "1b5bfb6c-333b-4a57-9c7e-cb9dc4bc1b7f",
  "org": "arch-systems",
  "about": "Water flow rate (every 10min)",
  "created_on": "2017-01-22T23:29:45.813720Z",
  "units": "Gallons",
  "multiplication_factor": 1,
  "division_factor": 10,
  "offset": 5.0,
  "decimal_places": 2,
  "mdo_label": "",
  "type": "Num",
  "app_only": false,
  "slug": "v--0000-0001--5001"
});

describe('VariableTest', () => {

  it('check basic variable', () => {
    let v: Variable = dummyVariable;
    expect(v.id).toEqual('e83cdfaf-144e-478a-92b2-b05a52bea2ae');
    expect(v.name).toEqual('IO 1');
    expect(v.slug).toEqual('v--0000-0001--5001');
    expect(v.lid).toEqual(20481);
    expect(v.about).toEqual('Water flow rate (every 10min)');
    expect(v.appOnly).toEqual(false);
    expect(v.units).toEqual('Gallons');
    expect(v.sysVar).toEqual(false);
    expect(v.type).toEqual('water-meter-volume');
  });

  it('check variable MDO', () => {
    let v: Variable = dummyVariable;
    expect(v.mdo.m).toEqual(1);
    expect(v.mdo.d).toEqual(10);
    expect(v.mdo.o).toEqual(5.0);
  });

  it('check variable units', () => {
    let v: Variable = dummyVariable;
    expect(v.outputUnit).toBeUndefined();
    expect(v.inputUnit).toBeDefined();
    expect(v.inputUnit.fullName).toEqual('Gallons');
    expect(v.inputUnit.shortName).toEqual('g');
    expect(v.inputUnit.mdo).toBeDefined();
    expect(v.inputUnit.mdo.m).toEqual(378);
    expect(v.inputUnit.mdo.d).toEqual(100);
    expect(v.inputUnit.mdo.o).toEqual(0.0);
  });

  it('check variable.getPatchPayload', () => {
    let v: Variable = dummyVariable;
    let payload: any = v.getPatchPayload();
    expect(payload.name).toEqual('IO 1');
    expect(payload.units).toEqual('Gallons');
    expect(payload.multiplication_factor).toEqual(1);
    expect(payload.division_factor).toEqual(10);
    expect(payload.offset).toEqual(5.0);
  });

  it('check variable.getHexLid', () => {
    let v: Variable = dummyVariable;
    expect(v.getHexLid()).toEqual('5001');
  });
});

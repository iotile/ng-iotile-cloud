'use strict';

import { Project } from '../project';
import { Variable } from '../variable';

const dummyVariable: Variable = new Variable({
  "id": "e83cdfaf-144e-478a-92b2-b05a52bea2ae",
  "name": "Foo",
  "lid": 20481,
  "project": "30b489b4-fb8d-4417-8370-25e54a415bfa",
  "org": "my-org",
  "template": null,
  "about": "Water flow rate (every 10min)",
  "created_on": "2016-11-04T00:48:48.002968Z",
  "units": "GPM",
  "multiplication_factor": 1,
  "division_factor": 10,
  "offset": 5.0,
  "decimal_places": 2,
  "type": "Num",
  "app_only": false,
  "slug": "v--0000-0001--5001"
});

describe('VariableTest', () => {

  it('check basic variable', () => {
    let v: Variable = dummyVariable;
    expect(v.id).toEqual('e83cdfaf-144e-478a-92b2-b05a52bea2ae');
    expect(v.name).toEqual('Foo');
    expect(v.slug).toEqual('v--0000-0001--5001');
    expect(v.lid).toEqual(20481);
    expect(v.about).toEqual('Water flow rate (every 10min)');
    expect(v.appOnly).toEqual(false);
    expect(v.units).toEqual('GPM');
    expect(v.sysVar).toEqual(false);
    // MDO
    expect(v.mdo.m).toEqual(1);
    expect(v.mdo.d).toEqual(10);
    expect(v.mdo.o).toEqual(5.0);
  });

  it('check variable.getPatchPayload', () => {
    let v: Variable = dummyVariable;
    let payload: any = v.getPatchPayload();
    expect(payload.name).toEqual('Foo');
    expect(payload.units).toEqual('GPM');
    expect(payload.multiplication_factor).toEqual(1);
    expect(payload.division_factor).toEqual(10);
    expect(payload.offset).toEqual(5.0);
  });
});

'use strict';

import { Stream } from '../../src/models/stream';
import { Mdo } from '../../src/models/mdo';
  
const dummyStream0 = new Stream({
    "id": "13671f1f-e2cb-49f8-82bd-a05d5f66371d",
    "project_id": null,
    "project": "p--0000-0006",
    "device": "d--0000-0000-0000-0084",
    "block": "b--0001-0000-0000-0084",
    "data_label": "My Data",
    "variable": "v--0000-0006--5003",
    "var_type": "soil-moisture-percent",
    "var_name": "IO 1",
    "var_lid": 20483,
    "input_unit": {
        "m": 100,
        "d": 4095,
        "unit_short": "%",
        "o": 0.0,
        "slug": "in--soil-moisture-percent--percent",
        "unit_full": "Percent"
    },
    "output_unit": {
        "slug": "out--soil-moisture-percent--percent",
        "unit_short": "%",
        "decimal_places": 1,
        "m": 1,
        "d": 1,
        "unit_full": "Percent",
        "o": 0.0,
        "derived_units": {}
    },
    "derived_stream": null,
    "raw_value_format": "<L",
    "mdo_type": "S",
    "mdo_label": "",
    "multiplication_factor": 1,
    "division_factor": 10,
    "offset": 0.0,
    "org": "arch-grow",
    "created_on": "2017-08-24T21:50:49.658026Z",
    "slug": "s--0000-0006--0001-0000-0000-0084--5003",
    "enabled": true
  });

describe('StreamTest', () => {

  it('check Stream construction', () => {
    let stream: Stream = dummyStream0;
    expect(stream).toBeTruthy();
    expect(stream.variable).toEqual('v--0000-0006--5003');
    expect(stream.variableType).toEqual('soil-moisture-percent');
    expect(stream.variableName).toEqual('IO 1');
    expect(stream.device).toEqual('d--0000-0000-0000-0084');
    expect(stream.block).toEqual('b--0001-0000-0000-0084');
    expect(stream.project).toEqual('p--0000-0006');
    expect(stream.project).toEqual('p--0000-0006');
    expect(stream.mdoType).toEqual('S');
    expect(stream.dataLabel).toEqual('My Data');
    expect(stream.mdo.d).toEqual(10);
    expect(stream.mdo.computeValue(200)).toBe(20.0);
    expect(stream.enabled).toBeTruthy();

    expect(stream.template).toBeUndefined();
  });

  it('check getLocalVarId()', () => {
    let stream: Stream = dummyStream0;
    expect(stream.getLocalVarId()).toEqual('5003');
    expect(stream.variableLocalId).toEqual(0x5003);
  });

  it('check stream.getPatchPayload()', () => {
    let stream: Stream = dummyStream0;
    let payload: any = stream.getPatchPayload();
    expect(payload.mdo_type).toEqual('S');
    expect(payload.input_unit).toEqual('in--soil-moisture-percent--percent');
    expect(payload.output_unit).toEqual('out--soil-moisture-percent--percent');
    expect(payload.multiplication_factor).toEqual(1);
    expect(payload.division_factor).toEqual(10);
    expect(payload.enabled).toBeTruthy();
  });
});
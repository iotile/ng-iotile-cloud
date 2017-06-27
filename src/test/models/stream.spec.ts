'use strict';

import { Stream } from '../../iotile/models/stream';
import { Mdo } from '../../iotile/models/mdo';
  
const dummyStream0 = new Stream({
      project: "p--0000-0010",
      device: "d--0000-0000-0000-00ae",
      variable: "v--0000-0010--5001",
      mdo_type: "S",
      "data_label": "My Data",
      input_unit: {
        "slug": "in--water-meter-volume--gallons",
        "unit_full": "Gallons",
        "unit_short": "g",
        "m": 378541,
        "d": 100,
        "o": 0.0
      },
      output_unit: null,
      multiplication_factor: 1,
      division_factor: 10,
      offset: 5.0,
      enabled: false,
      org: "arch-internal",
      created_on: "2016-11-16T16:42:54.312425Z",
      slug: "s--0000-0010--0000-0000-0000-00ae--5001"
    });

describe('StreamTest', () => {

  it('check Stream construction', () => {
    let stream: Stream = dummyStream0;
    expect(stream).toBeTruthy();
    expect(stream.variable).toEqual('v--0000-0010--5001');
    expect(stream.device).toEqual('d--0000-0000-0000-00ae');
    expect(stream.project).toEqual('p--0000-0010');
    expect(stream.mdoType).toEqual('S');
    expect(stream.dataLabel).toEqual('My Data');
    expect(stream.mdo.d).toEqual(10);
    expect(stream.mdo.computeValue(200)).toBe(25.0);
    expect(stream.enabled).toBeFalsy();

    expect(stream.template).toBeUndefined();
  });

  it('check getLocalVarId()', () => {
    let stream: Stream = dummyStream0;
    expect(stream.getLocalVarId()).toEqual('5001');
    stream.variable = null;
    expect(stream.getLocalVarId()).toEqual('');
  });

  it('check stream.getPatchPayload()', () => {
    let stream: Stream = dummyStream0;
    let payload: any = stream.getPatchPayload();
    expect(payload.mdo_type).toEqual('S');
    expect(payload.input_unit).toEqual('in--water-meter-volume--gallons');
    expect(payload.output_unit).toBeUndefined();
    expect(payload.multiplication_factor).toEqual(1);
    expect(payload.division_factor).toEqual(10);
    expect(payload.offset).toEqual(5.0);
    expect(payload.enabled).toBeFalsy();
  });
});
'use strict';

import { Stream } from '../stream';
import { Mdo } from '../mdo';
  
const dummyStream0 = new Stream({
      project: "p--0000-0010",
      device: "d--0000-0000-0000-00ae",
      variable: "v--0000-0010--5001",
      mdo_type: "S",
      multiplication_factor: 1,
      division_factor: 10,
      offset: 5.0,
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
    expect(stream.mdo.d).toEqual(10);
    expect(stream.mdo.computeValue(200)).toBe(25.0);

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
    expect(payload.multiplication_factor).toEqual(1);
    expect(payload.division_factor).toEqual(10);
    expect(payload.offset).toEqual(5.0);
  });
});
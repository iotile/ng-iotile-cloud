'use strict';

import { IOTileSysVar } from '../../src/models/iotile-sys-var';


describe('IOTileSysVar', () => {

  it('check basic model', () => {
    let iotileSysVar: IOTileSysVar = new IOTileSysVar();
    expect(iotileSysVar.gatewayScanBegin).toBe('5a00');
    expect(iotileSysVar.gatewayScanEnd).toBe('5a01');
    expect(iotileSysVar.gatewayScanFailure).toBe('5a03');
    expect(iotileSysVar.endOfTripSummary).toBe('5a07');
    expect(iotileSysVar.deviceDataMask).toBe('5a09');
  });
});

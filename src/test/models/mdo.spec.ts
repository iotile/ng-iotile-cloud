'use strict';

import { Mdo } from '../../iotile/models/mdo';

describe('MdoTest', () => {

  it('check MDO construction from data', () => {
    let mdo: Mdo = new Mdo({
      "multiplication_factor": 100,
      "division_factor": 2,
      "offset": 10.0,
      "mdo_label": "UPP"
    });
    expect(mdo.m).toEqual(100);
    expect(mdo.d).toEqual(2);
    expect(mdo.o).toEqual(10.0);
    expect(mdo.label).toEqual('UPP');
  });

  it('check MDO construction', () => {
    let mdo: Mdo = new Mdo();
    mdo.m = 100
    mdo.d = 2
    mdo.o = 10.0
    mdo.label = 'UPP'
    expect(mdo.m).toEqual(100);
    expect(mdo.d).toEqual(2);
    expect(mdo.o).toEqual(10.0);
    expect(mdo.label).toEqual('UPP');
    expect(mdo.computeValue(5)).toBe(260);
  });

  it('check limits to num decimals', () => {
    let mdo: Mdo = new Mdo();
    // Passing a 0.333... should limit to ten decimal points
    mdo.setFromFactor(0.33333333333333, true); 
    expect(mdo.m).toEqual(100000000);
    expect(mdo.d).toEqual(33333333);
    expect(mdo.d).toBeLessThan(2147483647);
    expect(mdo.m).toBeLessThan(2147483647);

    mdo.setFromFactor(300000.6666666666666666666, true); 
    expect(mdo.m).toEqual(1000);
    expect(mdo.d).toEqual(300000667);
    expect(mdo.d).toBeLessThan(2147483647);
    expect(mdo.m).toBeLessThan(2147483647);
    
    mdo.setFromFactor(10.99999999999999999, false); 
    expect(mdo.d).toEqual(1);
    expect(mdo.m).toEqual(11);

    expect(mdo.d).toBeLessThan(2147483647);
    expect(mdo.m).toBeLessThan(2147483647);

    mdo.setFromFactor(21474836471234.11, false); 
    expect(mdo.d).toEqual(1);
    expect(mdo.m).toEqual(2147483647);

  });

  it('check mdo.setFromMdo', () => {
    let src: Mdo = new Mdo();
    src.m = 100
    src.d = 2
    src.o = 10.0
    expect(src.m).toEqual(100);
    
    let dst: Mdo = new Mdo();
    dst.setFromMdo(src);
    expect(dst.m).toEqual(100);
    expect(dst.d).toEqual(2);
    expect(dst.o).toEqual(10.0);
    expect(dst.label).toBeUndefined();

    src.label = 'UPP';
    dst = new Mdo();
    dst.setFromMdo(src);
    expect(dst.m).toEqual(100);
    expect(dst.d).toEqual(2);
    expect(dst.o).toEqual(10.0);
    expect(dst.label).toEqual('UPP');
  });

  it('check mdo.getPatchPayload', () => {
    let mdo: Mdo = new Mdo({
      "multiplication_factor": 100,
      "division_factor": 2,
      "offset": 10.0,
      "mdo_label": "UPP"
    });
    let payload: any = mdo.getPatchPayload();
    expect(payload.multiplication_factor).toEqual(100);
    expect(payload.division_factor).toEqual(2);
    expect(payload.offset).toEqual(10.0);
    expect(payload.mdo_label).toEqual('UPP');
  });

  it('check mdo.setFromFactor', () => {
    let mdo: Mdo = new Mdo();
    mdo.setFromFactor(.001, false);
    expect(mdo.m).toEqual(1);
    expect(mdo.d).toEqual(1000);
    expect(mdo.o).toEqual(0.0);
  
    mdo.setFromFactor(.001, true);
    expect(mdo.m).toEqual(1000);
    expect(mdo.d).toEqual(1);
    expect(mdo.o).toEqual(0.0);

    mdo.setFromFactor(0.0053, false);
    expect(mdo.m).toEqual(53);
    expect(mdo.d).toEqual(10000);

    mdo.setFromFactor(5, false);
    expect(mdo.m).toEqual(5);
    expect(mdo.d).toEqual(1);

    mdo.setFromFactor(5.0, false);
    expect(mdo.m).toEqual(5);
    expect(mdo.d).toEqual(1);

    mdo.setFromFactor(5.01, false);
    expect(mdo.m).toEqual(501);
    expect(mdo.d).toEqual(100);
  });
});
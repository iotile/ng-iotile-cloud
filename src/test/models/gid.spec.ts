'use strict';

import { DeviceGlobalId } from '../../iotile/models/gid';

describe('Utilities', () => {

  it('check DeviceGlobalId', () => {
    let dev0: DeviceGlobalId = new DeviceGlobalId(0);
    expect(dev0.toString()).toEqual('d--0000-0000-0000-0000');
    let dev424: DeviceGlobalId = new DeviceGlobalId(424);
    expect(dev424.toString()).toEqual('d--0000-0000-0000-01a8');
  });
});
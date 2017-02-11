'use strict';

import { Project } from '../project';
import { Device } from '../device';

describe('DeviceTest', () => {

  it('check basic device', () => {
    let dev: Device = new Device({
        "id": 129,
        "slug": "d--0000-0000-0000-0081",
        "gid": "0000-0000-0000-0081",
        "iotile_device_id": "0000-0000040D",
        "label": "1037 / 40D",
        "active": true,
        "project": "b83c6bd6-0f3f-4890-a390-d9d29d142966",
        "org": "netafim",
        "template": "1d1p2bt101-v0-1-0",
        "lat": null,
        "lon": null,
        "created_on": "2016-12-05T21:20:53.500516Z"
    });
    expect(dev.id).toEqual(129);
    expect(dev.slug).toEqual('d--0000-0000-0000-0081');
  });

});
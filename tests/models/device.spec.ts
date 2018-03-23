'use strict';

import { Project } from '../../src/models/project';
import { Device } from '../../src/models/device';
import { Property } from '../../src/models/property';
import { DataBlock } from '../../src/models/datablock';

describe('DeviceTest', () => {

  const dummyDevice1 = new Device({
    "id": 129,
    "slug": "d--0000-0000-0000-0081",
    "gid": "0000-0000-0000-0081",
    "label": "The Device",
    "active": true,
    "state": "N0",
    "project": "b83c6bd6-0f3f-4890-a390-d9d29d142966",
    "org": "my-org",
    "template": "1d1p2bt101-v0-1-0",
    "firmware_versions": [],
    "sg": "single-soil-moisture-v1-1-0",
    "lat": 2.345676,
    "lon": -12.12345,
    "created_on": "2016-12-05T21:20:53.500516Z"
  });

  const dummyProperties1: Array<Property> = [
    new Property({
      "id": 8,
      "name": "cargoDescription",
      "value": "Statement or description of the cargo."
    }),
    new Property({
        "id": 4,
        "name": "loadingType",
        "value": "Forklift"
    }),
    new Property({
        "id": 1,
        "name": "shipFrom",
        "value": "Mountain View, CA"
    }),
    new Property({
        "id": 2,
        "name": "shipTo",
        "value": "Seoul, South Korea"
    }),
    new Property({
        "id": 3,
        "name": "shipVia",
        "value": "Airplane"
    }),
    new Property({
        "id": 7,
        "name": "transportType",
        "value": "Air"
    })
  ];

  it('check basic device', () => {
    let dev: Device = dummyDevice1;
    expect(dev.id).toEqual(129);
    expect(dev.slug).toEqual('d--0000-0000-0000-0081');
    expect(dev.sensorGraphSlug).toEqual('single-soil-moisture-v1-1-0');
    expect(dev.label).toEqual('The Device');
  });

  it('check payload generation', () => {
    let dev: Device = dummyDevice1;
    let payload: any = dev.getPatchPayload();
    expect(payload.label).toEqual('The Device');
    expect(payload.lat).toEqual(2.345676);
    expect(payload.lon).toEqual(-12.12345);
  });

  it('it check device properties', () => {
    let dev: Device = dummyDevice1;
    let properties: Array<Property> = [];

    let dummyProperty1: Property = new Property({
      "id": 7,
      "name": "transportType",
      "value": "Air"
    });
    properties.push(dummyProperty1);

    let dummyProperty2 = new Property({
      "id": 8,
      "name": "cargoDescription",
      "value": "Statement or description of the cargo."
    });
    properties.push(dummyProperty2);

    dev.addProperties(properties);
    expect(dev.getProperty('transportType')).toBe(dummyProperty1);
    expect(dev.getProperty('cargoDescription')).toBe(dummyProperty2);
  });

  it('checks Device is DataBlock', () => {
    const mockArchive: DataBlock = new DataBlock({
      "id": 1,
      "slug": "b--0001-0000-0000-0087",
      "title": "from singapore to hong kong",
      "org": "kt-savers",
      "sg": "saver-v1-1-0",
      "block": 1,
      "created_on": "2017-08-29T01:04:06.572379Z",
      "created_by": "vanielle"
    });
    let archive: DataBlock = mockArchive;
    let dummyDevice = new Device({
      "id": 129,
      "slug": "d--0000-0000-0000-0081",
      "gid": "0000-0000-0000-0081",
      "label": "The Device",
      "active": true,
      "project": "b83c6bd6-0f3f-4890-a390-d9d29d142966",
      "org": "my-org",
      "template": "1d1p2bt101-v0-1-0",
      "firmware_versions": [],
      "sg": "single-soil-moisture-v1-1-0",
      "lat": 2.345676,
      "lon": -12.12345,
      "created_on": "2016-12-05T21:20:53.500516Z"
    });
    dummyDevice.dataBlock = archive;
    expect(dummyDevice.isDataBlock).toBeTruthy()
  });

});

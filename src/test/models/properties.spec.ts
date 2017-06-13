'use strict';

import { Properties } from '../../iotile/models/properties';

describe('Properties Test', () => {

  const dummpyProperties1 = new Properties([
    {
        "id": 8,
        "name": "cargoDescription",
        "value": "Statement or description of the cargo."
    },
    {
        "id": 4,
        "name": "loadingType",
        "value": "Forklift"
    },
    {
        "id": 1,
        "name": "shipFrom",
        "value": "Mountain View, CA"
    },
    {
        "id": 2,
        "name": "shipTo",
        "value": "Seoul, South Korea"
    },
    {
        "id": 3,
        "name": "shipVia",
        "value": "Airplane"
    },
    {
        "id": 7,
        "name": "transportType",
        "value": "Air"
    }
  ]);

  it('check basic properties', () => {
    let prop: Properties = dummpyProperties1;
    expect(prop.shipFrom).toEqual('Mountain View, CA');
    expect(prop.shipTo).toEqual('Seoul, South Korea');
    expect(prop.transportType).toEqual('Air');
  });

});

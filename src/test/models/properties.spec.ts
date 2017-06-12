'use strict';

import { Properties } from '../../iotile/models/properties';

describe('Properties Test', () => {

  const dummpyProperties1 = new Properties({
    shipFrom: 'San Jose, CA',
    shipTo: 'Cincinnati, OH',
    shipVia: 'Ground',
    loadingType: 'Forklift',
    transportType: 'Ground',
    cargoDescription: 'Statement or description of the cargo.'
  });

  it('check basic properties', () => {
    let prop: Properties = dummpyProperties1;
    expect(prop.shipFrom).toEqual('San Jose, CA');
    expect(prop.shipTo).toEqual('Cincinnati, OH');
    expect(prop.transportType).toEqual('Ground');
  });

});

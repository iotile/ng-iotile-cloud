'use strict';

import { Property } from '../../iotile/models/property';

describe('PropertyTest', () => {
  const dummyProperty1 = new Property({
    id: 8,
    name: 'cargoDescription',
    value: 'Statement or description of the cargo.'
  });

  it('check basic property', () => {
    expect(dummyProperty1).toBeDefined();
    expect(dummyProperty1.id).toEqual(8);
    expect(dummyProperty1.name).toEqual('cargoDescription');
  });

});

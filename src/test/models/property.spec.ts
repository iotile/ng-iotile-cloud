'use strict';

import { Property } from '../../iotile/models/property';

describe('PropertyTest', () => {
  const dummyProperty1 = new Property({
    id: 8,
    name: 'cargoDescription',
    value: 'Statement or description of the cargo.',
    type: 'str'
  });

  const dummyProperty2 = new Property({
    id: 8,
    name: 'distance',
    value: 100,
    type: 'int'
  });

  const dummyProperty3 = new Property({
    id: 8,
    name: 'By Plane',
    value: true,
    type: 'bool'
  });

  it('check basic property', () => {
    expect(dummyProperty1).toBeDefined();
    expect(dummyProperty1.id).toEqual(8);
    expect(dummyProperty1.name).toEqual('cargoDescription');
  });

  describe('getPostPayload()', () => {

    it('checks basic', () => {
      let dummyPayload = dummyProperty1.getPostPayload();
      expect(dummyPayload['id']).toEqual(8);
      expect(dummyPayload['name']).toBe('cargoDescription');
    });

    it('checks str_value', () => {
      let dummyPayload = dummyProperty1.getPostPayload();
      expect(dummyPayload['str_value']).toBe('Statement or description of the cargo.');
    });

    it('checks int_value', () => {
      let dummyPayload = dummyProperty2.getPostPayload();
      expect(dummyPayload['int_value']).toBe(100);
    });

    it('checks bool_value', () => {
      let dummyPayload = dummyProperty3.getPostPayload();
      expect(dummyPayload['bool_value']).toBe(true);
    });
  });
});

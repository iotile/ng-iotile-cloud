'use strict';

import { Property } from '../../src/models/property';

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

  const dummyProperty4 = new Property({
    name: 'cargoDescription',
    value: 'Statement or description of the cargo.',
    type: 'str'
  });

  it('checks basic property', () => {
    expect(dummyProperty1).toBeDefined();
    expect(dummyProperty1.id).toEqual(8);
    expect(dummyProperty1.name).toEqual('cargoDescription');
  });

  it('checks property without id', () => {
    expect(dummyProperty4.id).toBeUndefined();
  });

  describe('getPostPayload()', () => {

    it('checks basic', () => {
      let dummyPayload1 = dummyProperty1.getPostPayload();
      expect(dummyPayload1['id']).toEqual(8);
      expect(dummyPayload1['name']).toBe('cargoDescription');
    });

    it('checks basic without id', () => {
      let dummyPayload4 = dummyProperty4.getPostPayload();
      expect('id' in dummyPayload4).toBeFalsy();
    });

    it('checks str_value', () => {
      let dummyPayload1 = dummyProperty1.getPostPayload();
      expect(dummyPayload1['str_value']).toBe('Statement or description of the cargo.');
    });

    it('checks int_value', () => {
      let dummyPayload2 = dummyProperty2.getPostPayload();
      expect(dummyPayload2['int_value']).toBe(100);
    });

    it('checks bool_value', () => {
      let dummyPayload3 = dummyProperty3.getPostPayload();
      expect(dummyPayload3['bool_value']).toBe(true);
    });
  });
});
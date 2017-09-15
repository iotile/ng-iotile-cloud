'use strict';

import { Fleet } from '../../iotile/models/fleet';

it('check basic fleet', () => {
  let fleet: Fleet = new Fleet({
    "id": 1,
    "name": "Fleet 1",
    "slug": "g--0000-0000-0001",
    "org": "arch-internal",
    "description": "This is the description",
    "created_on": "2017-09-15T06:37:32.209799Z",
    "created_by": "david",
    "is_network": true
  });
  expect(fleet.slug).toEqual('g--0000-0000-0001');
  expect(fleet.name).toEqual('Fleet 1');
  expect(fleet.description).toEqual('This is the description');
  expect(fleet.isNetwork).toBeTruthy();
});
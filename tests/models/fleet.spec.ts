'use strict';

import { Fleet, FleetDevice } from '../../src/models/fleet';

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

it('check basic fleet devices', () => {
  let fd: FleetDevice = new FleetDevice({
    "device": "d--0000-0000-0000-0006",
    "always_on": true,
    "is_access_point": false
  });
  expect(fd.device).toEqual('d--0000-0000-0000-0006');
  expect(fd.alwaysOn).toBeTruthy();
  expect(fd.isAccessPoint).toBeFalsy();
});

it('check adding devices to fleet', () => {
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
  let fd: FleetDevice = new FleetDevice({
    "device": "d--0000-0000-0000-0006",
    "always_on": true,
    "is_access_point": false
  });
  fleet.addDevice(fd);
  expect(fleet.memberDictionary['d--0000-0000-0000-0006']['device']).toEqual('d--0000-0000-0000-0006');
});
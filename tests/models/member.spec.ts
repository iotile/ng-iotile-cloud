'use strict';

import { Member } from '../../src/models/member';

describe('MemberTest', () => {

  it('checks basic model', () => {
    let member: Member = new Member({
      "user_details": {
        "email": "andrew@arch-iot.com",
        "username": "andrew",
        "name": "Andrew Scheuermann",
        "tagline": "",
        "avatar": {
          "tiny": "https://secure.gravatar.com/avatar/b9d8102381d958dbd4cb154aee8c7b9e?d=identicon&s=28",
          "thumbnail": "https://secure.gravatar.com/avatar/b9d8102381d958dbd4cb154aee8c7b9e?d=identicon&s=80"
        }
      },
      "created_on": "2016-11-08T04:15:14.732769Z",
      "is_active": true
    });

    expect(member.isActive).toBe(true);
    expect(member.createdOn.getFullYear()).toBe(2016);
  });

  it('checks model user', () => {
    let member: Member = new Member({
      "user_details": {
        "email": "vanielle@arch-iot.com",
        "username": "lekosfmi",
        "name": "Vanielle Lee",
        "tagline": "",
        "avatar": {
          "thumbnail": "https://secure.gravatar.com/avatar/0828c899dcc84c7b50ac44b5a154b10c?d=identicon&s=80",
          "tiny": "https://secure.gravatar.com/avatar/0828c899dcc84c7b50ac44b5a154b10c?d=identicon&s=28"
        }
      },
      "created_on": "2017-04-13T03:12:39Z",
      "is_active": true,
      "is_org_admin": true
    });

    expect(member.user.email).toBe('vanielle@arch-iot.com');
    expect(member.user.username).toBe('lekosfmi');
    expect(member.user.name).toBe('Vanielle Lee');
    expect(member.user.tagline).toBe('');
    expect(member.user.avatarUrl).toBe('https://secure.gravatar.com/avatar/0828c899dcc84c7b50ac44b5a154b10c?d=identicon&s=80');
  });

  it('checks member permissions', () => {
    let member: Member = new Member({
      "user_details": {
        "email": "vanielle@arch-iot.com",
        "username": "lekosfmi",
        "name": "Vanielle Lee",
        "tagline": "",
        "avatar": {
          "thumbnail": "https://secure.gravatar.com/avatar/0828c899dcc84c7b50ac44b5a154b10c?d=identicon&s=80",
          "tiny": "https://secure.gravatar.com/avatar/0828c899dcc84c7b50ac44b5a154b10c?d=identicon&s=28"
        }
      },
      "created_on": "2017-04-13T03:12:39Z",
      "is_active": true,
      "is_org_admin": true,
      "permissions": {
        "can_create_datablock": true,
        "can_read_stream_data": true,
        "can_read_device_properties": true,
        "can_claim_devices": true,
        "can_manage_org_and_projects": true,
        "can_access_classic": true,
        "can_modify_device_properties": true,
        "can_access_webapp": true,
        "can_access_datablock": true,
        "can_access_companion": true,
        "can_modify_device": true,
        "can_modify_stream_variables": false,
        "can_delete_org": false,
        "can_manage_users": true,
        "can_read_notes": true,
        "can_read_device_locations": true,
        "can_create_stream_data": true,
        "can_upload_streamer_report": true,
        "can_manage_ota": true
      },
      "role": "a1",
      "role_name": "a1 - Admin"
    });

    expect(member.permissions).toBeDefined();

    expect(member.getPermission('can_access_webapp')).toBe(true);
    expect(member.getPermission('can_delete_org')).toBe(false);
    expect(member.getPermission('can_do_soemthing')).not.toBeDefined();

    expect(member.role).toBe('a1');
    expect(member.roleName).toBe('a1 - Admin');
  });
});

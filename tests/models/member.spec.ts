'use strict';

import { Member } from '../../src/models/member';

describe('MemberTest', () => {

  it('checks basic model', () => {
    let member: Member = new Member({
      "user": "andrew",
      "created_on": "2016-11-08T04:15:14.732769Z",
      "is_active": true,
      "is_org_admin": false
    });

    expect(member.user).toBe('andrew');
    expect(member.isActive).toBe(true);
    expect(member.isOrgAdmin).toBe(false);
    expect(member.createdOn.getFullYear()).toBe(2016);
  });

  it('checks model without', () => {
    let member: Member = new Member({
      "user": "andrew",
      "created_on": "2016-11-08T04:15:14.732769Z",
      "is_active": true,
    });

    expect(member.isOrgAdmin).toBe(false);
  });

  it('checks model user details', () => {
    let member: Member = new Member({
      "user": "lekosfmi",
      "created_on": "2017-04-13T03:12:39Z",
      "is_active": true,
      "is_org_admin": true,
      "user_details": {
        "email": "vanielle@arch-iot.com",
        "username": "lekosfmi",
        "name": "Vanielle Lee",
        "tagline": "",
        "avatar": {
          "thumbnail": "https://secure.gravatar.com/avatar/0828c899dcc84c7b50ac44b5a154b10c?d=identicon&s=80",
          "tiny": "https://secure.gravatar.com/avatar/0828c899dcc84c7b50ac44b5a154b10c?d=identicon&s=28"
        }
      }
    });

    expect(member.userDetails.email).toBe('vanielle@arch-iot.com');
    expect(member.userDetails.username).toBe('lekosfmi');
    expect(member.userDetails.name).toBe('Vanielle Lee');
    expect(member.userDetails.tagline).toBe('');
    expect(member.userDetails.avatarUrl).toBe('https://secure.gravatar.com/avatar/0828c899dcc84c7b50ac44b5a154b10c?d=identicon&s=80');
  });
});

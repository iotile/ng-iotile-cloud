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
      "is_active": true,
      "is_org_admin": false
    });

    expect(member.isActive).toBe(true);
    expect(member.isOrgAdmin).toBe(false);
    expect(member.createdOn.getFullYear()).toBe(2016);
  });

  it('checks model without', () => {
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
      "is_active": true,
    });

    expect(member.isOrgAdmin).toBe(false);
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
});

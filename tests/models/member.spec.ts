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
});

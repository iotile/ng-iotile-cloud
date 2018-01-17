'use strict';
import { Org } from '../../src/models/org';
import { Member } from '../../src/models/member';

describe('OrgTest', () => {

  it('check basic device', () => {
    let org: Org = new Org({
        "id": "9e46d50b-53b3-43ad-9725-06994e1086a3",
        "name": "My Org",
        "slug": "my-org",
        "about": "",
        "created_on": "2016-11-04T00:48:07.566567Z",
        "created_by": "david",
        "avatar": {
          "thumbnail": "https://image.com/thumbnail.jpg",
          "tiny": "https://image.com/tiny.jpg"
        }
    });
    expect(org.slug).toEqual('my-org');
    expect(org.name).toEqual('My Org');
    expect(org.tinyUrl).toEqual('https://image.com/tiny.jpg');
    expect(org.thumbnailUrl).toEqual('https://image.com/thumbnail.jpg');
    expect(org.createdOn.getFullYear()).toEqual(2016);
    expect(org.createdBy).toEqual('david');
    expect(org.about).toBeUndefined();
  });

  it('check org.getPatchPayload', () => {
    let org: Org = new Org({
      name: 'My New Org'
    });

    let payload: any = org.getPatchPayload();
    expect(payload.name).toEqual('My New Org');
  });

  describe('Org Membership', () => {
    let members: Array<Member> = [];

    let org: Org = new Org({
      "id": "9e46d50b-53b3-43ad-9725-06994e1086a3",
      "name": "My Org",
      "slug": "my-org",
      "about": "",
      "created_on": "2016-11-04T00:48:07.566567Z",
      "created_by": "david",
      "avatar": {
        "thumbnail": "https://image.com/thumbnail.jpg",
        "tiny": "https://image.com/tiny.jpg"
      }
    });

    let member1 = new Member({
      "user": "andrew",
      "created_on": "2016-11-08T04:15:14.732769Z",
      "is_active": true,
      "is_org_admin": false
    });

    members.push(member1);

    let member2 = new Member({
      "user": "chris",
      "created_on": "2016-11-04T00:48:14.887050Z",
      "is_active": true,
      "is_org_admin": false
    });

    members.push(member2);
    org.addMembers(members);

    it('checks org has members', () => {
      expect(org.members.length).toBe(2);
    });

    it('checks org can get member', () => {
      expect(org.getMember('andrew')).toBe(member1);
    });
  });
});

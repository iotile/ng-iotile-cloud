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

  describe('Org Members', () => {
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

  describe('Org with Extra Information', () => {

    let org: Org = new Org({
      "id": "564c54b5-19df-4fe0-9655-92542a2d0932",
      "name": "Arch - Internal",
      "slug": "arch-internal",
      "about": "Internal Projects for Testing",
      "created_on": "2016-11-04T00:48:13.033551Z",
      "created_by": "david",
      "avatar": {
        "thumbnail": "https://media.iotile.cloud/prod/images/3e5554ff-0e4d-4a10-b299-415e143c6931/thumbnail.jpg",
        "tiny": "https://media.iotile.cloud/prod/images/3e5554ff-0e4d-4a10-b299-415e143c6931/tiny.jpg"
      },
      "counts": {
        "datablocks": 36,
        "networks": 0,
        "members": 12,
        "fleets": 1,
        "devices": 70,
        "projects": 32,
        "reports": 0
      },
      "current_member": {
        "user": "lekosfmi",
        "created_on": "2017-04-13T03:12:39.109875Z",
        "is_active": true,
        "is_org_admin": true
      }
    });

    it('checks org membership', () => {
      expect(org.currentMember.user).toBe('lekosfmi');
      expect(org.currentMember.isActive).toBe(true);
      expect(org.currentMember.isOrgAdmin).toBe(true);
      expect(org.currentMember.createdOn.getFullYear()).toBe(2017);
    });

    it('checks org counts', () => {
      expect(org.counts.datablocks).toBe(36);
      expect(org.counts.networks).toBe(0);
    });
  });
});

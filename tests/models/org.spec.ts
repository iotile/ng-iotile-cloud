'use strict';
import {
  Org,
  OrgTemplate,
  Member,
  Invitation,
  InvitationPendingDictionary
} from '../../src/models';

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
    members.push(member1);

    let member2 = new Member({
      "user_details": {
        "email": "chris@arch-iot.com",
        "username": "chris",
        "name": "",
        "tagline": "",
        "avatar": {
          "tiny": "https://secure.gravatar.com/avatar/baff77137f51bcfe35f6275b14a61c38?d=identicon&s=28",
          "thumbnail": "https://secure.gravatar.com/avatar/baff77137f51bcfe35f6275b14a61c38?d=identicon&s=80"
        }
      },
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
      expect(org.getMember('andrew@arch-iot.com')).toBe(member1);
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
      "current_member":{
        "user": "lekosfmi",
        "user_details": {
          "email": "vanielle@arch-iot.com",
          "username": "lekosfmi",
          "name": "Vanielle Lee",
          "tagline": "",
          "avatar": {
            "tiny": "https://secure.gravatar.com/avatar/0828c899dcc84c7b50ac44b5a154b10c?d=identicon&s=28",
            "thumbnail": "https://secure.gravatar.com/avatar/0828c899dcc84c7b50ac44b5a154b10c?d=identicon&s=80"
          }
        },
        "created_on": "2017-04-13T03:12:39Z",
        "is_active": true,
        "is_org_admin": true
      }
    });

    it('checks org membership', () => {
      expect(org.currentMember.user.username).toBe('lekosfmi');
      expect(org.currentMember.isActive).toBe(true);
      expect(org.currentMember.isOrgAdmin).toBe(true);
      expect(org.currentMember.createdOn.getFullYear()).toBe(2017);
    });

    it('checks org counts', () => {
      expect(org.counts.datablocks).toBe(36);
      expect(org.counts.networks).toBe(0);
    });
  });

  describe('Org Members', () => {
    let org: Org = new Org({
      name: 'My New Org'
    });

    let pendingInvites: Array<Invitation> = [];
    let pendingInvite1: Invitation = new Invitation({
      "email": "david@gmail.com",
      "sent_on": "2018-01-31T02:45:59Z",
      "sent_by": "lekosfmi"
    });

    let pendingInvite2: Invitation = new Invitation({
      "email": "tallis@gmail.com",
      "sent_on": "2018-01-31T02:45:59Z",
      "sent_by": "andrew"
    });

    pendingInvites.push(pendingInvite1);
    pendingInvites.push(pendingInvite2);

    org.addPendingInvites(pendingInvites);

    it('checks org has pending invites', () => {
      expect(org.pendingInvites.length).toBe(2);
    });

    it('checks org can get member', () => {
      expect(org.getPendingInvite('david@gmail.com')).toBe(pendingInvite1);
    });
  });

  describe('Org Template', () => {

    it('checks basic model ', () => {
      let org: Org = new Org({
        name: 'My New Org',
        ot: {
          "id": 1,
          "name": "Default Template",
          "slug": "default-template-v1-0-0",
          "version": "v1.0.0",
          "extra_data": {
            "web": {
              "orgTemplateSlug": "default"
            }
          },
          "created_on": "2018-01-31T01:18:30Z"
        }
      });

      expect(org.orgTemplate.name).toBe('Default Template');
    })
  });
});

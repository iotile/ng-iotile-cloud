'use strict';

import { User } from '../../src/models/user';

describe('UserTest', () => {

  it('check user fields', () => {
    let user: User = new User({
      username: 'test1',
      email: 'test1@example.com',
      name: 'Test One',
      is_staff: false,
      tagline: 'hello world',
      created_at: 1517371542246
    });
    expect(user.getFullName()).toEqual('Test One');
    expect(user.getUsername()).toEqual('@test1');
    expect(user.getAvatar()).toEqual('');
    expect(user.isStaff).toBeFalsy();
    expect(user.creationDate.getFullYear()).toBe(2018);
    expect(user.tagline).toEqual('hello world');
  });

  it('check user without', () => {
    let user: User = new User({
      username: 'test1',
      email: 'test1@example.com',
      name: 'Test One',
      is_staff: false,
      tagline: ''
    });

    expect(user.tagline).toEqual('');
    expect('creationDate' in user).toBeFalsy();
  });
});

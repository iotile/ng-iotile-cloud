'use strict';

import { Credentials } from '../../iotile/models/credentials';

describe('CredentialsTest', () => {

  it('get credentials payload', () => {
    let cred: Credentials = new Credentials('joe', 'joe.123');
    expect(cred.getPayload()).toEqual({
        username: 'joe',
        password: 'joe.123'
    });
  });

  it('check credentials token', () => {
    let cred: Credentials = new Credentials('joe', 'joe.123');
    cred.setToken('1234567890');
    expect(cred.getToken()).toEqual('1234567890');
    cred.clearToken();
    expect(cred.getToken()).toBe(null);
  });
});

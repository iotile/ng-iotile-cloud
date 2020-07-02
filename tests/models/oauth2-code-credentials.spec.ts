'use strict';

import { OAuth2CodeCredentials } from '../../src/models/oauth2-code-credentials';

describe('OAuth2CodeCredentialsTest', () => {
    
  it('get credentials payload', () => {
    const cred = new OAuth2CodeCredentials('abcd');
    expect(cred.getPayload()).toEqual({
      code: 'abcd'
    });
  });

  it('check credentials token', () => {
    const cred = new OAuth2CodeCredentials('abcd');
    cred.setToken('1234567890');
    expect(cred.getToken()).toEqual('1234567890');
    cred.clearToken();
    expect(cred.getToken()).toBe('');
  });
});

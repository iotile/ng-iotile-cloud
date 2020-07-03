'use strict';

import { OAuth2CodeCredentials } from '../../src/models/oauth2-code-credentials';

describe('OAuth2CodeCredentialsTest', () => {
    
  it('get credentials payload', () => {
    const cred = new OAuth2CodeCredentials('abcd', '/auth/okta/login');
    expect(cred.getPayload()).toEqual({
      code: 'abcd'
    });
  });

  it('check credentials token', () => {
    const cred = new OAuth2CodeCredentials('abcd', '/auth/okta/login');
    cred.setToken('1234567890');
    expect(cred.getToken()).toEqual('1234567890');
    cred.clearToken();
    expect(cred.getToken()).toBe('');
  });

  it('check credentials loginURL', () => {
    let cred = new OAuth2CodeCredentials('abcd', '/auth/okta/login');
    expect(cred.loginURL).toEqual('/auth/okta/login')
    cred = new OAuth2CodeCredentials('abcd', '/api/v1/auth/okta/login');
    expect(cred.loginURL).toEqual('/auth/okta/login')
  })
});

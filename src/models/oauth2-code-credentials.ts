
export class OAuth2CodeCredentials {
  public code: string;
  public loginURL: string;
  private token: string;

  constructor (code: string, loginURL: string) {
    this.code = code;
    if (loginURL.includes("api/v1")) {
      this.loginURL = loginURL.slice(7);
    } else {
      this.loginURL = loginURL;
    }
  }

  public getPayload(): {} {
    return {
      code: this.code
    };
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public getToken(): string {
    return this.token;
  }

  public clearToken(): void {
    this.token = '';
  }
}

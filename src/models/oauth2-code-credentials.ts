
export class OAuth2CodeCredentials {
  public code: string;
  private token: string;

  constructor (code: string) {
    this.code = code;
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

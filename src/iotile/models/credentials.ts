
export class Credentials {
  public username: string;
  public password: string;
  private token: string;

  constructor (
    username: string,
    password: string
  ) {
      this.username = username;
      this.password = password;
  }

  public getPayload(): {} {
    return {
      username: this.username,
      password: this.password
    };
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public getToken(): string {
    return this.token;
  }

  public clearToken(): void {
      this.token = null;
  }
}

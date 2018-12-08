
export class SessionVM {
  token: string;
  username: string;

  constructor(token: string, account: string) {
    this.token = token
    this.username = account;
  }

  updateToken(newToken: string) {
    this.token = newToken;
  }
}

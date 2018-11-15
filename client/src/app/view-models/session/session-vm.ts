
export class SessionVM {
  token: string;
  fullname: string;
  username: string;

  constructor(token: string, fullname: string, account: string) {
    this.token = token
    this.fullname = fullname;
    this.username = account;
  }

  updateToken(newToken: string) {
    this.token = newToken;
  }
}

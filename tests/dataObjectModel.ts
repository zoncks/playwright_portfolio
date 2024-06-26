export class DataModel {
  readonly userName: string;
  readonly password: string;
  readonly incorrectPassword: string;

  constructor(page) {
    this.userName = "standard_user";
    this.password = "secret_sauce";
    this.incorrectPassword = "incorrect_password";
  }
}

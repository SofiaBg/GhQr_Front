import{ Injectable } from'@angular/core';

@Injectable()
export class CommonUserService {
  public userId;

  constructor() {}

  setUserLoggedIn(Id) {
    this.userId = Id;
    console.log(this.userId);
  }

  getUserLoggedIn() {
    console.log(this.userId);
    return this.userId;
  }

}

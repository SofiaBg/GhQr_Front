import { Person } from "./Person";
import { SubUser } from "./sub-user";

export class RegisterUser {
    phoneNumber :string ;
    userName : string;
    accountNumber :string ;
    businessCertNumber :string ;
    branch :string ;
    dateOf :string ;
    userPassword :string ;
    userCofirmPassword : string;
    subUsers:SubUser[]=[];
}

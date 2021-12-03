
export class RegistrationMerchant{
  public  username:String;
  public  password:String;
  public  repassword:String;
  public  firstName:String;
  public  lastName:String;
  public  email:String;
  public   banque:number;
  public  phone:String;
  public  companyName:String;
  public  website:String;
  public  garantie:number;
  public  tin:String;
  public  registrationNumber:String;
  public  apiUrl:String;
  public  signature:String;
  public  accountMerchant:string;

  

  constructor(
    username:String,
   password:String,
        repassword:String,
       firstName:String,
        lastName:String,
        email:String,
         banque:number,
        phone:String,
        companyName:String,
        website:String,
        garantie:number,
        tin:String,
        registrationNumber:String,
    apiUrl:String,
    signature:String


  ){

  }
  
  public  dataString() {
    return this.username.toString().concat(this.password.toString())
    }
   

}



import {Injectable} from '@angular/core';
@Injectable()
export class Secure{
  public  secure:String;

  constructor(){}

  public  getSecure():String{
    return this.secure
  }
  public  setSecure(secure :String){
    return this.secure=secure;
  }
  }



import { DATE_PIPE_DEFAULT_OPTIONS } from "@angular/common";
import { CreditCardModel } from "./credit-card.model";

export interface IUserModel {
    id:string;
    sysName: string;
    password: string;
    name: string;
    email:string;
    //!!! tokef in format DD/YY
    tokef:string;
    
    token : string ;

}
export class UserModel implements IUserModel {
    id:string='0';//id - teudat zehut
    sysName: string = '';
    password: string='';
    name: string = '';
    email:string='';
    passport:string = '';

    //!!! tokef in format DD/YY
  //  tokef:string = '';
    
    private _tokef : string = '';
    public get tokef() : string {
        return this._tokef;
    }
    public set tokef(v : string) {
        this._tokef = v;
        this._IsCardValid = this.testTokef(this._tokef);
    }
    
    //!!! Token have been received after server authorization 
    token: string='';
    constructor(data:any | undefined = undefined){
        if(data){
            this.id = ('' + data.passport);
            this.sysName = ('' + data.sysName).toLowerCase();
            this.passport = '' + data.passport ;
            this.password = '' + data.password ;
            this.email = '' + data.email ;
            this.name=data?.name ?? 
                ('' + data.firstName + ' ' + data.lastName).trim();
            this.token = '' + data.token ;
            this.tokef = '' + data.tokef  ;
                     
        }
        
    }
    get IsAuthorized() {return this.token.length >= 2};
    private _IsCardValid: boolean = false;

    get IsCardValid() { return this._IsCardValid;}

      
    get IsAdmin() {return this.sysName === 'admin' };
    public testTokef(tokef:string){
        
      
        if(tokef.length !== 5 && tokef[2] !== '/' ) return true;
        let arr = tokef.split('/');
        if(arr.length < 2) return true;
        let month = +(arr[0].toString());
                month--;
        if(month < 0 || month > 11) return true;
                    
        let year = +(arr[1].toString()) % 100;
            year = (year + 2000);
        const d:Date = new Date();
        
        return year <= d.getFullYear() && month <= d.getMonth();
 
       
    };

}
export class WideUserModel extends  UserModel{
    firstName: string='';
    lastName: string = '';
    phone: string = '';
    address:string='';
    ravkav:string = '';

    //!!! tokef in format DD/YY
  //  tokef:string = '';
    constructor(data:any | undefined = undefined){
        super(data);

        if(data){
            
            this.firstName = '' + data.firstName;
            this.lastName = '' + data.lastName ;
            this.address = '' + data.address ;
            this.phone = '' + data.phone ;
            this.ravkav = '' + data.ravkav  ;
                     
        }
        
    }

}



// export interface IUserNet{
//     user?:UserModel;
//     authorized: boolean;
//   }
  
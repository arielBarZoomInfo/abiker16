import { DATE_PIPE_DEFAULT_OPTIONS } from "@angular/common";
import { CreditCardModel } from "./credit-card.model";

export interface IUserModel {
    //id:string;
    sysname: string;
    password: string;
    name: string;
    email:string;
    phone:string;
  
    //!!! tokef in format DD/YY
    tokef:string;
    
    token : string ;
    updated:number;
   // get isNew():boolean;

}
export class UserModel implements IUserModel {
   // id:string='0';//id - teudat zehut
    sysname: string = '';
    password: string='';
    name: string = '';
    email:string='';
    phone:string='';
    passport:string = '';
    updated:number = 0; //utc get from server only - otherwise new document
//#region 
    get isNew():boolean {return this.updated == 0}
    //!!! tokef in format DD/YY
  //  tokef:string = '';
    tokef : string = '';
    
    // private _tokef : string = '';
    // public get tokef() : string {
    //     return this._tokef;
    // }
    // public set tokef(v : string) {
        
        
    //     this._IsCardValid = this.testTokef(v);
    //     this._tokef = this._IsCardValid ? v : '';
    // }
//#endregion
    
    //!!! Token have been received after server authorization 
    token: string='';
    constructor(data:any | undefined = undefined){
        
        if(data){
            //this.id = ('' + data.passport);
            this.sysname = (data.sysname ?? '').toLowerCase();
            this.passport = data.passport ?? '';
            this.password = data.password ?? '';
            this.email = data?.email ?? '';
            this.phone = data?.phone ?? '';
            this.name=data?.name ?? 
                ('' + data.firstName + ' ' + data.lastName).trim();
            this.token =  data.token ?? '';
            this.tokef = data.tokef ?? '' ;
            this.updated = data?.updated ?? 0;
            // let sdate = data.date?.toString() ?? '';// input string
            //  if(sdate.length >= 8)
            //     this.updated = sdate ;
            // else
            //     this.updated = this.Now;
                     
        }
        
    }
    // get Now():string{
    //     const d = new Date();
    //     return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDay()} `+
    //     `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    
    // }
    get IsAuthorized() {return this.token.length >= 2};
   // private _IsCardValid: boolean = false;

    get IsCardValid() { return this.testTokef(this.tokef);}

      
    get IsAdmin() {return this.sysname === 'admin' };
    public testTokef(tokef:string){
        
      
        if(tokef.length !== 5 && tokef[2] !== '/' ) return false;
        let arr = tokef.split('/');
        if(arr.length < 2) return false;
        let month = +(arr[0].toString());
                month--;
        if(month < 0 || month > 11) return false;
                    
        let year = +(arr[1].toString()) % 100;
            year = (year + 2000);
        const d:Date = new Date();
        
        return year <= d.getFullYear() && month <= d.getMonth();
 
       
    };

    // toJson() : string{
    //     return JSON.stringify(this as IUserModel);
    // }
    // static fromJson(json : string) : UserModel | undefined{
    //     if(json && json.length >= 2) {
    //         try {
    //             const iuser =  JSON.parse(json) as IUserModel;
    //             if(iuser){
    //                 return new UserModel(iuser);
    //             }
                
    //         } catch (error) {
                
    //         }
            
    //     }
    //     return undefined;

    // }

}
export class WideUserModel extends  UserModel{
    firstName: string='';
    lastName: string = '';
  //  phone: string = '';
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
  
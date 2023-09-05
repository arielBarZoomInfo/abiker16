
import { HttpClient } from '@angular/common/http';
import { ReadPropExpr, ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { UserModel, WideUserModel } from '@app/_models';
import { environment as env, environment} from '@environments/environment';
import { lastValueFrom } from 'rxjs';
const IS_MOCK = true;
const  GMapUsers = new Map<string,UserModel>();
const STORE_PREFIX = "NetService-APosholTy"
const STORE_MAP  = STORE_PREFIX + '+map';
@Injectable({
  providedIn: 'root'
})

export class NetService {
   public readonly mapUsers =  GMapUsers;
 
  
  private _User : UserModel | undefined;
  public get UserModel() : UserModel | undefined{
    return this._User;
  }
  // public set UserModel(v : UserModel| undefined) {
  //   this._User = v;
  // }
  

  constructor(
  //  private router: Router,
    private http: HttpClient
  ) { 

  }

  async getRandomUser$(){
   
    const req = this.http.get(env.apiRandomUser);
    let    response:any = await lastValueFrom(req);
    let  data:any = {}
    let r = response.results[0];
  
      data.firstName = r.name.first ;
      data.lastName = r.name.last;
      data.sysname = r.login.username;
      data.password = r.login.password;
      data.passport = '999999998';
      data.email = r.email;
      data.phone = r.phone.replace(/\D/g, '');
      let address =  ' ' + r.location.street.name;
      address += ' ' + r.location.street.number;
      address += ' ' + r.location.city;
      address += ' ' + r.location.country;
      address += ' ' + r.location.postcode;
  
      data.address = address;
     // model.ravkav = '';
    let ret = new WideUserModel(data);
    return ret;
     
  
  }

  // async getNewId() : Promise<string>{
  //   const arr = [...this.mapUsers.keys()].map(k => +k);
  //   const max = arr.length > 0? Math.max(...arr) + 1 : 1;//Important

  //   return max.toString();//.

  // }
  // async saveMUsers(){
    
  //   const json =  JSON.stringify(Object.fromEntries(this.mapUsers));
  //   //TBD save User Map
  //   localStorage.setItem(STORE_MAP ,json );
  //    // const map1 = new Map(Object.entries(JSON.parse(this.json)));
  //  }
  clearMap(){
        this.mapUsers.clear();

       
      

  }

  async saveUsers$(){
    const arrUsers = [...this.mapUsers.values()] ?? [];
    const arr1  = Object.fromEntries(this.mapUsers);
    console.log(arr1);
    
    const json =  JSON.stringify(arrUsers);
    //TBD save User Map
    localStorage.setItem(STORE_MAP ,json );
    // const map1 = new Map(Object.entries(JSON.parse(this.json)));
  }

  async saveUser$(user:UserModel):Promise<boolean>{
    //const arrUsers = [...this.mapUsers.values()] ?? [];
    let ft = this.mapUsers.has(user.sysname);
    this.mapUsers.set(user.sysname,user);
    await this.saveUsers$();
    
    return ft;
  
   
  }

  async exportUsers$(){
    const arrUsers = [...this.mapUsers.values()] ?? [];
    try {
      const req = this.http.post<UserModel[]>
      (`${environment.apiUrl}/api/users/export`, arrUsers);
  
    } catch (error) {
      console.log(error)
    }

      

  }
  
  async retrieveUsers$ (): Promise<UserModel[]>{
    try {
      const arrUsersStr = localStorage.getItem(STORE_MAP) ?? '[]';
      const arrUsers: UserModel[] =  JSON.parse(arrUsersStr) ?? [];
      return arrUsers;
      
    } catch (error) {
      console.error(error);
    }
    return [];
  
   // const map1 = new Map(Object.entries(JSON.parse(this.json)));
  }



  getUser(sysname: string):  UserModel | undefined{
    return this.mapUsers.get(sysname);
  }

  // async netLogin$(sysname: string, password: string):Promise<IUserNet>
  // {
  //    try {
  //     let user: UserModel | undefined;
  //     if(IS_MOCK){
  //       user = this.mapUsers.get(sysname);
   
  //     } else {
  //       const req = this.http.post<UserModel>(`${environment.apiUrl}/users/authenticate`, { sysname, password });
  //       user = await lastValueFrom(req);
    
  //     }

  //     if(user){
  //       if(user.password == password){
  //         this.mapUsers.set(sysname,user);
  //         await this.saveMap();
  //         return {user:user,error:undefined};
  //       } else {
  //         return {user:user,error:new Error('password isn\'t match')}
  //       }
  //     }
  //     else {
  //       return {user:undefined,error:new Error('user name isn\'t found')}
  //     }
      
  //    } catch (error) {
     
  //     return {user:undefined,error:new Error(error?.toString())};
  //    }
  // }

  // async netRegister(user: UserModel): Promise<IUserNet>
  // {
  //    try {
  //     if(!!user){
  //       if(!user.id){
  //         user.id = await this.getNewId();
  //       }
  //       if(!IS_MOCK){
  //         // const req =  this.http.post(`${environment.apiUrl}/users/register`, user);
  //         // await lastValueFrom(req);

  //         //TO SQL save user
    
  //       }
  //       if( user.sysname){
  //         this.mapUsers.set( user.sysname,user);
  //         //await this.saveMap();
  
  //       }
  //     }
         
  //     return {user:user,error:undefined};
      
  //    } catch (error) {
     
  //     return {user:undefined,error:new Error(error?.toString())};
  //    }
  // }

  // async updateCreditCard(sysname: string, creditCard: CreditCardModel): Promise<IUserNet> {
    
  //   if(IS_MOCK){
  //     const user =  this.getBySysName(sysname);
  //       if(!!user ){
  //         user.creditCard = {...creditCard};
  //         if(user.sysname){
  //           this.mapUsers.set(user.sysname,user );
  //           this.saveMap()
  //         }
           
  //       }
     
      
  //       return {user:user };
  //     }
  //     return {};
  // }


    // return this.http.put(`${environment.apiUrl}/users/credit/${id}`, creditCard)
    //     .pipe(map(x => {
    //         // update stored user if the logged in user updated their own record
    //         if (id == this.userValue?.id) {
    //             // update local storage
    //             const user = { ...this.userValue};
    //             user.creditCard = {...creditCard };
    //             localStorage.setItem('user', JSON.stringify(user));

    //             // publish updated user to subscribers
    //             this.userSubject$.next(user);
    //         }
    //         return x;
    //     }));
  //}

  // async netUpdate(user: UserModel): Promise<IUserNet>
  // {
  //   let user1 = user;
  //    try {
  //     if(!!user){
  //       if(!user.id){
  //         user.id = await this.getNewId();
  //         user1 = user;
  //       }
  //       if(!IS_MOCK){
  //         const req =  this.http.post<UserModel>(`${environment.apiUrl}/users/register`, user);
  //         user1 = await lastValueFrom(req);
    
  //       }
  //       if( user1.sysname){
  //         this.mapUsers.set( user1.sysname,user1);
  //         await this.saveMap();
  
  //       }
  //     }
         
  //     return {user:user1,error:undefined};
      
  //    } catch (error) {
     
  //     return {user:undefined,error:new Error(error?.toString())};
  //    }
  // }


  // async netGetAll(): Promise<UserModel[]> {
  //   if(IS_MOCK){
  //       const arr = [...this.mapUsers.values()]
      
  //       return arr;
  //   } else {

  //     const req = this.http.get<UserModel[]>(`${environment.apiUrl}/users`)
  //     return await  lastValueFrom(req);
  //   }
  // }
    
  // async getById(id: string): Promise<IUserNet> {
  //   if(IS_MOCK){
  //       const val = [...this.mapUsers.values()].find(u=>u.id === id);
      
  //       return  {user:val,error:undefined};
  //   }
  //   try {
  //     const user = await lastValueFrom(this.http.get<UserModel>(`${environment.apiUrl}/users/${id}`));  
  //     return  {user:user,error:undefined};
  //   } catch (error) {
  //     return {user:undefined,error:new Error(error?.toString())};
  //   }
   
  // }


}


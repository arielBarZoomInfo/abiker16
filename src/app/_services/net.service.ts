import { HttpClient } from '@angular/common/http';
import { ReadPropExpr } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CreditCardModel, UserModel } from '@app/_models';
import { environment } from '@environments/environment';
import { lastValueFrom } from 'rxjs';
const IS_MOCK = true;;
export interface IUserNet{
  user?:UserModel;
  error?: Error;
}

@Injectable({
  providedIn: 'root'
})
export class NetService {
  readonly mapUsers = new Map<string,UserModel>();
  readonly storePrefix = "NetService-APosholTy"
  readonly storeMap = this.storePrefix + '+map';
  readonly storeUser = this.storePrefix + '+user';

  
  private _User : UserModel | undefined;
  public get UserModel() : UserModel | undefined{
    return this._User;
  }
  // public set UserModel(v : UserModel| undefined) {
  //   this._User = v;
  // }
  

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  async getNewId() : Promise<string>{
    const arr = [...this.mapUsers.keys()].map(k => +k);
    const max = arr.length > 0? Math.max(...arr) + 1 : 1;//Important

    return max.toString();//.

  }
  async saveMap(){
    
   const json =  JSON.stringify(Object.fromEntries(this.mapUsers));
   localStorage.setItem(this.storeMap ,json );
    // const map1 = new Map(Object.entries(JSON.parse(this.json)));
  }
  _getById(id:string){
    return [...this.mapUsers.values()].find(u=>u.id == id);
  }

  findUserInMap(userName: string):  UserModel | undefined{
    return this.mapUsers.get(userName);
  }

  async netLogin$(userName: string, password: string):Promise<IUserNet>
  {
     try {
      let user: UserModel | undefined;
      if(IS_MOCK){
        user = this.mapUsers.get(userName);
   
      } else {
        const req = this.http.post<UserModel>(`${environment.apiUrl}/users/authenticate`, { userName, password });
        user = await lastValueFrom(req);
    
      }

      if(user){
        if(user.password == password){
          this.mapUsers.set(userName,user);
          await this.saveMap();
          return {user:user,error:undefined};
        } else {
          return {user:user,error:new Error('password isn\'t match')}
        }
      }
      else {
        return {user:undefined,error:new Error('user name isn\'t found')}
      }
      
     } catch (error) {
     
      return {user:undefined,error:new Error(error?.toString())};
     }
  }

  async netRegister(user: UserModel): Promise<IUserNet>
  {
     try {
      if(!!user){
        if(!user.id){
          user.id = await this.getNewId();
        }
        if(!IS_MOCK){
          const req =  this.http.post(`${environment.apiUrl}/users/register`, user);
          await lastValueFrom(req);
    
        }
        if( user.userName){
          this.mapUsers.set( user.userName,user);
          await this.saveMap();
  
        }
      }
         
      return {user:user,error:undefined};
      
     } catch (error) {
     
      return {user:undefined,error:new Error(error?.toString())};
     }
  }
  async updateCreditCard(id: string, creditCard: CreditCardModel): Promise<IUserNet> {
    
    if(IS_MOCK){
      const user =  this._getById(id);
        if(!!user ){
          user.creditCard = {...creditCard};
          if(user.userName){
            this.mapUsers.set(user.userName,user );
            this.saveMap()
          }
           
        }
     
      
        return {user:user };
      }
      return {};
  }


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

  async netUpdate(user: UserModel): Promise<IUserNet>
  {
    let user1 = user;
     try {
      if(!!user){
        if(!user.id){
          user.id = await this.getNewId();
          user1 = user;
        }
        if(!IS_MOCK){
          const req =  this.http.post<UserModel>(`${environment.apiUrl}/users/register`, user);
          user1 = await lastValueFrom(req);
    
        }
        if( user1.userName){
          this.mapUsers.set( user1.userName,user1);
          await this.saveMap();
  
        }
      }
         
      return {user:user1,error:undefined};
      
     } catch (error) {
     
      return {user:undefined,error:new Error(error?.toString())};
     }
  }


  async netGetAll(): Promise<UserModel[]> {
    if(IS_MOCK){
        const arr = [...this.mapUsers.values()]
      
        return arr;
    } else {

      const req = this.http.get<UserModel[]>(`${environment.apiUrl}/users`)
      return await  lastValueFrom(req);
    }
  }
    
  async getById(id: string): Promise<IUserNet> {
    if(IS_MOCK){
        const val = [...this.mapUsers.values()].find(u=>u.id === id);
      
        return  {user:val,error:undefined};
    }
    try {
      const user = await lastValueFrom(this.http.get<UserModel>(`${environment.apiUrl}/users/${id}`));  
      return  {user:user,error:undefined};
    } catch (error) {
      return {user:undefined,error:new Error(error?.toString())};
    }
   
  }


}

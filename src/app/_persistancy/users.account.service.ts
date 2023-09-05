import { Injectable } from '@angular/core';
//import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, lastValueFrom, retry } from 'rxjs';
//import { last, map } from 'rxjs/operators';

import { IUserModel, UserModel } from '@app/_models';
import { epg as E} from '@app/_interfaces/interfaces';
import { FirebaseService } from './firebase.service';
import { ILogin } from './persistency.interface';

export const USER_STORAGE_KEY = 'abiker16-registration-login-user';
//Global Variables for read from anonher sites
export var GPage: E = E.eSelectLang;//!!!

export var GUser: UserModel | undefined = undefined;


export const GIUserAdmin :UserModel = new UserModel({
    sysname: 'admin',
    password: '1111',
    name: 'admin bikebox',
    email:'admin@nowhere.com',
    phone: '111111111',
    //!!! tokef in format DD/YY
    tokef:'10/30',
    //!!! Token have been received after server authorization 
    token: 'OK',

 });



@Injectable({ providedIn: 'root' })
export class UsersAccountService {
 
   private readonly mapUsers: Map<string,UserModel> = 
    new Map<string,UserModel>();
   
  
    public get epg() : E {
        return GPage;
    }
      
       
    
    epg$: BehaviorSubject<E> = new BehaviorSubject<E>(GPage);
    public get userValue(){return this.user$.value;}
  
   
    public user$: BehaviorSubject<UserModel | undefined> = new BehaviorSubject(GUser);
   // public user$: Observable<UserModel | null> = null;

    constructor(
        //private router: Router,
      //  private http: HttpClient,
        //private net: NetService,
        private pers: FirebaseService
    ) {
          // this.mapUsers! = this.net.mapUsers;

       // const user = localStorage.getItem(USER_STORAGE_KEY);
       
          //this.user$ = this.user$.asObservable();
      

    }

    async open$(){
        const ft = this.pers.open();
       
    }
    
    get NewUser() {return GUser = new UserModel();}

    async hasUser$(sysname: string): Promise<boolean> {
        const iuser   = await this.pers.getUser$(sysname) ;
        GUser = (!!iuser ? new UserModel(iuser) : undefined);
        if(iuser){
            this.mapUsers.set(iuser.sysname.toLowerCase(),iuser);
        }
      
        return !!GUser;
    }
    async getUser$(sysname: string): Promise<UserModel | undefined> {
        const user = GUser  = await this.pers.getUser$(sysname) ;
      
        if(user){
            this.mapUsers.set(user.sysname.toLowerCase(),user);
        }
          
        return user;
    
    }
  

    async login$(sysname: string, password: string): Promise<ILogin> {
        const user = GUser = await this.pers.getUser$(sysname) ;
        const hasUser: boolean = !!user;
      
        
        const authUser: boolean = user?.password === password;
///!!! Test Cared
        return {hasUser,authUser,isCard:false};
    }

    async listUsers$(): Promise<UserModel[]> {
        const list =  await this.pers.listUsers$();
        this.clearMap();
        list.forEach(user=>{
            if(user.sysname.length > 0){
                this.mapUsers.set(user.sysname.toLowerCase(),user);
            }
        });
        return list;
    }
    async deleteUser$(sysname: string): Promise<UserModel[]> {
        const ft =  await this.pers.deleteUser$(sysname);
        if(ft && this.mapUsers.has(sysname)){
            this.mapUsers.delete(sysname)

        }
      
        return [...this.mapUsers.values()];
    }
    
    async saveUser$(user:UserModel, persist:boolean) {
        user.sysname = user.sysname.toLowerCase();
        if(persist){
            await this.pers.setUser$(user);
        }
       
        this.user$.next(GUser = user);
   
    }

    clearMap(){
        this.mapUsers.clear();

       
        //  if(GIUserAdmin){
        //     const userAdmin = new UserModel(GIUserAdmin);
        //     this.mapUsers.set(userAdmin.sysname,userAdmin);

        // }

    }
//#region PERSIST
//     async retrieveUsers$() {
//    //     this.clearMap();
//         try {
            
//             // const _users:UserModel[]  = await lastValueFrom(
//             //     this.http.get<UserModel[]>(environment.fileUsers, { responseType:'json' }));
//             const _users:UserModel[]  = await this.pers.listUsers$();
    
//             _users.forEach(u=>{
//                 if(u.sysname.length > 0){
//                     const user = new UserModel(u);
//                     this.mapUsers.set(user.sysname.toLowerCase(),user);
//                 }
                
//             });
        

        
//         return [...this.mapUsers.values()];
            
//         } catch (error) {
//             console.error('retrieveUsers$'+error);
//         } 
//        return [];
//     }



  
//#endregion

 //#region PAGES
    
    toPage(e:E){
        if(GPage != e){
           GPage = e;
           this.epg$.next(e);
    
        }
   
    }
    async gotoRegistrate$() {
        if(true || GPage === E.eSelectLang || GPage === E.eLogin){
            this.toPage(E.eRegistrate);
        }
       //  this.eFsm$.next(E.eRegistrate);
    }
    async gotoLogin$() {
        if(true || GPage === E.eSelectLang ){
            this.toPage(E.eLogin);
        }
       //  this.eFsm$.next(E.eRegistrate);
    }
    async gotoCreditCard$() {
        if(true || GPage === E.eRegistrate || GPage === E.eLogin){
            this.toPage(E.eCredirCard);

        }
    }

    async gotoExit$() {
       // await this.gotoExit$();
        this.toPage(E.eSelectLang);
        
    }
    //#endregion

//#region API



    //
    // private getUserFromMAp(sysname: string):UserModel | undefined {
       
    //     const _user =(sysname !== 'admin') ?
    //         this.mapUsers.get(sysname) :
    //         new UserModel(GIUserAdmin);
    //     return _user;
    // }

    
 

   
    // async gotoExit$(){
    //     // remove user from local storage and set current user to null
    //     //localStorage.removeItem(USER_STORAGE_KEY);
    //     if(!!GUser){
    //         GUser.token = ''; 
    //     }
     
    //     this.user$.next(GUser = undefined);
    //    // this.router.navigate(['/account/login']);
    // }



    // async getById$(id: number):Promise<UserModel | undefined> {
    //     const ret = [...this.mapUsers.values()].find(u=>+u.id === id);
    //     return ret;
    // }
   

//#endregion
}

    // async retrieveWideUser$(fromNet:boolean) {
    //      if(!fromNet){
    //         let model:any = {};
            
 
    //         model.firstName='Avi' ;
    //         model.lastName = 'Cohen';
    //         model.sysname = 'avi1cohen';
    //         model.password = '11111111';
    //         model.passport = '999999998';
    //         model.email = 'avi1cohen@gmail.com';
    //         model.phone = '05451111111';
    //         model.address = 'Hahistadrut 1/1 Petah Tikva  , Israel';
    //         model.ravkav = '111';
    //         model.imagreeTerms = true;
    //         model.imagreePolicy = true;
    //         let wideUser: WideUserModel = new WideUserModel(model);
    //
    //         return wideUser;


    //     } else {
    //         try {
    //             const  wideUser: WideUserModel = await this.net.getRandomUser$()
    //             return wideUser;
                 
    //         } catch (error) {
    //             console.error(error);
    //             return undefined;
                
    //         }
      
    //     }
    // // this.clearMap();
    //     // try {
    //     //     debugger;
    //     //     const _users:UserModel[]  = await lastValueFrom(
    //     //             this.http.get<UserModel[]>(environment.fileUsers, { responseType:'json' }));
        
    //     //     _users.forEach(u=>{
    //     //         if(u.sysname.length > 0){
    //     //             this.mapUsers.set(u.sysname.toLowerCase(),u );
    //     //         }
                
    //     //     });
        

    //     // console.log(_users)
            
    //     // } catch (error) {
    //     //     console.error('retrieveUsers$'+error);
    //     // }  
    // }
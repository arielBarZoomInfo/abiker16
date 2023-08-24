import { Injectable } from '@angular/core';
//import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, lastValueFrom, retry } from 'rxjs';
//import { last, map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { IUserModel, UserModel, WideUserModel } from '@app/_models';
import { epg as E} from '@app/_interfaces/interfaces';
import { NetService } from './net.service';
export const USER_STORAGE_KEY = 'abiker16-registration-login-user';
//Global Variables for read from anonher sites
export var GPage: E = E.eSelectLang;//!!!
export var GUser: UserModel | undefined = undefined;
export const GIUserAdmin :IUserModel = {
    id:'999999998',
    sysName: 'admin',
    password: '1111',
    name: 'admin bikebox',
    email:'admin@nowhere.com',
    //!!! tokef in format DD/YY
    tokef:'10/30',
    //!!! Token have been received after server authorization 
    token: 'OK',

 };



@Injectable({ providedIn: 'root' })
export class UsersAccountService {
 
   private readonly mapUsers: Map<string,UserModel> = 
    new Map<string,UserModel>();
   
  
    public get epg() : E {
        return GPage;
    }
      
       
    
    epg$: BehaviorSubject<E> = new BehaviorSubject<E>(GPage);
  
   
    public user$: BehaviorSubject<UserModel | undefined> = new BehaviorSubject(GUser);
   // public user$: Observable<UserModel | null> = null;

    constructor(
        //private router: Router,
        private http: HttpClient,
        private net: NetService
    ) {
       // const user = localStorage.getItem(USER_STORAGE_KEY);
       
           // this.user$ = this.user$.asObservable();
      

    }

    clearMap(){
        this.mapUsers.clear();

       
         if(GIUserAdmin){
            const userAdmin = new UserModel(GIUserAdmin);
            this.mapUsers.set(userAdmin.sysName,userAdmin);

        }

    }
//#region PERSIST
    async retrieveUsers$() {
        this.clearMap();
        try {
            debugger;
            const _users:UserModel[]  = await lastValueFrom(
                    this.http.get<UserModel[]>(environment.fileUsers, { responseType:'json' }));
        
            _users.forEach(u=>{
                if(u.sysName.length > 0){
                    this.mapUsers.set(u.sysName.toLowerCase(),u );
                }
                
            });
        

        console.log(_users)
            
        } catch (error) {
            console.error('retrieveUsers$'+error);
        }  
    }

    async retrieveWideUser$(fromNet:boolean) {
         if(!fromNet){
            let model:any = {};
            
 
            model.firstName='Avi' ;
            model.lastName = 'Cohen';
            model.sysName = 'avi1cohen';
            model.password = '11111111';
            model.passport = '999999998';
            model.email = 'avi1cohen@gmail.com';
            model.phone = '05451111111';
            model.address = 'Hahistadrut 1/1 Petah Tikva  , Israel';
            model.ravkav = '111';
            model.imagreeTerms = true;
            model.imagreePolicy = true;
            let wideUser: WideUserModel = new WideUserModel(model);
            this.saveUser$(wideUser);
            return wideUser;


        } else {
            try {
                const  wideUser: WideUserModel = await this.net.getRandomUser$()
                return wideUser;
                 
            } catch (error) {
                console.error(error);
                return undefined;
                
            }
      
        }
    // this.clearMap();
        // try {
        //     debugger;
        //     const _users:UserModel[]  = await lastValueFrom(
        //             this.http.get<UserModel[]>(environment.fileUsers, { responseType:'json' }));
        
        //     _users.forEach(u=>{
        //         if(u.sysName.length > 0){
        //             this.mapUsers.set(u.sysName.toLowerCase(),u );
        //         }
                
        //     });
        

        // console.log(_users)
            
        // } catch (error) {
        //     console.error('retrieveUsers$'+error);
        // }  
    }

    async saveUsers$() {
        const _users:UserModel[]  = [...this.mapUsers.values()];
        const _json = JSON.stringify(_users);

     
        try {
            const nav = (window.navigator as any);
              
            const blob = new Blob([_json], {type: 'text'});

            if(nav.msSaveOrOpenBlob) {
                (window.navigator as any).msSaveBlob(blob, environment.fileUsers);
            }
            else{
                const elem = window.document.createElement('a');
                elem.href = window.URL.createObjectURL(blob);
                elem.download = environment.fileUsers;        
                document.body.appendChild(elem);
                elem.click();        
                document.body.removeChild(elem);
            }
           

           console.log(_users)
            
        } catch (error) {
            console.error(error);
        }  
    }
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
    async gotoCreditCard$(user: UserModel) {
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

    public get userValue() {
        return GUser;
    }

    //
    public getUser(sysName: string):UserModel | undefined {
        
        const _user = this.mapUsers.get(sysName) ;
        return _user;
    }

    async saveUser$(user:UserModel) {
        user.sysName = user.sysName.toLowerCase();
        const _wasUser = this.mapUsers.get(user.sysName);
        this.mapUsers.set(user.sysName,user);
         if(!_wasUser){
            ;//TBD put User in SQL
        }

        this.user$.next(GUser = user);
   
    }

    async login$(sysName:string,password:string) : Promise<UserModel | undefined>{
        sysName = sysName.toLowerCase();
        GUser = this.getUser(sysName);
       
        if(!!GUser && GUser.password == password ){
            GUser.token='OK';
        }
       // let authorized =  GUser?.password == password;
       
         return GUser;
 
    }
    // async gotoExit$(){
    //     // remove user from local storage and set current user to null
    //     //localStorage.removeItem(USER_STORAGE_KEY);
    //     if(!!GUser){
    //         GUser.token = ''; 
    //     }
     
    //     this.user$.next(GUser = undefined);
    //    // this.router.navigate(['/account/login']);
    // }


    async getAll$(): Promise<UserModel[]> {
        return [...this.mapUsers.values()];
       
       
    }

    async getById$(id: number):Promise<UserModel | undefined> {
        const ret = [...this.mapUsers.values()].find(u=>+u.id === id);
        return ret;
    }
   
    async delete$(sysName: string) {
        const user = await this.getUser(sysName);
        if(!!user && !user.IsAdmin){
            this.mapUsers.delete(sysName);
            //TBD send SQL UPDATE
            return true;
        }
        return false;
    }
//#endregion
}
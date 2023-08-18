import { Injectable } from '@angular/core';
//import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, lastValueFrom } from 'rxjs';
import { last, map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { UserModel } from '@app/_models';
import { EFSM as E} from '@app/_interfaces/interfaces';
export const USER_STORAGE_KEY = 'abiker16-registration-login-user';

@Injectable({ providedIn: 'root' })
export class AccountService {

    //#region FSM
       
    
    eFsm$: BehaviorSubject<E> = new BehaviorSubject<E>(E.eHome);
   
    get IsHome() {return this.eFsm$.value === E.eHome;}
    get IsRegistrate() {return this.eFsm$.value === E.eRegistrate;}
    get IsCreditCard() {return this.eFsm$.value === E.eCredirCard;}
       

    gotoRegistrate() {
       if(this.IsHome)
         this.eFsm$.next(E.eRegistrate);
    }
    gotoCreditCard(user: UserModel) {
        if(this.IsRegistrate)
            this.eFsm$.next(E.eCredirCard);
    
    }
    gotoExit() {
        this.logout();
        this.eFsm$.next(E.eHome);
        
    }
    //#endregion


   
    private userSubject$: BehaviorSubject<UserModel | null>;
    public user$: Observable<UserModel | null>;

    constructor(
        //private router: Router,
        private http: HttpClient
    ) {
        this.userSubject$ = new BehaviorSubject(JSON.parse(localStorage.getItem(USER_STORAGE_KEY)!));
        this.user$ = this.userSubject$.asObservable();
      

    }
  

    public get userValue() {
        return this.userSubject$.value;
    }

    login$(userName: string, password: string):Promise<UserModel> {
        const req =  this.http.post<UserModel>(`${environment.apiUrl}/users/authenticate`, { userName, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
                this.userSubject$.next(user);
                return user;
            }));
        return lastValueFrom(req);
    }

    logout():void {
        // remove user from local storage and set current user to null
        localStorage.removeItem(USER_STORAGE_KEY);
        this.userSubject$.next(null);
       // this.router.navigate(['/account/login']);
    }

   async  register$(user: UserModel) : Promise<UserModel>{
        const req =  this.http.post<UserModel>(`${environment.apiUrl}/users/register`, user);
        const userOut =  lastValueFrom(req);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        return userOut;
    }

    async getAll$(): Promise<UserModel[]> {
        const req = this.http.get<UserModel[]>(`${environment.apiUrl}/users`);
        const ret =  lastValueFrom(req);
        return ret;
    }

    async getById$(id: string):Promise<UserModel> {
         const req = this.http.get<UserModel>(`${environment.apiUrl}/users/${id}`);
         const ret =  lastValueFrom(req);
         return ret;
    }

    async update$(id: string, params: any) : Promise<UserModel>{
      
        const req =this.http.put<UserModel>(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue?.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject$.next(user);
                }
                return x;
            }));
        return lastValueFrom(req);
        
        

    }

    async delete$(id: string) : Promise<UserModel>{
        const req = this.http.delete<UserModel>(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue?.id) {
                    this.logout();
                }
                return x;
            }));
        return lastValueFrom(req);
    }
}
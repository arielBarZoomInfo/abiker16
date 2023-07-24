import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { last, map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { UserModel } from '@app/_models';
import { EFSM} from '@app/_interfaces/interfaces';
export const USER_STORAGE_KEY = 'abike16-registration-login-user';

@Injectable({ providedIn: 'root' })
export class AccountService {
    toLgout() {
        throw new Error('Method not implemented.');
    }
    private userSubject: BehaviorSubject<UserModel | null>;
    public user$: Observable<UserModel | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem(USER_STORAGE_KEY)!));
        this.user$ = this.userSubject.asObservable();
    }
    //#region FSM
        private _authStateSubj$: BehaviorSubject<EFSM> = 
        new  BehaviorSubject<EFSM>(EFSM.eHome);
    public get authState$(){return this._authStateSubj$.asObservable()};
   
    public get authState() : EFSM {
        return this._authStateSubj$.value;
    }
    public set authState(v : EFSM) {
        if(this.authState != v){
            this._authStateSubj$.next(v);
        }
    }
    flags = {

        fHome: true,//=1,
        fLogout: false,//=2,
        fLogin: true,//=4,
        fRegistr: false,//=8,
        fVisa: false,//=16,
        fPay: false,//=32,
        fAdmin: false,// = 128
    };

    clearFlags() {
        this.flags.fHome = false;//=1;
        this.flags.fLogout = false;//=2;
        this.flags.fLogin = false;//=4;
        this.flags.fRegistr = false;//=8;
        this.flags.fVisa = false;//=16;
        this.flags.fPay = false;//=32;
        this.flags.fAdmin = false;// = 128
   
    }
    //#endregion
 

    public get userValue() {
        return this.userSubject.value;
    }

    login$(userName: string, password: string):Promise<UserModel> {
        const req =  this.http.post<UserModel>(`${environment.apiUrl}/users/authenticate`, { userName, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
        return lastValueFrom(req);
    }

    logout():void {
        // remove user from local storage and set current user to null
        localStorage.removeItem(USER_STORAGE_KEY);
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

   async  register$(user: UserModel) : Promise<UserModel>{
        const req =  this.http.post<UserModel>(`${environment.apiUrl}/users/register`, user);
        return lastValueFrom(req);
    }

    async getAll$(): Promise<UserModel[]> {
        const req = this.http.get<UserModel[]>(`${environment.apiUrl}/users`);
        return lastValueFrom(req);
    }

    async getById$(id: string):Promise<UserModel> {
         const req = this.http.get<UserModel>(`${environment.apiUrl}/users/${id}`);
        return lastValueFrom(req);
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
                    this.userSubject.next(user);
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
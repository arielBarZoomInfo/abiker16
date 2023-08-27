import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { UserModel } from '@app/_models';

// array in local storage for registered users
export const USERS_STORAGE_KEY = 'abiker16-registration-login-users';
let users: any[] = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY)!) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/api/users/export') && method === 'POST':
                    return exportUsers$();
               // case url.endsWith('/users/authenticate') && method === 'POST':
                //     return authenticate();
                // case url.endsWith('/users/register') && method === 'POST':
                //     return register();
                // case url.endsWith('/users') && method === 'GET':
                //     return getUsers();
                // case url.match(/\/users\/\d+$/) && method === 'GET':
                //     return getUserById();
                // case url.match(/\/users\/\d+$/) && method === 'PUT':
                //     return updateUser();
                // case url.match(/\/users\/\d+$/) && method === 'DELETE':
                //     return deleteUser();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions
        function exportUsers$() {
       
         
            try {
                const _users:UserModel[]  = (body ?? []) as UserModel[];
                const _json = JSON.stringify(_users);
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
               
    
               console.log(_users);
               return ok();
                
            } catch (err:any) {
                console.error(err);
                return error(err.toString());
            }  
        }
    


        function authenticate() {
            const { sysName, password } = body;
            const user = users.find(x => x.sysName === sysName && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                ...basicDetails(user),
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const user = body;

            if (users.find(x => x.sysName && x.sysName === user.sysName)) {
                return error('Username "' + user.sysName + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
            return ok(user);
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users.map(x => basicDetails(x)));
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            const user = users.find(x => x.id === idFromUrl());
            return ok(basicDetails(user));
        }

        function updateUser() {
            if (!isLoggedIn()) return unauthorized();

            let params = body;
            let user = users.find(x => x.id === idFromUrl());

            // only update password if entered
            if (!params.password) {
                delete params.password;
            }

            // update and save user
            Object.assign(user, params);
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

            return ok();
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
            return ok();
        }

        // helper functions

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function error(message: string) {
            return throwError(() => ({ error: { message } }))
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function unauthorized() {
            return throwError(() => ({ status: 401, error: { message: 'Unauthorized' } }))
                .pipe(materialize(), delay(500), dematerialize());
        }

        function basicDetails(user: any) {
            const { id, sysName, firstName, lastName } = user;
            return { id, sysName, firstName, lastName };
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const FakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
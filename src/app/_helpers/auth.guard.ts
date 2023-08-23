import { Injectable } from '@angular/core';
import { Router,  ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsersAccountService } from '@app/_services';



@Injectable({ providedIn: 'root' })
export class AuthGuard  {
    constructor(
        private router: Router,
        private userSvc: UsersAccountService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.userSvc.userValue;
        if (user) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
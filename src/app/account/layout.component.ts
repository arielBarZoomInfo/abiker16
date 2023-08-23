import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UsersAccountService } from '@app/_services';

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    constructor(
        private router: Router,
        private userSvc: UsersAccountService
    ) {
        // redirect to home if already logged in
        if (this.userSvc.userValue) {
            this.router.navigate(['/']);
        }
    }
}
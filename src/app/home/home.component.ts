import { Component } from '@angular/core';

import { UserModel } from '@app/_models';
import { UsersAccountService, GUser } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: UserModel | undefined;

    constructor(private userSvc: UsersAccountService) {
        this.user = GUser;
    }
}
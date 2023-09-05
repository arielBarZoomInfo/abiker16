import { Component, OnDestroy, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UsersAccountService } from '@app/_services';
import { IUserModel, UserModel } from '@app/_models';

@Component({
    selector: 'and-users-list-component',
    templateUrl: 'list.component.html' 
})
export class ListComponent implements OnInit , OnDestroy{
    Users: UserModel[] = [];
    loading:boolean = true;

    constructor(private userSvc: UsersAccountService) {}
    
    ngOnDestroy(): void {
        console.log(`=>ListComponent.OnDestroy`,this.Users);
    }

    async ngOnInit() {
        const ret =  await this.userSvc.listUsers$();
        
        this.Users = [... ret];
        console.log(`=>ListComponent.OnInit`,this.Users);
        this.loading = false;
            // .pipe(first())
            // .subscribe(users => this.users = users);
    }

    async  deleteUser(sysname: string) {
       this.Users = await this.userSvc.deleteUser$(sysname);
           
        // .pipe(first())
            // .subscribe(() => this.users = this.users!.filter(x => x.id !== id));
    }
}
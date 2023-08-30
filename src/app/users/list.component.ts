import { Component, OnDestroy, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UsersAccountService } from '@app/_services';

@Component({
    selector: 'and-users-list-component',
    templateUrl: 'list.component.html' 
})
export class ListComponent implements OnInit , OnDestroy{
    users?: any[] = [];

    constructor(private userSvc: UsersAccountService) {}
    
    ngOnDestroy(): void {
        console.log(`=>ListComponent.OnDestroy`);
    }

    async ngOnInit() {
        this.users = await this.userSvc.getAll$();
        console.log(`=>ListComponent.OnInit`);
            // .pipe(first())
            // .subscribe(users => this.users = users);
    }

    async  deleteUser(sysName: string) {
        if(await this.userSvc.delete$(sysName)){
            this.users = await this.userSvc.getAll$();

        }
         
            // .pipe(first())
            // .subscribe(() => this.users = this.users!.filter(x => x.id !== id));
    }
}
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UsersAccountService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users?: any[];

    constructor(private userSvc: UsersAccountService) {}

    async ngOnInit() {
        this.users = await this.userSvc.getAll$()
            // .pipe(first())
            // .subscribe(users => this.users = users);
    }

    async  deleteUser(id: string) {
        const user = this.users!.find(x => x.id === id);
        user.isDeleting = true;
        if(user){
            await this.userSvc.delete$(id)
        }
       
            // .pipe(first())
            // .subscribe(() => this.users = this.users!.filter(x => x.id !== id));
    }
}
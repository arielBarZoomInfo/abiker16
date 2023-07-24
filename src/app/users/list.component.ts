import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users?: any[];

    constructor(private accountService: AccountService) {}

    async ngOnInit() {
        this.users = await this.accountService.getAll$()
            // .pipe(first())
            // .subscribe(users => this.users = users);
    }

    async  deleteUser(id: string) {
        const user = this.users!.find(x => x.id === id);
        user.isDeleting = true;
        if(user){
            await this.accountService.delete$(id)
        }
       
            // .pipe(first())
            // .subscribe(() => this.users = this.users!.filter(x => x.id !== id));
    }
}
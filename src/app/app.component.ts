import { Component, OnInit } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { GKeybLanGlobal  as G} from '@app/lang-keyb/lang-keyb.global';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent  implements OnInit{
    user?: User | null;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }
    ngOnInit(): void {
        G.KeyboardVisible = true;
    }

    logout() {
        this.accountService.logout();
    }

    toShowKeyb(){
        G.KeyboardVisible = true;
    }
    toHidewKeyb(){
        G.KeyboardVisible = false;

    }
}
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services';
import {UserModel } from './_models';
import { GKeybLanGlobal  as G} from '@app/_globals/keyb-lang.global';
import { TLangNames } from './_interfaces/interfaces';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent  implements OnInit{
    user?: UserModel | null;
    ref = G.ref;
   

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
    setLang(lang:TLangNames){
        G.setLang(lang);
    }
}
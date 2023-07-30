import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from './_services';
import {UserModel } from './_models';
import { GKeybLanGlobal  as G} from '@app/_globals/keyb-lang.global';
import { TLangNames } from './_interfaces/interfaces';
import { Subscription } from 'rxjs';



@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent  implements OnInit, OnDestroy{
    user?: UserModel | null;
    ref = G.ref;
    readonly subs:Subscription[] = [];

    constructor(private accountSvc: AccountService) {
        this.subs.push(this.accountSvc.user$.subscribe(x => this.user = x));
    }
    ngOnDestroy(): void {
        this.subs.forEach(u=>u.unsubscribe());
        
    }
    ngOnInit(): void {
        G.KeyboardVisible = true;
    }

    logout() {
       
        this.accountSvc.gotoExit();
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
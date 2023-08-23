import { Component, OnDestroy } from '@angular/core';
//import { GKeybLanGlobal as G} from '@app/_globals/keyb-lang.global';
import { UsersAccountService } from '@app/_services';
import { epg as E} from '@app/_interfaces/interfaces';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnDestroy{
  E = E;
 // ref = G.ref;
 // get Lang() {return this.ref.lang}
 // svc = this.accSvc;
  page!: E;
 
  // get IsSelectLang() {return this.page == E.eSelectLang;}
  // get IsLogin() {return this.page === E.eLogin;}
  // get IsRegistrate() {return this.page === E.eRegistrate;}
  // get IsCreditCard() {return this.page === E.eCredirCard;}

 subs !: Subscription;
  constructor(
    readonly accSvc:UsersAccountService
  ){
    
    this.subs = this.accSvc.epg$.subscribe(
      e=> this.page = e
      );

  }
  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }

}

import { Component, OnDestroy } from '@angular/core';
import { GKeybLanGlobal as G} from '@app/_globals/keyb-lang.global';
import { AccountService } from '@app/_services';
import { EFSM as E} from '@app/_interfaces/interfaces';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnDestroy{
  ref = G.ref;
  get Lang() {return this.ref.lang}
 // svc = this.accSvc;
  _eFsm:E = E.eHome;
  get IsHome() {return this._eFsm === E.eHome;}
  get IsRegistrate() {return this._eFsm === E.eRegistrate;}
  get IsCreditCard() {return this._eFsm === E.eCredirCard;}

 subs !: Subscription;
  constructor(
    readonly accSvc:AccountService
  ){
    
    this.subs = this.accSvc.eFsm$.subscribe(
      e=> this._eFsm = e
      );

  }
  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }

}

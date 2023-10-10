import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GKeybLanGlobal as G} from '@app/_globals/keyb-lang.global';
import { UsersAccountService } from '@app/_services';
import { epg as E, TLangNames} from '@app/_interfaces/interfaces';
import { environment } from '@environments/environment';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
//  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit,OnDestroy,AfterViewInit{
  E = E;
  env=environment;
 // ref = G.ref;
 // get Lang() {return this.ref.lang}
 // svc = this.userSvc;
 @ViewChild('myDialog') myDialog!: ElementRef<HTMLDialogElement>;
  page!: E;
 
  // get IsSelectLang() {return this.page == E.eSelectLang;}
  // get IsLogin() {return this.page === E.eLogin;}
  // get IsRegistrate() {return this.page === E.eRegistrate;}
  // get IsCreditCard() {return this.page === E.eCredirCard;}

 subs !: Subscription;
  constructor(
    readonly userSvc:UsersAccountService
  ){
    
    this.subs = this.userSvc.epg$.subscribe(
      e=> {
        this.page = e;
        switch (e) {
          case E.eReadCode:
          case E.eCredirCard:
            this.isFrame =true;
            
            break;
        
          default:
            this.isFrame =false;
            break;
        }
      }
     
    );

  }

  isFrame:boolean = false;

  get isDialogOpen(){
    return this.myDialog?.nativeElement.open === true;
  }
  myDialogClose(){
    
    this.myDialog.nativeElement.close();
  }
  myDialogShow(){
    this.myDialog.nativeElement.showModal();
  }
  ngAfterViewInit(): void {
    //debugger;
  }
  ngOnInit(): void {
   
  }
  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
  setLanguage(lid:TLangNames){
    G.setLang(lid);
  }
  gotoRegistrate(){

    this.userSvc.gotoRegistrate$();
  }
  gotoCredirCard(){
    this.userSvc.gotoCreditCard$();
  }
  gotoPay(){
    ///this.userSvc.gotoLogin$();
    //TBD
  }
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { KeyboardService } from '../keyboard.service';
import { Subscription } from 'rxjs';
import { GKeybLanGlobal  as G} from '@app/lang-keyb/lang-keyb.global';
//import {GKeybLanGlobal as G} from 

//import { GLangNamesArray, RefKeybVisible, RefKeyboardLang, SetAlternateLng, SetGlobalLang, KeybLangPipe$, GlobalLangPipe$ } from 'src/app/keyb-data/keyb.data';
//import { TLangNames } from 'src/app/interfaces/interfaces';
//import { keybLangPipe$ } from 'src/app/svc/gdata.service';
//type TAlterLang = TLangNames | '';

@Component({
  selector: 'and-keyboard-multi',
  templateUrl: './keyboard-multi.component.html',
  styleUrls: ['../keyboard.scss']
})
export class KeyboardMultiComponent implements OnInit  , OnDestroy{
//   LangList:string[] = GLangNamesArray;


  ref = G.ref;//.keybVisible;
//   refLang =   RefKeyboardLang;
  
 
//  private _AlterLang : TAlterLang = '';
//  public get AlterLang() : TAlterLang {
//   return this._AlterLang;
//  }
//  public set AlterLang(v : TAlterLang) {
//     if(this._AlterLang != v){
//       this._AlterLang = v;
//       SetAlternateLng(v);
    
//     }
//  }
 
  //private _Lang1 : TLangNames = 'en';
  // public get Lang1() : TLangNames {

  //   return this._Lang1;
  // }
  // public set Lang1(v : TLangNames) {
  //   if(this._Lang1 != v){
  //     this._Lang1 = v;
  //     SetGlobalLang(v);
     
  //   }
    
  // }
  @Input()
  subscrArr:Subscription[] = [];
  constructor(readonly  kbsrv:KeyboardService){
    // this.subscrArr.push(GlobalLangPipe$.subscribe(
    //   lang=>this._Lang1 = lang
    // ));
    
  }
  Lang: string = G.Lang ;

  ngOnInit(): void {
   
    this.subscrArr.push(G.Lang$
      .subscribe(lang=>{
        this.Lang = lang;
        `sent pipe ${this.Lang}`
      }));
  }
  ngOnDestroy(): void {
    this.subscrArr.forEach(p=>p?.unsubscribe());
  }
  toShowKeyb(){
  // this.refVisible =  {visible:true};
 // RefKeybVisible.visible =  true;//{visible:true};
    G.KeyboardVisible = false;
    
  }
 
  toHideKeyb(){
   // this.refVisible = {visible:false};
   G.KeyboardVisible = false;
   //RefKeybVisible.visible =  false;
    
  }
 
}

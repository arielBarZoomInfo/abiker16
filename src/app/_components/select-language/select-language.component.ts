import { Component } from '@angular/core';
import { OnInit,  Input, OnDestroy } from '@angular/core';
import { TLangNames } from '@app/_interfaces/interfaces';
import { Subscription } from 'rxjs';
import { GKeybLanGlobal as G} from '@app/_globals/keyb-lang.global';
import { AccountService } from '@app/_services';

@Component({
  selector: 'and-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent 
implements OnInit ,OnDestroy{

  @Input() Lang: TLangNames = G.Lang;
  @Input() Height:string = '80px';

  subscrArr:Subscription[] = [];
  

  constructor(private accountSvc: AccountService,){
   
  }
  ngOnDestroy(): void {
    this.subscrArr.forEach(p=>p?.unsubscribe());
  }
  ngOnInit(): void {
    this.subscrArr.push(
      G.Lang$.subscribe(p=>{
        this.Lang = p;
       
      })

    )
   
  }
  setLanguage(lid:TLangNames){
    G.setLang(lid);
  }
  gotoRegistrate(){
    this.accountSvc.gotoRegistrate();
  }
}

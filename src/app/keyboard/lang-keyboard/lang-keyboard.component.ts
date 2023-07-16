import { Component, Input, OnDestroy, OnInit } from '@angular/core';
//import { TochangeKeyboardKeys } from '../akb-key/akb-key.component';
import { ALL_KEY_LAYOUTS, KeyboardService, IsLtr, KeyHasCase  } from '../keyboard.service';
//import { arrow } from '@popperjs/core';
import { Subscription } from 'rxjs';
import { TSubject } from 'src/app/_helpers/tsubject';

const startLanguage = 'he';

//type Index = 'en' | 'ru' | 'he' | 'ar';
//type TKEyLocation = { [k in 'en' | 'ru' | 'he' | 'ar']?:  string[][] };



@Component({
  selector: 'akb-lang-keyboard',
  templateUrl: './lang-keyboard.component.html',
  styleUrls: ['../keyboard.scss']
})

export class LangKeyboardComponent implements OnInit, OnDestroy {
 
  public readonly capsLock$:TSubject<boolean> = new TSubject<boolean>(false);;


  @Input('lang')
  public Lang : string = 'en';

  public get isLtr (): boolean {return IsLtr(this.Lang)}

  public keyLayout!:string[][]; 

  public get LangCaps():boolean {return this.capsLock$.value}
  public  keyHasCase(key:string){
      return KeyHasCase(key);
  }


  subscrArr:Subscription[] = [];
  _toggleCaps():boolean{
    const ft = !this.LangCaps;
    console.log(`[${this.Lang}]=>LangKeyboard.setCaps(${ft})`)
    return this.capsLock$.newNext(ft);
    
  }
  // forKeyRow(arr:string[]):KeyData[] {
  //   const arrOut:KeyData[] = arr.map(key=>new KeyData(key));
  //   return arrOut;
  // }

  constructor(){
   
  }

 
  ngOnInit(): void {
    this.keyLayout = ALL_KEY_LAYOUTS[this.Lang];
    console.log(`[${this.Lang}]=>LangKeyboard::ngOnInit`);
    // if(this.Lang == 'en' || this.Lang == 'ru'){
    //   this.capLock$ = new TSubject<boolean>(false);
    // }
    
  }
  
  ngOnDestroy(){
    this.capsLock$?.destroy();
  }
  onCapsPress(key:string){
    this._toggleCaps();
  }



  onKeyPress(key :string) {
    let c = key;
    // switch (key) {
    //   // case 'caps-on':
    //   //   this.LangCaps=true;
    //   //   break;
    //   //   case 'caps-off':
    //   //     this.LangCaps=false;
    //   //     break;
          
    //     // //this._toggleCaps();
    //     // c=(this.LangCaps) ? 'caps-on' : 'caps-off'
    //     // break;
    //   case '\n':
    //     c = '\\n';
    //     break;
    //   case '\b':
    //     c = '\\b';
    //     break;
    //   case ' ':
    //     c = 'space';
    //     break;
                
    //   default:
    //     break;
 
    //   }
      console.log(`onKeyPress(${c})`);

  }
 

}




// switch (lan) {
//   case 'en': return LAN_TAB.en;
//   case 'he': return LAN_TAB.he;
//   case 'ru': return LAN_TAB.ru;
//   case 'ar': return LAN_TAB.ar;
    
//     break;

//   default:
//     return []
//     break;
// }
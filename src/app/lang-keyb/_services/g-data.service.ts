import { Injectable } from '@angular/core';
import { IForKeyboard, ILang } from '../interfaces';
import { BehaviorSubject } from 'rxjs';

const evShowKeyboard :BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

@Injectable({
  providedIn: 'root'
})

export class GDataService implements IForKeyboard{

  public capsLock: boolean = false;
  public get KeyboardVisible() {return evShowKeyboard.value;}
  public showHideKeyboard(thoShow:boolean){
    const b = this.KeyboardVisible;
    if(b != thoShow){
      evShowKeyboard.next(thoShow);

    }
  }
   ElementWithFocus: BehaviorSubject<EventTarget | null> = 
     new BehaviorSubject<EventTarget | null>(null);

 
  set Target(targ:EventTarget | null) {
    this.ElementWithFocus.next(targ);
    
  }
  get Target(): EventTarget | null{
    return this.ElementWithFocus.value;
  }
  get Lang(): ILang {
    return gOnLang.value;
  }
  get IsLTR(): boolean {
    return gCurLang.langId === 'en' || gCurLang.langId === 'ru' ;
  }
  attachKeyboard(targ:EventTarget | null){
   
    this._detachKeyboard(this.Target);
    this.Target = targ;
  }
  private _detachKeyboard(trgOld: any | null){
    if(trgOld && trgOld.classList){
      trgOld?.classList?.remove('my-border');
      if(trgOld.id){
        console.log(`@detach: ${trgOld.id} value:"${trgOld.value}"` );

      }
     
    }
  }
  
  sendKeyboardChar(ch:string){
   
    var trg: any = this.ElementWithFocus?.value || {};
    if(trg.value !== undefined){
      var str = trg.value.toString();
      if(ch === '\n' || ch === 'enter') {
        //trg.value = str + '\n';
        ch = '\n' ;
      }       
      else  if(ch === '\b' || ch === 'backspace') {
       // trg.value = str.substring(0, str.length - 1);
       //fireEvent.type(trg,'\b');
       ch = '\b' ;
      }
      if(ch?.length === 1){
        //trg.value = str + ch;
        fireEvent.type(trg,ch);
      } 

     
    }
  
  }

  detachKeyboard(targ:EventTarget | null){
    //this.ElementWithFocus.next(null);
  }    

    
  
  constructor() {
       // TBD this.setCurLang('en');
       this.capsLock = false;
   
  }

     
  public setCurLang(value: string): ILang | undefined {
    var  lan = gMapLanguage.get(value) ;

    if(lan){
      gOnLang.next(gCurLang = lan);
    }
    return lan;
  }
 
}

//export 
//export var SHOW_KEYBOARD: boolean = false;

           


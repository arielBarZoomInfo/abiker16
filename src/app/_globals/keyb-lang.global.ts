import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ToKeybDirective } from '@app/_directives/to-keyb.directive';
import { FormControl } from '@angular/forms';
import { TLangNames, TLangNames2 } from '../_interfaces/interfaces';


export interface IKeybLanGlobal{
  get AttachedeControl() : FormControl | undefined;
  get AttachedControlName(): string;
  get KeyboardEnter$(): Observable<string>;// string is name of 
  fireKeyboardEnter$(ctrlName:string):void;
  get Lang$():Observable<TLangNames>;
  get Lang() : TLangNames;
  get KeybLang$():Observable<TLangNames2>;
  get KeybLang() : TLangNames2;
  setLang(TLangNames:string):void;
  setAlterLang(TLangNames2:string):void;
  clearAlterLang():void;
  get KeyboardVisible$():Observable<boolean>;
  get KeyboardVisible() : boolean;
  set KeyboardVisible(ft:boolean);
  sendKeyboadChar(ch:string):void;
  ref: {
    lang:TLangNames;
    keybLang:TLangNames;
    keybVisible:boolean;
    //caps: boolean;
    // attachedName:string;
    // attached?:FormControl;
  }
  
}




export class CKeybLanGlobal implements IKeybLanGlobal{

  constructor(private lang0:TLangNames = 'en'){

  }

  ref = 
  { 
    lang: this.lang0,
    keybLang:this.lang0,
    
    keybVisible:false
    // attachedName:'',
    // attached: undefined 
  };
  
   //#region ActiveContro
  get AttachedeControl(): FormControl<any> | undefined {
    const that  = ToKeybDirective.Attached?.f;
    return that;
  }
  get AttachedControlName(): string {
    const name  = '' + ToKeybDirective.Attached?.name;
    return name;
  }

  DETACH(){
    ToKeybDirective.Attached?.detachKeyboard();
    
  }
  // attach(f:FormControl ){
  //   ToKeybDirective.Attached
  // }
  //#endregion

  //#region KeyboardEnter
   _KeyboardEnter$ = new BehaviorSubject<string>('');
  get KeyboardEnter$(): Observable<string> {
    return this._KeyboardEnter$.asObservable();
  }

 
  fireKeyboardEnter$(name:string): void{
    const oldName = this._KeyboardEnter$.value;
    if(name.length > 0 && 
      oldName != name){
        this._KeyboardEnter$
          .next(name);
    }
    
  }
 //#endregion
  
  //#region Lang
  _Lang$: BehaviorSubject<TLangNames> = 
      new BehaviorSubject<TLangNames>(this.lang0);

  get Lang$(): Observable<TLangNames> {
    return this._Lang$.asObservable();
  }
  get Lang(): TLangNames {
    return this._Lang$.value;
  }

  
  private _isAlterLang:boolean = false;
  setLang(lang: TLangNames): void {
    if(this._Lang$.value != lang){
      this._Lang$.next(lang);
      this.ref.lang = lang;
    }
    if(!this._isAlterLang){
      this._KeybLang$.next(lang);
      this.ref.keybLang = lang;
    }
  }
 //IMPORTANT KeybLang 
   _KeybLang$: BehaviorSubject<TLangNames2> = 
      new BehaviorSubject<TLangNames2>(this.lang0);
    get KeybLang$(): Observable<TLangNames2> {
      return this._KeybLang$.asObservable();
    }
    
    get KeybLang(): TLangNames2 {
      return this._KeybLang$.value;
    }
  
  //IMPORTANT 

  setAlterLang(alterLang: TLangNames2 ): void {
  //  const _keybLang = (alterLang.length < 1) ? this.KeybLang : alterLang;
    if(alterLang != this._KeybLang$.value){
      this._isAlterLang = true;
      this._KeybLang$.next(alterLang);
      this.ref.keybLang = this.Lang;
      console.log(` setAlterLang(${alterLang} )`)
    }  
  }



  clearAlterLang( ): void {
     if(this._KeybLang$.value != this.Lang){
        this._isAlterLang = false;
        this.ref.keybLang = this.Lang;
        this._KeybLang$.next(this.Lang);
        console.log(` clearAlterLang( ) Lang=${this.Lang}`)
    }
       
  }

 
  //#endregion

  //#region Keyboard 

  _KeyboardVisible$: BehaviorSubject<boolean> = 
    new BehaviorSubject<boolean>(this.ref.keybVisible);
  get KeyboardVisible$(): Observable<boolean> {
    return this._KeyboardVisible$.asObservable();
  }
  get KeyboardVisible(): boolean {
    return this._KeyboardVisible$.value;
  }
  set KeyboardVisible(ft: boolean) {
   if(this.KeyboardVisible != ft){
    this.ref.keybVisible = ft;
    this._KeyboardVisible$.next(ft);
   }
  }

  sendKeyboadChar(ch: string): void {

    const trg = ToKeybDirective.Attached;//GGetCurrentInpit();
    if(trg && trg.f){
      var str = '' + trg.f.value;
      if(ch === '\n' || ch === 'enter') {
        //trg.value = str + '\n';
       //ch = '\n' 
        this._KeyboardEnter$.next(trg.name);
        return;
      }       
      else  if(ch === '\b' || ch === 'backspace') {
        str = str.slice(0,-1)
       trg.f.setValue(str)  ;
       //fireEvent.type(trg,'\b');
       ch = '\b' ;
      }
      if(ch?.length <= 2){
        str += ch;
        trg.f.setValue(str);
      } 

     
    }
  
  }

  //#endregion
}

export const GKeybLanGlobal:CKeybLanGlobal = new CKeybLanGlobal('en')

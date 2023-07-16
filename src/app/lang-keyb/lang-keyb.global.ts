import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ToKeybDirective } from './_directives/to-keyb.directive';
import { FormControl } from '@angular/forms';

export interface IKeybLanGlobal{
  get AttachedeControl() : FormControl | undefined;
  get AttachedControlName(): string;
  get KeyboardEnter$(): Observable<string>;// string is name of 
  fireKeyboardEnter$(ctrlName:string):void;
  get Lang$():Observable<string>;
  get Lang() : string;
  setLang(lan:string):void;
  setAlterLang(lan:string):void;
  get KeyboardVisible$():Observable<boolean>;
  get KeyboardVisible() : boolean;
  set KeyboardVisible(ft:boolean);
  sendKeyboadChar(ch:string):void;
  ref: {
    lang:string;
    keybVisible:boolean;
    //caps: boolean;
    // attachedName:string;
    // attached?:FormControl;
  }
  
}




export class CKeybLanGlobal implements IKeybLanGlobal{

  constructor(private lang0:string){

  }

  ref = 
  { 
    lang: this.lang0,
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
  _Lang$: BehaviorSubject<string> = 
      new BehaviorSubject<string>(this.lang0);

  get Lang$(): Observable<string> {
    return this._Lang$.asObservable();
  }
  get Lang(): string {
    return this._Lang$.value;
  }
 
  _oldAlterLang:string = '';
 

  _setLang(lang:string, alterLang:string){
    if(lang.length == 2  ){
      this._oldAlterLang = '';
      if(lang != this._Lang$.value)
      {
        this._Lang$.next(this.ref.lang = lang)
      }
    } else if(lang.length == 0 && alterLang.length == 2){
      if(alterLang != this._Lang$.value)
      {
        this._Lang$.next(this._oldAlterLang = alterLang)
      }

    } 
       
  }

  setLang(lang: string): void {
   
    this._setLang(lang,'');
  }
  setAlterLang(lang: string): void {
    if(lang.length === 2){
      this._setLang('',lang);
    } else if(lang.length < 2){
      this._oldAlterLang = '';
      this._setLang(this.ref.lang,'');
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

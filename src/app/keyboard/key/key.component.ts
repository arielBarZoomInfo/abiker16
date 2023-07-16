import { Component,  Input, OnDestroy, OnInit } from '@angular/core';
import {  Subscription } from 'rxjs';
import { Chr2Enum, ECHR, KeyboardService } from '../keyboard.service';
import { TSubject } from 'src/app/_helpers/tsubject';
import { GKeybLanGlobal } from '@app/lang-keyb/lang-keyb.global';


export class KeyData{

  public readonly e: ECHR = Chr2Enum(this.key);

  constructor(public readonly  key: string){}

  
}

@Component({
  selector: 'akb-key',
  templateUrl: './key.component.html',
  styleUrls: ['../keyboard.scss']
})
export class KeyComponent implements OnInit,OnDestroy{
 
  @Input('capsLock') capsLock$ ?: TSubject<boolean>;
  @Input() charInit: string = '';
 
  @Input() row:number = -1;
  @Input() col:number = -1;
  // @Output('KeyPress') readonly KeyPress$: EventEmitter<string> 
  //    = new EventEmitter<string>(true);
  @Input('lang')
  public Lang:string = 'en';
  
  private _kbdId !: string;
  public get kbdId() : string {
    return this._kbdId;
  }

  // @Input()
  /// console.log(`set caps(${this.caps}) `);
  public setCaps(b : boolean) {
    if(this.capsLock$ && this.capsLock$?.value != b){
      this.capsLock$.newNext(b);
      this._setKeyText1();
    }
  }
  private _caps:boolean = false;
  public get caps() : boolean {
    return this._caps;
  }

  public keySend:string='';
  public keyText:string='';
  public KeyIcon:string='';
  
  private e : ECHR = ECHR.errChr;
 
 
  
  iconName:string='';
  isHidden:boolean = false;
  isWide:boolean=false;
  isExtraWide:boolean =false;
  get hasIcon():boolean {return !!this.iconName;}
  get isCapsKey():boolean {return this.e === ECHR.caps;}
  get hasCase():boolean {return this.e === ECHR.chrCase;}
  get isChar():boolean {return this.hasCase || this.e === ECHR.chr ;}

  
  classList:string[] = ['keyboard_key'];
  
  subscription:Subscription |undefined = undefined;
   
  constructor(){ 
    //readonly  kbsrv:KeyboardService){
     //private render:Renderer2){
      //this.subscription = evTochangeKey$.subscribe(ev=>this.toChangeKey(ev))
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.e = Chr2Enum(this.charInit);
   
   
    this._initkey();
    this._kbdId = `kbdId-${this.row}${this.col.toString(16).toUpperCase()}`;
   // console.log('onInit', this._kbdId, this.Lang ,this.keyText);
    if(this.hasCase){
      this.capsLock$?.subscribe((p:boolean)=>{
             this._caps = p;
             this._setKeyText1();
      });
    }
  }
    
   
  _initkey(){
    this.keySend = this.keyText = this.charInit;  
    this.isHidden = (this.e == ECHR.errChr || !this.charInit || this.charInit == '?');
  
    switch (this.e) {
      // case ECHR.chr:
      //   this.keySend = this.keyText = this.charInit;        
      //   break;
      case ECHR.chrCase:
        this.charInit = this.charInit.toLowerCase();
        this.keySend = this.keyText = this.caps ? this.charInit.toUpperCase() : this.charInit;
   
        break;
      case ECHR.caps:
        this.iconName='keyboard_capslock'
        this.keyText ='';
        this.keySend = 'caps'
        this.isWide=true;

        break;
      case ECHR.cmd:
        this._initCmdKey();
        break;
    
      default:
        break;
    }
  
  }
  private _initCmdKey(){
    switch (this.charInit) {
        case 'backspace':
        this.iconName='backspace';
        this.keyText ='';
        this.keySend = '\b';
        this.isWide=true;
        break;
      case 'enter':
          this.iconName='keyboard_return';
          this.keyText ='';
          this.keySend = '\n';
          this.isWide=true;
          break;
      case 'done':
        this.iconName='check';
        this.keyText ='done';
        this.keySend = '\n';
        this.isWide=true;
          break;
      case 'space':
      case ' ':
        this.iconName='space_bar';
        this.keyText =' ';
        this.isExtraWide=true;
        break;
    
      default:
        this.isExtraWide = this.isWide = false;
        this.iconName='';
        this.keyText = '??';
        break;
    }

  }


  private _setKeyText1(){
 
    if(this.e == ECHR.chrCase){
      this.keySend = this.keyText = this.caps ? this.charInit.toUpperCase() : this.charInit;
    }
  
  }

  keyPress(event:any){
  
    if(this.isCapsKey){
      this._caps = !this._caps;
      this._setKeyText1();
       //this.KeyPress$.emit(msg);
      this.capsLock$?.next(this._caps);
      console.log('(click) caps'); 
 
    } else {
      console.log('(click)' + this.keyText); 
      GKeybLanGlobal.sendKeyboadChar(this.keySend);
      //this.kbsrv.sendKey(this.keySend);//KeyPress$.emit(this.keyText);

    }

   
  }

}


// _initkey1() {
//   const render = this.render;
//   const keyElement = this.refMe.nativeElement;;
//  let char = this.keyb || '';



//  // Creates HTML for an icon
//  const  createIconHTML = (icon_name: string) =>{
//    keyElement.innerHTML = `<i class="material-icons">${icon_name}</i>`;
//  }
//  const setOnClick = (char:string) =>{
//    keyElement.addEventListener("click", () => {  
//      this.sendKeyboardChar(char);
//   });
//  };
  
//  if(char.length == 0) {
     
//    render.setAttribute(keyElement,'display','none');
  
//  }
//  else switch (char) {
//    case "caps": 
//      render.addClass(keyElement,"keyboard__key--wide");
//      render.addClass(keyElement,"keyboard__key--activatable");

//      createIconHTML("keyboard_capslock");

//      keyElement.addEventListener("click", () => {
//          this.native.classList.toggle("keyboard__key--active");
//          this.capsLock = this.native.classList.contains("keyboard__key--active");
//      });

//      return;

//    case "backspace": //\b
//    case "\b":
//      render.addClass(keyElement,"keyboard__key--wide");

//      createIconHTML("backspace");
//      setOnClick("\b");

//      break;
     
//    case "enter"://\n
//    case "\n"://\n
//      render.addClass(keyElement,"keyboard__key--wide");
//      createIconHTML("keyboard_return");
//      setOnClick("\n");

//      break;
   
//    case "space":
//    case " ":
//      render.addClass(keyElement,"keyboard__key--extra-wide");
     
//      createIconHTML("space_bar");
//      setOnClick("\n");

//      break;

//    case "done":
//        keyElement.classList.add("keyboard__key--wide",
//                                "keyboard__key--dark");
//        createIconHTML("check_circle");

//        keyElement.addEventListener("click", () => {
//          //   this.close();
//            this._triggerEventOnClose();
//        });

//        break;

//      default:
//        if(keyData.isChar){
//          keyElement.textContent = char;

//          keyElement.addEventListener("click", () => {
//            this.gdata.sendKeyboardChar(keyElement?.textContent || '');
//            // this.properties.value += this.gdata.capsLock ? keyData.toUpperCase() : keyData.toLowerCase();
             
//          });
//          this.keyboardAZKeys.push(keyElement);
       
//        }
//          break;
   
//  }
      
// private _toggleCapsLock() {
//  this.native.classList.toggle("keyboard__key--active");

//  this.capsLock = this.native.classList.contains("keyboard__key--active");

// }
// sendKeyboardChar(arg0: string) {
//  throw new Error('Method not implemented.');
// }
// // );


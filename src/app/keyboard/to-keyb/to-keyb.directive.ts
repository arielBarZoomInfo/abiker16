import { Directive, 
        ElementRef, 
        HostBinding, 
        HostListener, 
        Input, 
        OnDestroy, 
        OnInit, 
        Renderer2 } from '@angular/core';
//import {  TLangNames } from '../interfaces';
import { FormControl, FormControlName, NgControl } from '@angular/forms';
import { TLangNames2 } from '@app/_interfaces/interfaces';
import {GKeybLanGlobal as G} from '@app/_globals'
import { environment } from '@environments/environment';
/// !!! Important Back Door for Keyb :-)
const TO_LOG_INIT = true;
const TO_LOG_ATTACH = true;
const TO_LOG_DETACH = true;
const TO_BLUR = environment.toBlurKey;

@Directive({
  selector: '[to-keyb]'
})
export class ToKeybDirective implements OnInit , OnDestroy{
  private static _Atttached?: ToKeybDirective;
  public static get Attached() {return ToKeybDirective._Atttached;}

  @Input ( 'to-keyb') alterLang:string  = '';//alternative keyboard if exosts
  @HostBinding() name!: string;
  @HostBinding()  id!:string;
  public f!:FormControl;



  constructor(private hostElt: ElementRef,
    public renderer: Renderer2,
    readonly ngControl:NgControl
    ) {
    
  }
  
  ngOnInit(): void {

    if(this.ngControl instanceof FormControlName){
      const fcName = this.ngControl as FormControlName;
      this.f = fcName.control;
      this.name = '' + fcName.name;

      this.f = this.ngControl.control as FormControl;
      ///!!!
        
 
      if(!this.id || this.id.length < 1){
        this.id = `id-input-to-keyb-${this.name}`;
      }
      if(TO_LOG_INIT){
        console.log(`to-keyb::Init('${this.name}') id:${this.id}`)
      }
      
    }  
   }

   ngOnDestroy(): void {
    if(this.alterLang.length > 1){
        G.clearAlterLang();
   
    }
    
    this.detachKeyboard();
   }


    @HostListener("focus")
    attachKeyboard(){
      this.detachKeyboard();
      ToKeybDirective._Atttached = this;
      this.hostElt.nativeElement.classList.add('attached-to-keyb');
      this.hostElt.nativeElement.setAttribute("attached","");
      if(TO_BLUR && environment.toBlurKey){
        this.hostElt.nativeElement.blur();
      }
 
      if(this.alterLang.length > 1){
        G.setAlterLang(this.alterLang as TLangNames2);
      }
      if(TO_LOG_ATTACH){
        console.log(`@attach: ${this.name} value:"${this.f.value}"` );
      }
    
    }
  


    detachKeyboard() {
      const that = ToKeybDirective._Atttached;
      ToKeybDirective._Atttached = undefined;
      if(that){
        if(that.alterLang.length > 1){
          G.clearAlterLang();
        }
         that.hostElt.nativeElement.classList.remove('attached-to-keyb');
        this.hostElt.nativeElement.removeAttribute("attached");
        if(TO_LOG_DETACH){
          console.log(`@detach: ${that.id} value:"${that.f.value}"` );
        }
      }
 
    }
 
  
}

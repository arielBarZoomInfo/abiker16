import { Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
//import {  TLangNames } from '../interfaces';
import { FormControl, FormControlName, NgControl } from '@angular/forms';
/// !!! Important Back Door for Keyb :-)
export function GGetCurrentInpit(): FormControl | undefined{
  const that  = ToKeybDirective.Attached?.f;
  return that;
}
export function GGetCurrentInpitName(): string{
  const name  = '' + ToKeybDirective.Attached?.name;
  return name;
}

@Directive({
  selector: '[to-keyb]'
})
export class ToKeybDirective implements OnInit , OnDestroy{
  private static _Atttached?: ToKeybDirective;
  public static get Attached() {return ToKeybDirective._Atttached;}

  @Input ( 'to-keyb') alterLang:string  = '';//alternative keyboard if exosts
  @HostBinding() name!: string;
  private _id:string = '';
  public f!:FormControl;



  constructor(private hostElt: ElementRef,
    public renderer: Renderer2,
    readonly ngControl:NgControl
    ) {
    
  }
  ngOnDestroy(): void {
    this.detachKeyboard();
  }

 
  ngOnInit(): void {

    if(this.ngControl instanceof FormControlName){
      const fcName = this.ngControl as FormControlName;
      this.f = fcName.control;
      this.name = '' + fcName.name;

      this.f = this.ngControl.control as FormControl;
      
      console.log(`to-keyb::Init('${this.name}')`)
    }  
   }


    @HostListener("focus")
    attachKeyboard(){
      this.detachKeyboard();
      ToKeybDirective._Atttached = this;
      this.hostElt.nativeElement.classList.add('attached-to-keyb');
      this.hostElt.nativeElement.setAttribute("attached","");
      console.log(`@attach: ${this.name} value:"${this.f.value}"` );
    }
  


    detachKeyboard() {
      const that = ToKeybDirective._Atttached;
      ToKeybDirective._Atttached = undefined;
      if(that){
         that.hostElt.nativeElement.classList.remove('attached-to-keyb');
        this.hostElt.nativeElement.removeAttribute("attached");
        console.log(`@detach: ${that._id} value:"${that.f.value}"` );
      }
 
    }
 
  
}

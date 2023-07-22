import { AfterViewInit, Directive, ElementRef, HostListener, Injector, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { GKeybLanGlobal as G } from '../../_globals/keyb-lang.global';
const TO_LOG = true;

@Directive({
  selector: '[form2keyb]'
})
export class Form2keybDirective 
implements OnInit , AfterViewInit, OnDestroy{

  private subs:Subscription[] = [];
  private inpits:HTMLInputElement[] = [];
  constructor(private hostElt: ElementRef,
    public renderer: Renderer2
    
    ) {
      this.subs.push(
        G.KeyboardEnter$.subscribe(intr=>this.OnKeyEnter(intr))
      )
    
    
  }
  ngOnDestroy(): void {
    this.subs.forEach(subs=>subs.unsubscribe());
  }
  ngOnInit(): void {

      
  }

  ngAfterViewInit(){
    
    const native = this.hostElt.nativeElement as HTMLElement;
    const list:NodeListOf<HTMLInputElement> = native.querySelectorAll('[to-keyb]');
    list.forEach(elt=>this.inpits.push(elt));
    console.dir(this.inpits);
  
    let str = this.inpits.map(p=>p.name).join();
    console.log("Inputs:"+str);

  }

 // @HostListener("keyup.enter")
  OnKeyEnter(intr:string): void { 
    const cname: string = G.AttachedControlName;
   // debugger;
   if(cname.length > 0){
    const ctrl =  this.searchNewFocus(cname);
    ctrl?.focus();
    console.log(`[form2keyb]OnKeyEnter(${intr}): ctrl:${cname}`)
 
   }
 
  }
  searchNewFocus(cname:string) : HTMLInputElement | null{
    const len = this.inpits.length;
 
   if(len < 2){
     return null;
   }
   let i = 0;
   for (  ;i < len ;i++) {
     const element = this.inpits[i];
     if(element.name === cname){
       i++;
       break;
      
     }
   }
   const ret = (i < len) ? this.inpits[i] : this.inpits[0];
   return ret;
   
 }
}

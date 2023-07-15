import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToKeybDirective } from './_directives/to-keyb.directive';
import { Form2keybDirective } from './_directives/form2keyb.directive';



@NgModule({
  imports: [
    CommonModule
  ],
 declarations: [
    ToKeybDirective,
    Form2keybDirective
  ],
   exports: [
    ToKeybDirective,
    Form2keybDirective
  ]
})
export class ToKeybModule { }

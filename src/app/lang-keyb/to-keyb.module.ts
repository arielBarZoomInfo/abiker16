import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToKeybDirective } from '../_directives/to-keyb.directive';
import { Form2keybDirective } from '../_directives/form2keyb.directive';
import { ErrInputPanelComponent } from './err-input-panel/err-input-panel.component';


@NgModule({
  imports: [
    CommonModule
  ],
 declarations: [
    ToKeybDirective,
    Form2keybDirective,
    ErrInputPanelComponent
    
  ],
   exports: [
    ToKeybDirective,
    Form2keybDirective,
    ErrInputPanelComponent
    
  ]
})
export class ToKeybModule { }

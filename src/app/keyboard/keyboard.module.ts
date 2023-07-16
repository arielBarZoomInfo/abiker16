import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyComponent } from './key/key.component';
import { KeyboardMultiComponent } from './keyboard-multi/keyboard-multi.component';
import { LangKeyboardComponent } from './lang-keyboard/lang-keyboard.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    KeyComponent,
    LangKeyboardComponent,
    KeyboardMultiComponent

  ],
  exports:[
    KeyComponent,
    LangKeyboardComponent,
    KeyboardMultiComponent
  ]

})
export class KeyboardModule { }

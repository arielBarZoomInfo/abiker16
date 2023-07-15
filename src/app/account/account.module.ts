import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
//import { ToKeybDirective } from '@app/lang-keyb/_directives/to-keyb.directive';
import { ToKeybModule } from '@app/lang-keyb/to-keyb.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule,
        ToKeybModule
    ],
    declarations: [
        LayoutComponent,
        LoginComponent,
        RegisterComponent
        
    ]
})
export class AccountModule { }
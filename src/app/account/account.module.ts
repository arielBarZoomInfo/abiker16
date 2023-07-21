import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login//login.component';
import { RegisterComponent } from './register/register.component';
//import { ToKeybDirective } from '@app/lang-keyb/_directives/to-keyb.directive';
import { ToKeybModule } from '@app/lang-keyb/to-keyb.module';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { TextMaskModule } from '@myndmanagement/text-mask';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule,
        ToKeybModule,
        TextMaskModule
    ],
    declarations: [
        LayoutComponent,
        LoginComponent,
        RegisterComponent,
        CreditCardComponent
        
    ]
})
export class AccountModule { }
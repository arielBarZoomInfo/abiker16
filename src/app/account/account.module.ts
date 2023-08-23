import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login//login.component';
import { RegisterComponent } from './register/register.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { TextMaskModule } from '@myndmanagement/text-mask';
import { ToKeybModule } from '@app/keyboard/to-keyb/to-keyb.module';
import { SelectLanguageComponent as SelectLanguagePageComponent } from '@app/_pages/select-language-page/select-language.page.component';


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
        CreditCardComponent,
        SelectLanguagePageComponent
        
    ],
    exports:[
        LayoutComponent,
        LoginComponent,
        RegisterComponent,
        CreditCardComponent,
        SelectLanguagePageComponent
       
    ]
})
export class AccountModule { }
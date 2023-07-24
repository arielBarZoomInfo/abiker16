import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreditCardComponent } from './credit-card/credit-card.component';

const routes: Routes = [
    {
        path: 'auth', component: LayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },//,
            { path: 'visa', component: CreditCardComponent },
            { path: 'credit-card', component: CreditCardComponent },//,
            { path: '**', redirectTo: 'register' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { AccountModule } from './account/account.module';
import { UsersModule } from './users/users.module';
const accountModule = () =>UsersModule;
const usersModule = () =>AccountModule;
// const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
// const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [ 
//    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'users', loadChildren: accountModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: usersModule },
   /// { path: 'lang-keyb', loadChildren: () => import('./lang-keyb/lang-keyb.module').then(m => m.LangKeybModule) },

    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [
        AccountModule,
        UsersModule,

        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// import { AuthGuard } from './_helpers';
// import { AccountModule } from './account/account.module';
// import { UsersModule } from './users/users.module';
import { HomePageComponent } from './_pages/home-page/home-page.component';
//const accountModule = () =>UsersModule;
//const usersModule = () =>AccountModule;
// const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
// const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [ 
     { path: 'home', component: HomePageComponent},
     { path: '', component: HomePageComponent },

    // { path: 'users', loadChildren: accountModule, canActivate: [AuthGuard] },
    // { path: 'account', loadChildren: usersModule },
 
    // otherwise redirect to home
    { path: '**', redirectTo: './home' }
];

@NgModule({
    imports: [
      //  AccountModule,
      //  UsersModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';

import { AccountModule } from './account/account.module';
import { UsersModule } from './users/users.module';


import { KeyboardModule } from './keyboard/keyboard.module';
import { TextMaskModule } from '@myndmanagement/text-mask';
import { ToKeybModule } from './keyboard/to-keyb/to-keyb.module';


@NgModule({
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
       
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        KeyboardModule,
        ToKeybModule,
        TextMaskModule,
       
        AccountModule,
        UsersModule,
       
        
    ],
   
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
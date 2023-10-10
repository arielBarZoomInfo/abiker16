import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { FakeBackendProvider } from './_helpers';

//import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';

import { KeyboardModule } from './keyboard/keyboard.module';
import { TextMaskModule } from '@myndmanagement/text-mask';
import { ToKeybModule } from './keyboard/to-keyb/to-keyb.module';
import { RegisterFrameComponent } from './frames/register/register.frame.component';
import { CreditCardFrameComponent } from './frames/credit-card/credit-card.frame.component';
import { HomePageComponent } from './home-page.component';
import { ErrInputPanelComponent } from './keyboard/to-keyb/err-input-panel.component';



@NgModule({
    declarations: [
        AppComponent,
        AlertComponent,
        HomePageComponent,
       
        RegisterFrameComponent,
        CreditCardFrameComponent

    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
       
        KeyboardModule,
        ToKeybModule,
        TextMaskModule,
       
    ],
   
    providers: [
        // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

      // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        FakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
/* beautify preserve:start */
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRouteModule} from './app-route/app-route.module';
import { FormsModule }   from '@angular/forms';
import {HttpModule} from "@angular/http";

import {AppComponent} from './app.component';
import {KantinCrud} from './pages/kantin/kantin.component';
import {HttpUtilService} from './pages/kantin/http.util';
import {MenuKantinService} from './pages/kantin/kantin.service';
import { TextMaskModule } from 'angular2-text-mask';




/* beautify preserve:end */

@NgModule({
    imports: [
        // start_imports
        BrowserModule,
        FormsModule,
        AppRouteModule,
        ReactiveFormsModule,
        HttpModule,
        TextMaskModule
        // end_imports
    ],
    declarations: [
        // start_declarations
        AppComponent,
        KantinCrud
        // end_declarations
    ],
    providers: [
        MenuKantinService,
        HttpUtilService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

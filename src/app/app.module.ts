import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CoreModule} from 'core/core.module';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGuard} from "../core/guards/auth.guard";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}

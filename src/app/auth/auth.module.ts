import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from './pages/auth/auth.component';
import {SharedModule} from "../../shared";

const routes: Routes = [
    {path: '', component: AuthComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        AuthComponent
    ],
})
export class AuthModule {
}

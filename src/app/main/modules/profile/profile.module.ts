import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../../shared";

const routes: Routes = [
    {path: '', component: ProfilePageComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    declarations: [
        ProfilePageComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
})
export class ProfileModule {
}

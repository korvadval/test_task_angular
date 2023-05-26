import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BillingPageComponent} from './pages/billing-page/billing-page.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
    {path: '', component: BillingPageComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];


@NgModule({
    declarations: [
        BillingPageComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class BillingModule {
}

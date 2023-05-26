import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ReportsPageComponent} from './pages/reports-page/reports-page.component';

const routes: Routes = [
    {path: '', component: ReportsPageComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    declarations: [
        ReportsPageComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ]
})
export class ReportsModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InventoryPageComponent} from './pages/inventory-page/inventory-page.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
    {path: '', component: InventoryPageComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];


@NgModule({
    declarations: [
        InventoryPageComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class InventoryModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProfileService, SharedModule} from "../../shared";
import {HeaderComponent} from './components/header/header.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {LeftMenuComponent} from './components/left-menu/left-menu.component';

const routes: Routes = [
    {
        path: '',
        component: MainPageComponent,
        children: [
            {
                path: 'home',
                loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
            },
            {
                path: 'inventory',
                loadChildren: () => import('./modules/inventory/inventory.module').then(m => m.InventoryModule)
            },
            {
                path: 'reports',
                loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule)
            },
            {
                path: 'billing',
                loadChildren: () => import('./modules/billing/billing.module').then(m => m.BillingModule)
            },
            {
                path: 'profile',
                loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
        ]
    },
];

@NgModule({
    declarations: [
        HeaderComponent,
        MainPageComponent,
        LeftMenuComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
    ],
    providers: [ProfileService]
})
export class MainModule {
}

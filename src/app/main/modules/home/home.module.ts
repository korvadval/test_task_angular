import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {HomePageComponent} from "./pages/home-page/home-page.component";

const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    declarations: [
        HomePageComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],

})
export class HomeModule {
}

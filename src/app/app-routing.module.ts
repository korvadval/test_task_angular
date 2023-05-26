import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../core/guards/auth.guard";

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('app/main/main.module').then(m => m.MainModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('app/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private _auth: AuthService,
        private router: Router
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!!this._auth.auth_token || state.url.includes('auth')) {
            return true
        } else {
            return this.router.parseUrl(`/auth?to=${state.url}`)
        }
    }

}

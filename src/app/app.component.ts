import {Component} from '@angular/core';
import {AuthService} from "../core/services";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    constructor(
        private _auth: AuthService
    ) {
        if (localStorage['auth_token']) {
            this._auth.authToken = localStorage['auth_token']
        }
    }
}

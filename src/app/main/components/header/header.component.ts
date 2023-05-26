import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../../core/services";
import {IUserProfile, ProfileService} from "../../../../shared";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

    @Output() toggleLeftMenu = new EventEmitter()

    user_profile: IUserProfile | null = null

    success_message = ''

    constructor(
        private _auth: AuthService,
        private _profile: ProfileService,
    ) {
        this._profile.user_profile$.pipe(untilDestroyed(this))
            .subscribe(user_profile => {
                this.user_profile = user_profile
            })

        this._profile.success_message$.pipe(untilDestroyed(this))
            .subscribe(message => {
                this.success_message = message
            })
    }

    logout() {
        this._auth.logout()
        window.location.reload()
    }

    ngOnInit(): void {
    }
}

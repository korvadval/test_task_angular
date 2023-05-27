import {Component, HostListener} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {IUserProfile, ProfileService} from "../../../../../../shared";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {IForm} from "../../../../../../shared/interfaces/shared_interfaces";

@UntilDestroy()
@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.less', '../../../../styles/main-page.less']
})
export class ProfilePageComponent {
    @HostListener('document:keypress', ['$event'])
    onKeyPress(event: KeyboardEvent) {
        if (event.code === 'Enter') {
            this.saveInfo()
        }
    }

    user_profile: IForm = {
        email: {value: '', error: ''},
        first_name: {value: '', error: ''},
        last_name: {value: '', error: ''},
        phone_number: {value: '', error: ''},
        website_url: {value: '', error: ''},
    }

    success_message_timeout: NodeJS.Timeout | undefined = undefined

    is_info_sending: boolean = false

    constructor(
        private _title: Title,
        private _profile: ProfileService,
    ) {
        this._title.setTitle('Profile')

        this._profile.user_profile$.pipe(untilDestroyed(this))
            .subscribe(user_profile => {
                Object.keys(user_profile).forEach(key => {
                    this.user_profile[key].value = user_profile[key as keyof IUserProfile]
                })
            })
    }

    setErrorOnControl(control: string, error: string): void {
        this.user_profile[control].error = ''

        setTimeout(() => {
            this.user_profile[control].error = error
        }, 50)
    }

    clearErrorOnControl(control: string) {
        this.user_profile[control].error = ''
    }

    saveInfo() {
        this.is_info_sending = true

        const profile_to_send: Partial<IUserProfile> = {}

        Object.keys(this.user_profile).forEach(key => {
            this.clearErrorOnControl(key)
            profile_to_send[key as keyof IUserProfile] = this.user_profile[key].value
        })


        this._profile.setUserProfile(profile_to_send as IUserProfile).subscribe(data => {
            this.is_info_sending = false
            if (data.errors) {
                Object.keys(data.errors).forEach(key => this.setErrorOnControl(key, data.errors![key]))
            }

            if (data.response) {
                this._profile.success_message = 'Данные успешно сохранены!'
                clearTimeout(this.success_message_timeout)
                this.success_message_timeout = setTimeout(() => this._profile.success_message, 30 * 1000)
            }
        })
    }
}

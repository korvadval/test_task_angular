import {Component, HostListener} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {IUserProfile, ProfileService} from "../../../../../../shared";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

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

    user_profile: IUserProfile | null = null
    errors = {
        first_name: '',
        last_name: '',
        phone_number: '',
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
                this.user_profile = JSON.parse(JSON.stringify(user_profile))
            })
    }

    setErrorOnControl(control: 'first_name' | 'last_name' | 'phone_number', error: string): void {
        this.errors[control] = ''

        setTimeout(() => {
            this.errors[control] = error
        }, 50)
    }

    clearErrorOnControl(control: 'first_name' | 'last_name' | 'phone_number') {
        this.errors[control] = ''
    }

    saveInfo() {
        this.is_info_sending = true
        this.clearErrorOnControl('first_name')
        this.clearErrorOnControl('last_name')
        this.clearErrorOnControl('phone_number')

        this._profile.setUserProfile(this.user_profile as IUserProfile).subscribe(data => {
            this.is_info_sending = false
            if (data.errors) {
                if (data.errors['first_name']) {
                    this.setErrorOnControl('first_name', data.errors['first_name'])
                }
                if (data.errors['last_name']) {
                    this.setErrorOnControl('last_name', data.errors['last_name'])
                }
                if (data.errors['phone_number']) {
                    this.setErrorOnControl('phone_number', data.errors['phone_number'])
                }
            }

            if (data.response) {
                this._profile.success_message = 'Данные успешно сохранены!'
                clearTimeout(this.success_message_timeout)
                this.success_message_timeout = setTimeout(() => this._profile.success_message, 30 * 1000)
            }
        })
    }
}

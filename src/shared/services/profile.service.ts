import {Injectable} from '@angular/core';
import {BehaviorSubject, delay, Observable, of, take, tap} from 'rxjs';
import {IResponse} from "../interfaces/http-interfaces";

export interface IUserProfile {
    readonly email: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    website_url?: string,
}

@Injectable()
export class ProfileService {
    private _user_profile$ = new BehaviorSubject<IUserProfile>({
        email: 'example_email@yandex.ru',
        first_name: 'MyFirstName',
        last_name: 'AndLastName',
        phone_number: '9080199890',
        website_url: 'www.google.com'
    })
    readonly user_profile$ = this._user_profile$.asObservable()

    private _success_message$ = new BehaviorSubject<string>('')
    readonly success_message$ = this._success_message$.asObservable()

    public set success_message(value: string) {
        this._success_message$.next(value)
    }

    public setUserProfile(value: IUserProfile): Observable<IResponse<boolean>> {

        const errors: { first_name?: string, last_name?: string, phone_number?: string, } = {}

        const first_name_error = this._checkLengthErrors(value.first_name)
        if (first_name_error.length) {
            errors.first_name = first_name_error
        }

        const last_name_error = this._checkLengthErrors(value.last_name)
        if (last_name_error.length) {
            errors.last_name = last_name_error
        }

        const phone_number_error = this._checkPhoneErrors(value.phone_number)
        if (phone_number_error.length) {
            errors.phone_number = phone_number_error
        }

        if (!Object.keys(errors).length) {
            return of({response: true})
                .pipe(
                    take(1),
                    delay(1500),
                    tap(() => {
                        this._user_profile$.next(value)
                    })
                ) //used delay to simulate a server response
        } else {
            return of({errors: errors})
                .pipe(
                    take(1),
                    delay(1500)
                ) //used delay to simulate a server response
        }

    }

    private _checkLengthErrors(value: string): string {
        if (!value.length) {
            return 'Required field.'
        } else if (value.length < 3) {
            return 'This field cannot be shorter than 3 characters.'
        } else if (value.length > 256) {
            return 'This field cannot be longer than 256 characters.'
        }
        return ''
    }

    private _checkPhoneErrors(value: string): string {
        value = value.replace('+7', '')
        if (!value.length) {
            return 'Required field.'
        } else if (value.length < 10) {
            return 'This field cannot be shorter than 10 characters.'
        }
        return ''
    }
}

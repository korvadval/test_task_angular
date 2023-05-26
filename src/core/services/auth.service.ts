import {Injectable} from '@angular/core'
import {delay, Observable, of, take, tap} from "rxjs";
import {IResponse} from "../../shared/interfaces/http-interfaces";

@Injectable({providedIn: 'root'})
export class AuthService {
    auth_token: string | null = null

    public set authToken(value: string) {
        this.auth_token = value
    }

    public login(username: string, password: string): Observable<IResponse<boolean>> {
        if (username === 'admin' && password === 'admin') {
            return of({response: true})
                .pipe(
                    take(1),
                    delay(1500),
                    tap(() => {
                        this.auth_token = 'example_token'
                        this._synchronizeLS()
                    })
                ) //used delay to simulate a server response
        } else {
            const errors: { username?: string, password?: string } = {}

            if (!username.length) {
                errors.username = 'Required field.'
            } else if (username !== 'admin') {
                errors.username = 'Wrong user name.'
            }

            if (!password.length) {
                errors.password = 'Required field.'
            } else if (password !== 'admin') {
                errors.password = 'Wrong password.'
            }
            return of({errors: errors})
                .pipe(
                    take(1),
                    delay(1500)
                ) //used delay to simulate a server response
        }
    }

    public logout(): void {
        this.auth_token = null
        this._synchronizeLS()
    }

    private _synchronizeLS(): void {
        if (this.auth_token) {
            localStorage['auth_token'] = this.auth_token
        } else {
            localStorage.clear()
        }
    }
}

import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from "../../../../core/services";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {
    @HostListener('document:keypress', ['$event'])
    onKeyPress(event: KeyboardEvent) {
        if (event.code === 'Enter') {
            this.login()
        }
    }

    controls = {
        username: {value: '', error: ''},
        password: {value: '', error: ''},
    }

    is_sending: boolean = false

    constructor(
        private _auth: AuthService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
    }

    setErrorOnControl(control: 'username' | 'password', error: string): void {
        this.controls[control].error = ''

        setTimeout(() => {
            this.controls[control].error = error
        }, 50)
    }

    clearErrorOnControl(control: 'username' | 'password') {
        this.controls[control].error = ''
    }

    login(): void {
        this.is_sending = true
        this.clearErrorOnControl('username')
        this.clearErrorOnControl('password')

        this._auth.login(this.controls.username.value, this.controls.password.value)
            .subscribe(data => {
                this.is_sending = false

                if (data.response) {
                    this._route.queryParams.pipe(take(1)).subscribe(data => {

                        if (data['to']) {
                            this._router.navigate([data['to']])
                        } else {
                            this._router.navigate(['/home'])
                        }
                    })
                }

                if (data.errors) {
                    if (data.errors['username']) {
                        this.setErrorOnControl('username', data.errors['username'])
                    }
                    if (data.errors['password']) {
                        this.setErrorOnControl('password', data.errors['password'])
                    }
                }
            })
    }

    ngOnInit(): void {
    }
}

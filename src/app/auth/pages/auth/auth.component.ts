import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from "../../../../core/services";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs";
import {IForm} from "../../../../shared/interfaces/shared_interfaces";

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

    controls: IForm = {
        username: {value: '', error: ''},
        password: {value: '', error: ''}
    }

    is_sending: boolean = false

    constructor(
        private _auth: AuthService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
    }

    setErrorOnControl(control: string, error: string): void {
        this.controls[control].error = ''

        setTimeout(() => {
            this.controls[control].error = error
        }, 50)
    }

    clearErrorOnControl(control: string) {
        this.controls[control].error = ''
    }

    login(): void {
        this.is_sending = true

        Object.keys(this.controls).forEach(key => this.clearErrorOnControl(key))

        this._auth.login(this.controls['username'].value, this.controls['password'].value)
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
                    Object.keys(data.errors).forEach(key => this.setErrorOnControl(key, data.errors![key]))
                }
            })
    }

    ngOnInit(): void {
    }
}

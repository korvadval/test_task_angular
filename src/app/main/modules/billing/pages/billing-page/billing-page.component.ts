import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-billing-page',
    templateUrl: './billing-page.component.html',
    styleUrls: ['./billing-page.component.less', '../../../../styles/main-page.less']
})
export class BillingPageComponent {

    constructor(
        private _title: Title
    ) {
        this._title.setTitle('Billing')
    }
}

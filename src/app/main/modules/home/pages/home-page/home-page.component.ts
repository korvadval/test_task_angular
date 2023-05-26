import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.less', '../../../../styles/main-page.less']
})
export class HomePageComponent {

    constructor(
        private _title: Title
    ) {
        this._title.setTitle('Billing')
    }
}

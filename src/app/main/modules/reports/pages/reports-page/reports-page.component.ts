import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-reports-page',
    templateUrl: './reports-page.component.html',
    styleUrls: ['./reports-page.component.less', '../../../../styles/main-page.less']
})
export class ReportsPageComponent {

    constructor(
        private _title: Title
    ) {
        this._title.setTitle('Reports')
    }
}

import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-inventory-page',
    templateUrl: './inventory-page.component.html',
    styleUrls: ['./inventory-page.component.less', '../../../../styles/main-page.less']
})
export class InventoryPageComponent {

    constructor(
        private _title: Title
    ) {
        this._title.setTitle('Inventory')
    }
}

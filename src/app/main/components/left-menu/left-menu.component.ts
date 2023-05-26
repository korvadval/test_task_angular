import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface INavNode {
    name: string,
    link: string,
}

@Component({
    selector: 'app-left-menu',
    templateUrl: './left-menu.component.html',
    styleUrls: ['./left-menu.component.less']
})
export class LeftMenuComponent implements OnInit {
    @Output() toggleMenu = new EventEmitter()

    @Input() animate_menu_class = ''
    @Input() animate_overlay_class = ''

    nav_nodes: INavNode[] = [
        {name: 'Home', link: '/home'},
        {name: 'Inventory', link: '/inventory'},
        {name: 'Reports', link: '/reports'},
        {name: 'Billing', link: '/billing'},
        {name: 'Profile', link: '/profile'},
    ]

    constructor() {
    }

    ngOnInit(): void {
    }
}

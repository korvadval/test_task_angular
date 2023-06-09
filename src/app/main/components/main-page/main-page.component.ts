import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit {

    is_left_menu_opened = false
    animate_menu_class = 'animate__animated animate__fadeInLeft'
    animate_overlay_class = 'animate__animated animate__fadeIn'

    constructor() {
    }

    toggleLeftMenu() {
        if (this.is_left_menu_opened) {
            this.animate_menu_class = 'animate__animated animate__fadeOutLeft'
            this.animate_overlay_class = 'animate__animated animate__fadeOut'
            setTimeout(() => this.is_left_menu_opened = false, 600)
        } else {
            this.animate_menu_class = 'animate__animated animate__fadeInLeft'
            this.animate_overlay_class = 'animate__animated animate__fadeIn'
            this.is_left_menu_opened = true
        }
    }

    ngOnInit(): void {
    }

}

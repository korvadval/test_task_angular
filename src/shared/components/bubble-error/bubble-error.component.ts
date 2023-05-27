import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

export interface IBubbleErrorOffset {
    top: number,
    left: number
}

@Component({
    selector: 'app-bubble-error',
    templateUrl: './bubble-error.component.html',
    styleUrls: ['./bubble-error.component.less']
})
export class BubbleErrorComponent implements OnInit, AfterViewInit {
    @ViewChild('message_container') message_container!: ElementRef

    @Input() textError: string = ''
    @Input() offset: IBubbleErrorOffset = {
        top: 6,
        left: 0
    }

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.message_container.nativeElement.style.top = this.offset.top + 'px'
        this.message_container.nativeElement.style.left = this.offset.left + 'px'
    }
}

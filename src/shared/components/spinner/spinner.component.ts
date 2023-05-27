import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.less']
})
export class SpinnerComponent implements OnInit, AfterViewInit {
    @ViewChild('spinner') spinner!: ElementRef

    @Input() diameter: number = 32

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.spinner.nativeElement.style.height = this.diameter + 'px'
        this.spinner.nativeElement.style.width = this.diameter + 'px'
    }
}

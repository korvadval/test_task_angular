import {EventEmitter, OnChanges} from '@angular/core';
import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.less']
})
export class ButtonComponent implements OnInit, OnChanges {
    @Input() size: 36 | 48 | 59 = 48
    @Input() extra_classes = {}

    @Input() type: 'primary' | 'accent' = 'primary'

    @Input() is_stroked: boolean = false
    @Input() is_not_border: boolean = false

    @Input() is_loading: boolean = false
    @Input() is_disabled: boolean = false

    @Output() handle_click = new EventEmitter()
    @Output() disabled_click = new EventEmitter()

    classes = {}

    constructor() {
    }

    handleClick() {
        if (this.is_disabled || this.is_loading) {
            return
        }
        this.handle_click.emit()
    }

    private _setClasses() {
        this.classes = {
            'size_36': this.size === 36,
            'size_48': this.size === 48,
            'size_59': this.size === 59,

            'primary': this.type === "primary",
            'accent': this.type === "accent",

            'stroked': this.is_stroked,
            'not_border': this.is_not_border,

            'disabled': this.is_disabled,
            'loading': this.is_loading,
            ...this.extra_classes
        }
    }

    ngOnInit(): void {
        this._setClasses()
    }

    ngOnChanges(): void {
        this._setClasses()
    }
}

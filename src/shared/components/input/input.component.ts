import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {IBubbleErrorOffset} from "../bubble-error/bubble-error.component";

export type IRightButtonName =
    '' |
    'clear' |
    'expand_more' |
    'search' |
    'visibility' |
    'visibility_off'

export type InputFieldType = 'default' | 'border-bottom'

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.less']
})
export class InputComponent implements OnInit, OnChanges {
    @ViewChild('input_control') input_control_ref: any
    @ViewChild('main_container') main_container: any

    @Input() size: 36 | 48 | 59 = 48
    @Input() field_type: InputFieldType = "default"

    @Input() value: any
    @Output() valueChange: EventEmitter<any> = new EventEmitter()

    @Input() label: string = ''
    @Input() placeholder: string = ''

    @Input() input_type: 'text' | 'password' = 'text'
    @Input() right_button: IRightButtonName = ''

    @Input() is_required: boolean = false
    @Input() is_disabled: boolean = false
    @Input() is_not_editable: boolean = false
    @Input() is_phone_mask: boolean = false

    @Input() is_textarea: boolean = false

    @Input() error_message: string = ''

    @Input() extra_classes: Object = {}

    @Output() focus_in: EventEmitter<boolean> = new EventEmitter()
    @Output() focus_out: EventEmitter<boolean> = new EventEmitter()

    @Output() input_clear: EventEmitter<boolean> = new EventEmitter()

    @Output() click_right_button = new EventEmitter()
    @Output() not_editable_click = new EventEmitter()

    is_focused: Boolean = false
    is_password: Boolean = false

    old_label: IRightButtonName = ''
    old_label_fixed: Boolean = false

    classes = {}
    error_offset: IBubbleErrorOffset = {
        top: 0,
        left: 14
    }

    constructor() {
    }

    handleInput(event: Event | string) {
        let value: string
        if (typeof event !== 'string') {
            value = (event.target as HTMLInputElement).value
        } else {
            value = event
        }

        this.value = value
        this.valueChange.emit(value)

        if (!this.is_password) {
            if (value?.length) {
                if (!this.old_label_fixed) {
                    this.old_label = this.right_button
                    this.old_label_fixed = true
                }
                this.right_button = 'clear'
            } else {
                this.right_button = this.old_label
            }
        }

        if (this.is_phone_mask) {

        }

        this.setActualClasses()
    }

    setActualClasses() {
        this.classes = {
            'size_59': this.size === 59 && !this.is_textarea,
            'size_48': this.size === 48 && !this.is_textarea,
            'size_36': this.size === 36 && !this.is_textarea,
            'type_border-bottom': this.field_type === 'border-bottom',
            'focused': this.is_focused,
            'has-value': this.value,
            'not-has-label': !this.label,
            'disabled': this.is_disabled,
            'has-error': this.error_message.length,
            'has-right-button': this.right_button.length,
            'textarea': this.is_textarea,
            ...this.extra_classes
        }

        switch (this.size) {
            case 36:
                this.error_offset.top = 36
                break
            case 48:
                this.error_offset.top = 42
                break
            case 59:
                this.error_offset.top = 49
                break
        }

    }

    onFocusIn() {
        this.is_focused = true
        this.focus_in.emit()
        this.setActualClasses()
    }

    onFocusOut() {
        this.is_focused = false
        this.focus_out.emit()
        this.setActualClasses()
    }

    clickRightButton(event: MouseEvent) {
        this.click_right_button.emit({event: event, button_type: this.right_button})
        if (this.is_password) {
            this.input_type = this.input_type === 'text' ? 'password' : 'text'
            this.right_button = this.right_button === 'visibility' ? 'visibility_off' : 'visibility'
        } else if (this.right_button === 'clear') {
            this.handleInput('')
            this.input_clear.emit()
        } else if (this.right_button === 'search') {
            this.setFocus()
        }
        this.setActualClasses()
    }

    notEditableClick() {
        this.not_editable_click.emit()
    }

    public setFocus(value = true) {
        if (value) {
            this.input_control_ref.nativeElement.focus()
        } else {
            this.input_control_ref.nativeElement.blur()
        }
    }

    ngOnInit(): void {
        this.old_label = this.right_button

        if (this.input_type === 'password') {
            this.right_button = 'visibility'
            this.is_password = true
        }

        this.handleInput(this.value)
        this.setActualClasses()
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.setActualClasses()
    }
}

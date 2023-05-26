import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
    selector: '[phoneMask]'
})
export class PhoneMaskDirective {
    @Input('phoneMask') set isNeedMask(value: boolean) {
        this.is_need_mask = value
    }

    el: HTMLInputElement
    is_need_mask: boolean = false

    constructor(
        private _elementRef: ElementRef,
    ) {
        this.el = this._elementRef.nativeElement
    }

    ngOnInit() {
        setTimeout(() => {
            if (this.is_need_mask) {
                this.el.dispatchEvent(new Event('input'))
            }
        }, 10)
    }

    @HostListener("input", ["$event"])
    onInput(e: any) {
        if (!this.is_need_mask) {
            return;
        }
        const input = e.target,
            selectionStart = input.selectionStart
        let inputNumbersValue = this.getNumbersValue(input.value),
            formattedInputValue = ""

        if (!inputNumbersValue) {
            input.value = ""
            return
        }

        if (input.value.length !== selectionStart) {
            // Editing in the middle of input, not last symbol
            if (e.data && /\D/g.test(e.data)) {
                // Attempt to input non-numeric symbol
                input.value = inputNumbersValue
                e.target.dispatchEvent(new Event('input'))
                return
            }
            if (input.value.length > 18) {
                input.value = input.value.substring(0, selectionStart - 1) + input.value.substring(selectionStart, input.value.length)
                e.target.dispatchEvent(new Event('input'))
                return
            }
            return
        }

        if (inputNumbersValue[0] !== "8" && inputNumbersValue[0] !== "7") {
            inputNumbersValue = "7" + inputNumbersValue
        }

        const firstSymbols = (inputNumbersValue[0] === "8") ? "+7" : "+7"
        formattedInputValue = input.value = firstSymbols + " "

        if (inputNumbersValue.length > 1) {
            formattedInputValue += '(' + inputNumbersValue.substring(1, 4)
        }
        if (inputNumbersValue.length >= 5) {
            formattedInputValue += ') ' + inputNumbersValue.substring(4, 7)
        }
        if (inputNumbersValue.length >= 8) {
            formattedInputValue += '-' + inputNumbersValue.substring(7, 9)
        }
        if (inputNumbersValue.length >= 10) {
            formattedInputValue += '-' + inputNumbersValue.substring(9, 11)
        }

        input.value = formattedInputValue
    }

    getNumbersValue(value: string) {
        return value.replace(/\D/g, '')
    }
}

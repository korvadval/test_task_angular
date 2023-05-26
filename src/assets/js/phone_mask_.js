export class PhoneMask {
    phoneInput

    constructor(phoneInput) {
        this.phoneInput = phoneInput
        this.phoneInput.addEventListener('keydown', this.onPhoneKeyDown.bind(this))
        this.phoneInput.addEventListener('input', this.onPhoneInput.bind(this), false)
        this.phoneInput.addEventListener('paste', this.onPhonePaste.bind(this), false)
        phoneInput.dispatchEvent(new Event('input'))
    }

    static initAll(selector) {
        if (!selector) {
            selector = 'input[data-tel-format]'
        }
        const phoneInputs = document.querySelectorAll(selector)
        for (let phoneInput of phoneInputs) {
            new PhoneMask(phoneInput)
        }
    }

    onDestroy() {
        this.phoneInput.removeEventListener('keydown', this.onPhoneKeyDown.bind(this))
        this.phoneInput.removeEventListener('input', this.onPhoneInput.bind(this), false)
        this.phoneInput.removeEventListener('paste', this.onPhonePaste.bind(this), false)
    }

    getInputNumbersValue(input) {
        // Return stripped input value — just numbers
        return input.value.replace(/\D/g, '')
    }

    onPhonePaste(e) {
        const input = e.target,
            inputNumbersValue = this.getInputNumbersValue(input)

        const pasted = e.clipboardData || window.clipboardData

        if (pasted) {
            const pastedText = pasted.getData('Text')

            if (/\D/g.test(pastedText)) {
                // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
                // formatting will be in onPhoneInput handler
                input.value = inputNumbersValue
                // e.target.dispatchEvent(new Event('input'))
            }
        }
    }

    onPhoneInput(e) {
        const input = e.target,
            selectionStart = input.selectionStart
        let inputNumbersValue = this.getInputNumbersValue(input),
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

    onPhoneKeyDown(e) {
        // Clear input after remove last symbol

        if (e.keyCode === 8) {
            const v = e.target.value
            if (v.length > 0) {
                const inputValue = v.slice(0, -1).replace(/\D/g, '')
                if (inputValue.length <= 1) {
                    // Останавливаем событие input
                    e.stopPropagation()

                    e.target.value = ""
                    // e.target.dispatchEvent(new Event('change'))
                    e.target.dispatchEvent(new Event('input'))
                }
            }
        }
    }
}

export interface IFormControl {
    value: string,
    error: string
}

export interface IForm {
    [prop: string]: IFormControl
}

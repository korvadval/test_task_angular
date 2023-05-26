import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {BubbleErrorComponent, ButtonComponent, InputComponent, SpinnerComponent} from "./components";
import {FormsModule} from "@angular/forms";
import {PhoneMaskDirective} from './directives';

const COMPONENTS = [
    ButtonComponent,
    SpinnerComponent,
    InputComponent,
    BubbleErrorComponent
]
const DIRECTIVES = [
    PhoneMaskDirective
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [...COMPONENTS, ...DIRECTIVES],
    exports: [...COMPONENTS],
})
export class SharedModule {
}

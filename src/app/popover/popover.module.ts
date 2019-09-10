import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './components';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        PopoverComponent,
    ],
    exports: [
        PopoverComponent,
    ],
})

export class PopoverModule {}

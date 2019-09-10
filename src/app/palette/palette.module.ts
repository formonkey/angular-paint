import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoverModule } from '../popover';
import { PaletteComponent } from './components';

@NgModule({
    imports: [
        CommonModule,

        PopoverModule,
    ],
    declarations: [
        PaletteComponent,
    ],
    exports: [
        PaletteComponent,
    ],
})

export class PaletteModule {}

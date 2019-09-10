import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoverModule } from '../popover';
import { BrushComponent } from './components';

@NgModule({
    imports: [
        CommonModule,

        PopoverModule,
    ],
    declarations: [
        BrushComponent,
    ],
    exports: [
        BrushComponent,
    ],
})

export class BrushModule {}

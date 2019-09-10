import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CanvasModule } from '../canvas';
import { BrushModule } from '../brushes';
import { PaletteModule } from '../palette';
import { BootstrapComponent } from './components';

@NgModule({
    imports: [
        BrowserModule,

        BrushModule,
        CanvasModule,
        PaletteModule,
    ],
    declarations: [
        BootstrapComponent,
    ],
    bootstrap: [
        BootstrapComponent,
    ],
})

export class BootstrapModule {}

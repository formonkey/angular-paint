import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FabricFactory } from './factories';
import { CanvasComponent } from './components';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        CanvasComponent,
    ],
    providers: [
        {
            provide: 'Fabric',
            useValue: FabricFactory,
        },
    ],
    exports: [
        CanvasComponent,
    ],
})

export class CanvasModule {}

import { Component, EventEmitter, Output } from '@angular/core';

import { IBrush } from '../interfaces';
import { BrushSizes } from '../constants';
import { BrushSize, BrushSizeNameEnum } from '../enums';

@Component({
    selector: 'apa-brush',
    templateUrl: './brush.component.html',
    styleUrls: [ './brush.component.scss', ],
})

export class BrushComponent {
    public isActive: boolean;
    public readonly sizes: IBrush[] = BrushSizes;
    public currentSize: BrushSize = BrushSizeNameEnum.Medium;

    @Output('onSetSize') private readonly fireSetSize: EventEmitter<BrushSize> = new EventEmitter<BrushSize>();

    public onOpen() {
        this.isActive = !this.isActive;
    }

    public onSelect(size: BrushSize) {
        this.isActive = false;
        this.currentSize = size;

        this.fireSetSize.emit(size);
    }
}

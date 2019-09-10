import { Component, ViewChild } from '@angular/core';

import { Palette } from '../../palette/enums';
import { CanvasComponent } from '../../canvas/components';
import { BrushSize } from '../../brushes/enums';

@Component({
    selector: 'apa-root',
    templateUrl: './bootstrap.component.html',
    styleUrls: [ './bootstrap.component.scss', ],
})

export class BootstrapComponent {
    @ViewChild(CanvasComponent, { static: true }) private readonly canvas: CanvasComponent;

    public onSetColor(color: Palette) {
        this.canvas.selectColor(color);
    }

    public onSetSize(size: BrushSize) {
        this.canvas.selectDrawingSize(size);
    }

    public onUndo() {
        this.canvas.undo();
    }

    public onRedo() {
        this.canvas.redo();
    }
}

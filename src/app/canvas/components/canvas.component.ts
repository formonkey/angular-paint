import { Component, Inject, OnInit } from '@angular/core';

import { Colors, Sizes } from '../constants';
import { Palette, PaletteNameEnum } from '../../palette/enums';
import { BrushSize, BrushSizeNameEnum } from '../../brushes/enums';
import { Canvas, ICanvasColor, ICanvasDrawingSizes } from '../interfaces';

@Component({
    selector: 'apa-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: [ './canvas.component.scss', ],
})

export class CanvasComponent implements OnInit {
    public canUndo: boolean;
    public canRedo: boolean;
    public colors: ICanvasColor = Colors;
    public drawingSizes: ICanvasDrawingSizes = Sizes;
    public currentColor: Palette = PaletteNameEnum.Black;
    public currentSize: BrushSize = BrushSizeNameEnum.Small;

    private stack = [];
    private canvas: Canvas;
    private readonly size = '2000';

    constructor(
        @Inject('Fabric') private readonly fabric,
    ) {}

    public ngOnInit(): void {
        this.canvas = this.fabric('canvas');

        this.setCanvasConfiguration();

        this.selectColor(this.currentColor);
        this.selectDrawingSize(this.currentSize);
    }

    public selectDrawingSize(size: BrushSize) {
        this.currentSize = size;

        if (this.canvas) {
            this.canvas.freeDrawingBrush.width = this.drawingSizes[size];
        }
    }

    public selectColor(color: Palette) {
        this.currentColor = color;

        if (this.canvas) {
            this.canvas.freeDrawingBrush.color = this.colors[color];
        }
    }

    public undo() {
        if (this.canUndo) {
            const lastId = this.canvas.getObjects().length - 1;
            const lastObj = this.canvas.getObjects()[lastId];

            this.stack.push(lastObj);
            this.canvas.remove(lastObj);

            this.setUndoRedo();
        }
    }

    public redo() {
        if (this.canRedo) {
            const stack = this.stack.splice(-1, 1)[0];

            this.canvas.insertAt(stack, this.canvas.getObjects().length);

            this.setUndoRedo();
        }
    }

    private setCanvasConfiguration() {
        this.canvas.backgroundColor = PaletteNameEnum.White;

        this.canvas.setWidth(this.size);
        this.canvas.setHeight(this.size);

        this.canvas.on('path:created', this.resetStack);
    }

    private resetStack = () => {
        this.stack = [];
        this.setUndoRedo();
    }

    private setUndoRedo() {
        this.canRedo = this.stack.length > 0;
        this.canUndo = this.canvas.getObjects().length > 0;

        (this.canvas as any).loadFromJSON(JSON.stringify(this.canvas), this.canvas.renderAll);
    }
}

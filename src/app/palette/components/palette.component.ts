import { Component, EventEmitter, Output } from '@angular/core';

import { IPalette } from '../interfaces';
import { PaletteColors } from '../constants';
import { Palette, PaletteColorEnum } from '../enums';

@Component({
    selector: 'apa-palette',
    templateUrl: './palette.component.html',
    styleUrls: [ './palette.component.scss', ],
})

export class PaletteComponent {
    public isActive: boolean;
    public readonly colors: IPalette[] = PaletteColors;
    public currentColor: string = PaletteColorEnum.Black;

    @Output('onSetColor') private readonly fireSetColor: EventEmitter<Palette> = new EventEmitter<Palette>();

    public onOpen() {
        this.isActive = !this.isActive;
    }

    public onSelect(element: IPalette) {
        this.isActive = false;
        this.currentColor = element.color;

        this.fireSetColor.emit(element.name);
    }
}

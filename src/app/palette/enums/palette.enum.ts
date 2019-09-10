export enum PaletteNameEnum {
    Black = 'black',
    White = 'white',
    Yellow = 'yellow',
    Red = 'red',
    Blue = 'blue',
    Green = 'green',
    Purple = 'purple',
}

export enum PaletteColorEnum {
    Black = '#000',
    White = '#FFF',
    Yellow = '#FFEB3B',
    Red = '#F44336',
    Blue = '#2196F3',
    Green = '#4CAF50',
    Purple = '#7A08AF'
}

export type Palette = PaletteNameEnum.Black | PaletteNameEnum.White | PaletteNameEnum.Yellow | PaletteNameEnum.Red | PaletteNameEnum.Blue |
    PaletteNameEnum.Green | PaletteNameEnum.Purple;

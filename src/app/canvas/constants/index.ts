import { BrushSizeEnum, BrushSizeNameEnum } from '../../brushes/enums';
import { PaletteColorEnum, PaletteNameEnum } from '../../palette/enums';

export const Sizes = {
    [BrushSizeNameEnum.Small]: BrushSizeEnum.Small,
    [BrushSizeNameEnum.Medium]: BrushSizeEnum.Medium,
    [BrushSizeNameEnum.Large]: BrushSizeEnum.Large,
};

export const Colors = {
    [PaletteNameEnum.Black]: PaletteColorEnum.Black,
    [PaletteNameEnum.White]: PaletteColorEnum.White,
    [PaletteNameEnum.Yellow]: PaletteColorEnum.Yellow,
    [PaletteNameEnum.Red]: PaletteColorEnum.Red,
    [PaletteNameEnum.Blue]: PaletteColorEnum.Blue,
    [PaletteNameEnum.Green]: PaletteColorEnum.Green,
    [PaletteNameEnum.Purple]: PaletteColorEnum.Purple,
};

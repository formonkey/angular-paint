export enum BrushSizeNameEnum {
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
}

export enum BrushSizeEnum {
    Small = 5,
    Medium = 10,
    Large = 25,
}

export type BrushSize = BrushSizeNameEnum.Small | BrushSizeNameEnum.Medium | BrushSizeNameEnum.Large;

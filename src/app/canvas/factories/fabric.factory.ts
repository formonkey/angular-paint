import { fabric } from 'fabric';

export const FabricFactory = (id) => new fabric.Canvas(id, {
    hoverCursor: 'pointer',
    isDrawingMode: true,
});

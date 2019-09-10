export interface Canvas {
    renderAll: () => void;
    backgroundColor: string;
    remove: (object) => void;
    on: (id, callback) => void;
    setWidth: (size: string) => void;
    setHeight: (size: string) => void;
    insertAt: (object, index) => void;
    getObjects: () => { length: number };
    freeDrawingBrush: {
        width: number;
        color: string;
    };
}

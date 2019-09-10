import { FabricFactory } from '../factories';

describe('Canvas fabric factory', () => {
    it('when fabric starts the initial properties of a canvas should exist', () => {
        const canvas = FabricFactory('test');

        expect(canvas.on).toBeDefined();
        expect(canvas.remove).toBeDefined();
        expect(canvas.setWidth).toBeDefined();
        expect(canvas.insertAt).toBeDefined();
        expect(canvas.setHeight).toBeDefined();
        expect(canvas.renderAll).toBeDefined();
        expect(canvas.getObjects).toBeDefined();
        expect(canvas.loadFromJSON).toBeDefined();
        expect(canvas.backgroundColor).toBeDefined();
        expect(canvas.freeDrawingBrush).toBeDefined();
    });
});

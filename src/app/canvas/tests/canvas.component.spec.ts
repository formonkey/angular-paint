import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanvasComponent } from '../components';
import { querySelector } from '../../../test';
import { Data } from '@angular/router';
import { BrushSize } from '../../brushes/enums';
import { Palette } from '../../palette/enums';

describe('Canvas component', () => {
    let spies: Data = {};
    let providers: Data = {};
    let component: CanvasComponent;
    let fixture: ComponentFixture<CanvasComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                CanvasComponent,
            ],
            providers: [
                {
                    provide: 'Fabric',
                    useValue: (id: string) => {
                        return {
                            id,
                            on: () => {},
                            remove: () => {},
                            setWidth: () => {},
                            insertAt: () => {},
                            setHeight: () => {},
                            renderAll: () => {},
                            backgroundColor: 'white',
                            getObjects: () => [{ test: 'A'}, { test: 'B' }],
                            loadFromJSON: (s: string, p: () => void) => {},
                            freeDrawingBrush: {
                                width: 5,
                                color: '#000',
                            }
                        };
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CanvasComponent);

        component = fixture.componentInstance;

        initProviders();
    });

    it('when the testing module has been configured, there should be a variable that is the instance of the component', () => {
        expect(component).toBeDefined();
    });

    it('when the component instance has been raised it should have all the dependency injections correct as private properties', () => {
        expect((component as any).fabric).toBeDefined();
        expect((component as any).fabric).toEqual(TestBed.get('Fabric'));
    });

    describe('within the code', () => {
        it('when the component life cycle starts, you should call the fabric canvas configuration functions', () => {
            const spySelectColor = spyOn(component as any, 'selectColor');
            const spySelectDrawingSize = spyOn(component as any, 'selectDrawingSize');
            const spySetCanvasConfiguration = spyOn(component as any, 'setCanvasConfiguration');

            expect((component as any).canvas).not.toBeDefined();

            expect(spySelectColor).not.toHaveBeenCalled();
            expect(spySelectDrawingSize).not.toHaveBeenCalled();
            expect(spySetCanvasConfiguration).not.toHaveBeenCalled();

            fixture.detectChanges();

            expect((component as any).canvas).toBeDefined();
            expect((component as any).canvas.id).toEqual('canvas');

            expect(spySelectColor).toHaveBeenCalled();
            expect(spySelectColor).toHaveBeenCalledWith(component.currentColor);

            expect(spySelectDrawingSize).toHaveBeenCalled();
            expect(spySelectDrawingSize).toHaveBeenCalledWith(component.currentSize);

            expect(spySetCanvasConfiguration).toHaveBeenCalled();
        });

        it('when the function of selecting the brush size is called, you should set the value to the corresponding variable and you should not set anything on the canvas because it has not been initialized', () => {
            component.selectDrawingSize('small' as BrushSize);

            expect(component.currentSize).toEqual('small');
            expect((component as any).canvas).not.toBeDefined();
        });

        it('when the function of selecting the brush size is called, you should set the value to the corresponding variable and you should set on the canvas', () => {
            fixture.detectChanges();

            component.selectDrawingSize('medium' as BrushSize);

            expect(component.currentSize).toEqual('medium');
            expect((component as any).canvas.freeDrawingBrush.width).toEqual(10);
        });

        it('when the function of selecting the brush color is called, you should set the value to the corresponding variable and you should not set anything on the canvas because it has not been initialized', () => {
            component.selectColor('black' as Palette);

            expect(component.currentColor).toEqual('black');
            expect((component as any).canvas).not.toBeDefined();
        });

        it('when the function of selecting the brush color is called, you should set the value to the corresponding variable and you should set on the canvas', () => {
            fixture.detectChanges();

            component.selectColor('black' as Palette);

            expect(component.currentColor).toEqual('black');
            expect((component as any).canvas.freeDrawingBrush.color).toEqual('#000');
        });

        it('when the undo function is called but the canvas is not initialized it should not do anything', () => {
            component.undo();

            expect(spies.canvas.getObjects).not.toHaveBeenCalled();
        });

        it('when the undo function is called should push last object in stack', () => {
            fixture.detectChanges();

            component.canUndo = true;

            component.undo();

            expect((component as any).stack).toEqual([{ test: 'B' }]);
        });

        it('when the redo function is called but the canvas is not initialized it should not do anything', () => {
            component.redo();

            expect(spies.canvas.getObjects).not.toHaveBeenCalled();
        });

        it('when the redo function is called should remove first stack object', () => {
            fixture.detectChanges();

            (component as any).stack.push({ test: 'A' });

            component.canRedo = true;

            component.redo();

            expect((component as any).stack).toEqual([]);
        });

        it('when the canvas configuration function is called, you should set the default values ​​of both the size and background of the canvas', () => {
            fixture.detectChanges();

            spies.canvas.on = spyOn((component as any).canvas, 'on');
            spies.canvas.setWidth = spyOn((component as any).canvas, 'setWidth');
            spies.canvas.setHeight = spyOn((component as any).canvas, 'setHeight');

            (component as any).setCanvasConfiguration();

            expect((component as any).canvas.backgroundColor).toEqual('white');

            expect(spies.canvas.setWidth).toHaveBeenCalled();
            expect(spies.canvas.setWidth).toHaveBeenCalledWith('2000');

            expect(spies.canvas.setHeight).toHaveBeenCalled();
            expect(spies.canvas.setHeight).toHaveBeenCalledWith('2000');

            expect(spies.canvas.on).toHaveBeenCalled();
            expect(spies.canvas.on).toHaveBeenCalledWith('path:created', (component as any).resetStack);
        });

        it('when call to reset stack function should set stack to void array', () => {
            fixture.detectChanges();

            (component as any).resetStack();

            expect((component as any).stack).toEqual([]);
        });
    });

    describe('within the template', () => {
        it('when component is rendered the tag canvas with id canvas should exist', () => {
            const canvasElement = querySelector(fixture, 'canvas#canvas');

            expect(canvasElement).not.toBeNull();
        });
    });

    const initProviders = () => {
        providers = {
            fabric: TestBed.get('Fabric'),
        };

        initSpies();
    };

    const initSpies = () => {
        spies = {
            canvas: {
                on: spyOn(providers.fabric(), 'on'),
                remove: spyOn(providers.fabric(), 'remove'),
                setWidth: spyOn(providers.fabric(), 'setWidth'),
                insertAt: spyOn(providers.fabric(), 'insertAt'),
                setHeight: spyOn(providers.fabric(), 'setHeight'),
                renderAll: spyOn(providers.fabric(), 'renderAll'),
                getObjects: spyOn(providers.fabric(), 'getObjects'),
                loadFromJSON: spyOn(providers.fabric(), 'loadFromJSON'),
            },
        };
    };
});

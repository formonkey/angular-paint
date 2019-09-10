import { BootstrapComponent } from '../components';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Palette } from '../../palette/enums';
import { BrushSize } from '../../brushes/enums';
import { debugQueryElement, querySelector } from '../../../test';

describe('Bootstrap component', () => {
    let component: BootstrapComponent;
    let fixture: ComponentFixture<BootstrapComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                BootstrapComponent,
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(BootstrapComponent);

        component = fixture.componentInstance;
    });

    it('when the testing module has been configured, there should be a variable that is the instance of the component', () => {
        expect(component).toBeDefined();
    });

    describe('within the code', () => {
        let spyCanvas;

        beforeEach(() => {
            (component as any).canvas = {
                undo: () => {},
                redo: () => {},
                selectColor: () => {},
                selectDrawingSize: () => {},
            };

            spyCanvas = {
                undo: spyOn((component as any).canvas, 'undo'),
                redo: spyOn((component as any).canvas, 'redo'),
                selectColor: spyOn((component as any).canvas, 'selectColor'),
                selectDrawingSize: spyOn((component as any).canvas, 'selectDrawingSize'),
            };
        });

        it('when the component has been initialized there should be a property that references the canvas component', () => {
            expect((component as any).canvas).toBeDefined();
        });

        it('when the function of setting a color to the canvas is called, you should call the function of the canvas component to be able to set it correctly in fabric', () => {
            component.onSetColor('black' as Palette);

            expect(spyCanvas.selectColor).toHaveBeenCalled();
            expect(spyCanvas.selectColor).toHaveBeenCalledWith('black');
        });

        it('when the function of setting a size to the brush of the canvas is called, you should call the function of the canvas component to be able to set it correctly in fabric', () => {
            component.onSetSize('small' as BrushSize);

            expect(spyCanvas.selectDrawingSize).toHaveBeenCalled();
            expect(spyCanvas.selectDrawingSize).toHaveBeenCalledWith('small');
        });

        it('when the component undo function is called it, you should call the function of the canvas component to be able to set it correctly in fabric', () => {
            component.onUndo();

            expect(spyCanvas.undo).toHaveBeenCalled();
        });

        it('when the component redo function is called it, you should call the function of the canvas component to be able to set it correctly in fabric', () => {
            component.onRedo();

            expect(spyCanvas.redo).toHaveBeenCalled();
        });
    });

    describe('within the template', () => {
        beforeEach(() => {
            fixture.detectChanges();
        });

        it('when the component has been rendered, there should be an image with the application logo', () => {
            const imageElement = querySelector(fixture, 'div.columns>div.column.is-1>div.logo>img');

            expect(imageElement).not.toBeNull();
            expect(imageElement.getAttribute('alt')).toEqual('logo');
            expect(imageElement.getAttribute('src')).toEqual('/assets/img/a@2x.png');
        });

        describe('when we want to click on the undo icon', () => {
            let spyOnUndo;
            let emUndoElement;

            beforeEach(() => {
                spyOnUndo = spyOn(component, 'onUndo');
                emUndoElement = querySelector(fixture, 'div.columns>div.column.is-1>div.logo+div.actions>em.fas.fa-undo');
            });

            it('should be set as disabled if there is no action on the canvas', () => {
                expect(emUndoElement).not.toBeNull();
                expect(emUndoElement.className).toMatch(/is-disabled/);

                emUndoElement.click();

                expect(spyOnUndo).not.toHaveBeenCalled();
            });

            it('should be enabled when there is any action on the canvas', () => {
                (component as any).canvas = { canUndo: true };
                fixture.detectChanges();

                expect(emUndoElement.className).not.toMatch(/is-disabled/);

                emUndoElement.click();

                expect(spyOnUndo).toHaveBeenCalled();
            });
        });

        describe('when we want to click on the redo icon', () => {
            let spyOnRedo;
            let emRedoElement;

            beforeEach(() => {
                const selector = 'div.columns>div.column.is-1>div.logo+div.actions>em.fas.fa-undo+em.fas.fa-undo.reverse';

                spyOnRedo = spyOn(component, 'onRedo');
                emRedoElement = querySelector(fixture, selector);
            });

            it('should be set as disabled if there is no action on the undo stack', () => {
                expect(emRedoElement).not.toBeNull();
                expect(emRedoElement.className).toMatch(/is-disabled/);

                emRedoElement.click();

                expect(spyOnRedo).not.toHaveBeenCalled();
            });

            it('should be enabled when there is any action on the undo stack', () => {
                (component as any).canvas = { canRedo: true };
                fixture.detectChanges();

                expect(emRedoElement).not.toBeNull();
                expect(emRedoElement.className).not.toMatch(/is-disabled/);

                emRedoElement.click();

                expect(spyOnRedo).toHaveBeenCalled();
            });
        });

        it('when the component has been rendered, the palette tag with the correct attributes and properties should exist', () => {
            const spyOnSetColor = spyOn(component, 'onSetColor');
            const selector = 'div.columns>div.column.is-1>div.logo+div.actions>em.fas.fa-undo+em.fas.fa-undo.reverse+apa-palette';
            const debugPaletteElement = debugQueryElement(fixture, selector);

            expect(debugPaletteElement).not.toBeNull();
            expect(spyOnSetColor).not.toHaveBeenCalled();
            expect(debugPaletteElement.listeners[0].name).toEqual('onSetColor');

            debugPaletteElement.listeners[0].callback();

            expect(spyOnSetColor).toHaveBeenCalled();
        });

        it('when the component has been rendered, the brush tag with the correct attributes and properties should exist', () => {
            const spyOnSetSize = spyOn(component, 'onSetSize');
            const selector = 'div.columns>div.column.is-1>div.logo+div.actions>em.fas.fa-undo+em.fas.fa-undo.reverse+apa-palette+apa-brush';
            const debugBrushElement = debugQueryElement(fixture, selector);

            expect(debugBrushElement).not.toBeNull();
            expect(spyOnSetSize).not.toHaveBeenCalled();
            expect(debugBrushElement.listeners[0].name).toEqual('onSetSize');

            debugBrushElement.listeners[0].callback();

            expect(spyOnSetSize).toHaveBeenCalled();
        });

        it('when the component has been rendered, the canvas tag should exist', () => {
            const canvasElement = querySelector(fixture, 'div.columns>div.column.is-1+div.column>apa-canvas');

            expect(canvasElement).not.toBeNull();
        });
    });
});

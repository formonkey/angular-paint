import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteComponent } from '../components';
import { PopoverComponent } from '../../popover/components';
import { debugQueryElement, querySelector } from '../../../test';

describe('Palette component', () => {
    let component: PaletteComponent;
    let fixture: ComponentFixture<PaletteComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                PaletteComponent,
                PopoverComponent,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(PaletteComponent);

        component = fixture.componentInstance;
    });

    it('when the testing module has been configured, there should be a variable that is the instance of the component', () => {
        expect(component).toBeDefined();
    });

    describe('within the code', () => {
        it('when you want to open the popover, you must call the trigger function of the component and you should set the activation variable to true', () => {
            expect(component.isActive).not.toBeDefined();

            component.onOpen();

            expect(component.isActive).toBeTruthy();
        });

        it('when you want to select an element of the popover, you must call the function to select the component and you should set the variable to activate to false, set the corresponding value selected in a variable and call the parent event', () => {
            component.isActive = true;
            (component as any).fireSetColor = { emit: () => {}};

            const spyFireSetColor = spyOn((component as any).fireSetColor, 'emit');

            expect(spyFireSetColor).not.toHaveBeenCalled();

            component.onSelect({ color: '#ttt', name: 'test' } as any);

            expect(component.isActive).toBeFalsy();
            expect(component.currentColor).toEqual('#ttt');
            expect(spyFireSetColor).toHaveBeenCalled();
            expect(spyFireSetColor).toHaveBeenCalledWith('test');
        });

    });

    describe('within the template', () => {
        it('when the component has been rendered the popover tag should exist', () => {
            component.isActive = false;

            fixture.detectChanges();

            const debugPopoverElement = debugQueryElement(fixture, 'apa-popover');
            const spyOnOpen = spyOn(component, 'onOpen');

            expect(spyOnOpen).not.toHaveBeenCalled();
            expect(debugPopoverElement).not.toBeNull();
            expect(debugPopoverElement.properties.isActive).toBeFalsy();
            expect(debugPopoverElement.attributes.class).toEqual('colors');
            expect(debugPopoverElement.listeners[0].name).toEqual('onTrigger');

            debugPopoverElement.listeners[0].callback();

            expect(spyOnOpen).toHaveBeenCalled();
        });

        it('when the component has been rendered, there should be an icon to trigger and activate the popover', () => {
            fixture.detectChanges();

            const spyOnOpen = spyOn(component, 'onOpen');
            const debugTriggerElement = debugQueryElement(fixture, 'apa-popover em.fas.fa-palette');

            expect(debugTriggerElement).not.toBeNull();
            expect(spyOnOpen).not.toHaveBeenCalled();
            expect(debugTriggerElement.listeners[0].name).toEqual('click');

            debugTriggerElement.listeners[0].callback();


            expect(spyOnOpen).toHaveBeenCalled();
        });

        it('when the component has been rendered and the element we want to select has been clicked, the correct attributes should exist and call the function to select', () => {
            fixture.detectChanges();

            const spyOnOpen = spyOn(component, 'onSelect');
            const debugSizeItemElement =  debugQueryElement(fixture, 'apa-popover div.color>div.element');

            expect(debugSizeItemElement).not.toBeNull();
            expect(spyOnOpen).not.toHaveBeenCalled();
            expect(debugSizeItemElement.listeners[0].name).toEqual('click');

            debugSizeItemElement.listeners[0].callback();

            expect(spyOnOpen).toHaveBeenCalled();
        });

        it('when an item has been selected, you should put a class in the corresponding item with an "is-active" class', () => {
            (component as any).currentColor = '#000';

            fixture.detectChanges();

            const debugSizeItemElement =  querySelector(fixture, 'apa-popover div.color');

            expect(debugSizeItemElement).not.toBeNull();
            expect(debugSizeItemElement.className).toMatch(/is-active/);
        });
    });
});

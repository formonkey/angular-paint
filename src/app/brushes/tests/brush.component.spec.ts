import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrushSize } from '../enums';
import { BrushComponent } from '../components';
import { PopoverComponent } from '../../popover/components';
import { debugQueryElement, querySelector } from '../../../test';

describe('Brush component', () => {
    let component: BrushComponent;
    let fixture: ComponentFixture<BrushComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
            ],
            declarations: [
                BrushComponent,
                PopoverComponent,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(BrushComponent);

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
            (component as any).fireSetSize = { emit: () => {}};

            const spyFireSetSize = spyOn((component as any).fireSetSize, 'emit');

            expect(spyFireSetSize).not.toHaveBeenCalled();

            component.onSelect('small' as BrushSize);

            expect(component.isActive).toBeFalsy();
            expect(component.currentSize).toEqual('small');
            expect(spyFireSetSize).toHaveBeenCalled();
            expect(spyFireSetSize).toHaveBeenCalledWith('small');
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
            expect(debugPopoverElement.attributes.class).toEqual('sizes');
            expect(debugPopoverElement.listeners[0].name).toEqual('onTrigger');

            debugPopoverElement.listeners[0].callback();

            expect(spyOnOpen).toHaveBeenCalled();
        });

        it('when the component has been rendered, there should be an icon to trigger and activate the popover', () => {
            fixture.detectChanges();

            const spyOnOpen = spyOn(component, 'onOpen');
            const debugTriggerElement = debugQueryElement(fixture, 'apa-popover em.fas.fa-paint-brush');

            expect(debugTriggerElement).not.toBeNull();
            expect(spyOnOpen).not.toHaveBeenCalled();
            expect(debugTriggerElement.listeners[0].name).toEqual('click');

            debugTriggerElement.listeners[0].callback();


            expect(spyOnOpen).toHaveBeenCalled();
        });

        it('when the component has been rendered and the element we want to select has been clicked, the correct attributes should exist and call the function to select', () => {
            fixture.detectChanges();

            const spyOnOpen = spyOn(component, 'onSelect');
            const debugSizeItemElement =  debugQueryElement(fixture, 'apa-popover .size-item');

            expect(debugSizeItemElement).not.toBeNull();
            expect(spyOnOpen).not.toHaveBeenCalled();
            expect(debugSizeItemElement.listeners[0].name).toEqual('click');

            debugSizeItemElement.listeners[0].callback();

            expect(spyOnOpen).toHaveBeenCalled();
        });

        it('when an item has been selected, you should put a class in the corresponding item with an "is-active" class', () => {
            (component as any).currentSize = 'small';

            fixture.detectChanges();

            const debugSizeItemElement =  querySelector(fixture, 'apa-popover .size-item>div.line');

            expect(debugSizeItemElement).not.toBeNull();
            expect(debugSizeItemElement.className).toMatch(/small/);
            expect(debugSizeItemElement.className).toMatch(/is-active/);
        });
    });
});

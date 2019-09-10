import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { querySelector } from '../../../test';
import { PopoverComponent } from '../components';

describe('Popover component', () => {
    let component: PopoverComponent;
    let fixture: ComponentFixture<PopoverComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
            ],
            declarations: [
                PopoverComponent,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(PopoverComponent);

        component = fixture.componentInstance;
    });

    it('when the testing module has been configured, there should be a variable that is the instance of the component', () => {
        expect(component).toBeDefined();
    });

    describe('within template', () => {
        it('when activation variable is true should has a "is-popover-active" class in popover tag', () => {
            component.isActive = true;

            fixture.detectChanges();

            const popoverElement = querySelector(fixture, 'div.popover.is-popover-right');

            expect(popoverElement).not.toBeNull();
            expect(popoverElement.className).toMatch(/is-popover-active/);
        });

        it('when class name is defined should exist this class in content', () => {
            (component as any).className = 'test';

            fixture.detectChanges();

            const testElement = querySelector(fixture, 'div.popover.is-popover-right>div.popover-content>div.test');

            expect(testElement).not.toBeNull();
        });
    });
});

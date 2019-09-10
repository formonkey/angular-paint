import { Data } from '@angular/router';
import { Component, ContentChild, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
    selector: 'apa-popover',
    templateUrl: './popover.component.html',
    styleUrls: [ './popover.component.scss', ],
})

export class PopoverComponent {
    @Input() public isActive: boolean;
    @Input() public readonly data: Data[];
    @Input('class') public readonly className: string;

    @Output('onTrigger') public readonly fireTrigger: EventEmitter<void> = new EventEmitter<void>();

    @ContentChild('trigger', { static: false }) public trigger: TemplateRef<any>;
    @ContentChild('content', { static: false }) public content: TemplateRef<any>;
}

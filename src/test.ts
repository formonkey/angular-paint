import 'zone.js/dist/zone-testing';

import { By } from '@angular/platform-browser';
import { ComponentFixture, getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

declare const require: any;

getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

const context = require.context('./app/', true, /\.ts$/);

context.keys().map(context);

export const querySelector = (fixture: ComponentFixture<any>, selector: string) => {
    return fixture.nativeElement.querySelector(selector);
};

export const debugQueryElement = (fixture: ComponentFixture<any>, selector: string) => {
    return fixture.debugElement.query(By.css(selector));
};

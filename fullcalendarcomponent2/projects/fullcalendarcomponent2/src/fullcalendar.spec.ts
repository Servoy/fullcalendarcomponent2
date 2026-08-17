import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { FullCalendar } from './fullcalendar';

describe('FullCalendar', () => {
    let fixture: ComponentFixture<FullCalendar>;
    let component: FullCalendar;

    async function createComponent(overrides: Record<string, any> = {}) {
        fixture = TestBed.createComponent(FullCalendar);
        component = fixture.componentInstance;

        const defaults: Record<string, any> = {
            servoyApi: new ServoyApiTesting(),
            calendarOptions: {},
            themeSystem: 'classic',
            ...overrides
        };

        for (const [key, value] of Object.entries(defaults)) {
            if (value !== undefined) {
                fixture.componentRef.setInput(key, value);
            }
        }

        fixture.detectChanges();
        await fixture.whenStable();
    }

    async function waitForCalendar() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        fixture.detectChanges();
        await fixture.whenStable();
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ServoyPublicTestingModule, FullCalendar],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        await createComponent();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should render the host element', () => {
        const el = fixture.nativeElement.querySelector('div') as HTMLElement;
        expect(el).not.toBeNull();
    });

    it('should render the calendar after theme loads', async () => {
        await waitForCalendar();
        expect(component.isReadyForRendering).toBe(true);
        const cal = fixture.nativeElement.querySelector('full-calendar');
        expect(cal).not.toBeNull();
    });

    it('should apply styleClass to the host div', async () => {
        fixture.componentRef.setInput('styleClass', 'my-custom-class');
        fixture.detectChanges();
        await fixture.whenStable();
        const el = fixture.nativeElement.querySelector('div') as HTMLElement;
        expect(el.classList.contains('my-custom-class')).toBe(true);
    });

    it('should initialize fullCalendarOptions with default timezone', async () => {
        await waitForCalendar();
        expect(component.fullCalendarOptions.timeZone).toBe('local');
    });

    it('should include plugins', async () => {
        await waitForCalendar();
        expect(component.fullCalendarOptions.plugins!.length).toBeGreaterThan(0);
    });

    it('should register select callback when handler is provided', async () => {
        const onSelectMethodID = vi.fn();
        await createComponent({ onSelectMethodID });
        await waitForCalendar();
        expect(component.fullCalendarOptions.select).toBeDefined();
    });

    it('should not register select callback when handler is not provided', async () => {
        await createComponent({});
        await waitForCalendar();
        expect(component.fullCalendarOptions.select).toBeUndefined();
    });

    it('should register eventClick callback when click handler is provided', async () => {
        const onEventClickMethodID = vi.fn();
        await createComponent({ onEventClickMethodID });
        await waitForCalendar();
        expect(component.fullCalendarOptions.eventClick).toBeDefined();
    });

    it('should register eventClick callback when dblclick handler is provided', async () => {
        const onEventDblClickMethodID = vi.fn();
        await createComponent({ onEventDblClickMethodID });
        await waitForCalendar();
        expect(component.fullCalendarOptions.eventClick).toBeDefined();
    });

    it('should register dateClick callback when handler is provided', async () => {
        const onDateClickMethodID = vi.fn();
        await createComponent({ onDateClickMethodID });
        await waitForCalendar();
        expect(component.fullCalendarOptions.dateClick).toBeDefined();
    });

    it('should register eventDrop callback when handler is provided', async () => {
        const onEventDropMethodID = vi.fn();
        await createComponent({ onEventDropMethodID });
        await waitForCalendar();
        expect(component.fullCalendarOptions.eventDrop).toBeDefined();
    });

    it('should register eventResize callback when handler is provided', async () => {
        const onEventResizeMethodID = vi.fn();
        await createComponent({ onEventResizeMethodID });
        await waitForCalendar();
        expect(component.fullCalendarOptions.eventResize).toBeDefined();
    });

    it('should register loading callback when handler is provided', async () => {
        const onLoadingMethodID = vi.fn();
        await createComponent({ onLoadingMethodID });
        await waitForCalendar();
        expect(component.fullCalendarOptions.loading).toBeDefined();
    });

    it('should register datesSet callback when handler is provided', async () => {
        const onDatesSetMethodID = vi.fn();
        await createComponent({ onDatesSetMethodID });
        await waitForCalendar();
        expect(component.fullCalendarOptions.datesSet).toBeDefined();
    });

    it('should always register viewDidMount', async () => {
        await waitForCalendar();
        expect(component.fullCalendarOptions.viewDidMount).toBeDefined();
    });

    it('should use provided calendarOptions', async () => {
        await createComponent({ calendarOptions: { initialView: 'dayGridMonth', weekends: false } });
        await waitForCalendar();
        expect(component.fullCalendarOptions.weekends).toBe(false);
    });

    it('should set initial events when provided', async () => {
        const events = [{ title: 'Test Event', start: '2026-01-01' }];
        await createComponent({ events });
        await waitForCalendar();
        expect(component.fullCalendarOptions.events).toEqual(events);
    });

    it('should add scheduler plugins when license key is provided', async () => {
        await createComponent({ calendarOptions: { schedulerLicenseKey: 'test-key' } });
        await waitForCalendar();
        expect(component.fullCalendarOptions.plugins!.length).toBeGreaterThan(8);
    });

    it('should restore view when view input is provided', async () => {
        const view = { type: 'dayGridMonth', currentStart: new Date(2026, 5, 1) } as any;
        await createComponent({ view });
        await waitForCalendar();
        expect(component.fullCalendarOptions.initialView).toBe('dayGridMonth');
    });

    it('should evaluate tooltip expression', () => {
        const event = { title: 'My Event', extendedProps: { note: 'Hello' } } as any;
        const result = component.evaluateTooltipExpression('{{title}} - {{extendedProps.note}}', event);
        expect(result).toBe('My Event - Hello');
    });

    it('should handle missing properties in tooltip expression', () => {
        const event = { title: 'Test' } as any;
        const result = component.evaluateTooltipExpression('{{title}} - {{missing}}', event);
        expect(result).toBe('Test - ');
    });
});

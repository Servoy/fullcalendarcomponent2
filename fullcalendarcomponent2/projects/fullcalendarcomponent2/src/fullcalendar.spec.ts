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
        expect(component.isReadyForRendering()).toBe(true);
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
        expect(component.fullCalendarOptions().timeZone).toBe('local');
    });

    it('should include plugins', async () => {
        await waitForCalendar();
        expect(component.fullCalendarOptions().plugins!.length).toBeGreaterThan(0);
    });

    it('should register select callback when handler is provided', async () => {
        const onSelectMethodID = vi.fn();
        await createComponent({ onSelectMethodID });
        await waitForCalendar();
        expect(component.fullCalendarOptions().select).toBeDefined();
    });

    it('should not register select callback when handler is not provided', async () => {
        await createComponent({});
        await waitForCalendar();
        expect(component.fullCalendarOptions().select).toBeUndefined();
    });

    it('should register eventClick callback when click handler is provided', async () => {
        const onEventClickMethodID = vi.fn();
        await createComponent({ onEventClickMethodID });
        await waitForCalendar();
        expect(component.fullCalendarOptions().eventClick).toBeDefined();
    });

    it('should register eventClick callback when dblclick handler is provided', async () => {
        const onEventDblClickMethodID = vi.fn();
        await createComponent({ onEventDblClickMethodID });
        await waitForCalendar();
        expect(component.fullCalendarOptions().eventClick).toBeDefined();
    });

    it('should register dateClick callback when handler is provided', async () => {
        const onDateClickMethodID = vi.fn();
        await createComponent({ onDateClickMethodID });
        await waitForCalendar();
        expect(component.fullCalendarOptions().dateClick).toBeDefined();
    });

    it('should register eventDrop callback when handler is provided', async () => {
        const onEventDropMethodID = vi.fn();
        await createComponent({ onEventDropMethodID });
        await waitForCalendar();
        expect(component.fullCalendarOptions().eventDrop).toBeDefined();
    });

    it('should register eventResize callback when handler is provided', async () => {
        const onEventResizeMethodID = vi.fn();
        await createComponent({ onEventResizeMethodID });
        await waitForCalendar();
        expect(component.fullCalendarOptions().eventResize).toBeDefined();
    });

    it('should register loading callback when handler is provided', async () => {
        const onLoadingMethodID = vi.fn();
        await createComponent({ onLoadingMethodID });
        await waitForCalendar();
        expect(component.fullCalendarOptions().loading).toBeDefined();
    });

    it('should register datesSet callback when handler is provided', async () => {
        const onDatesSetMethodID = vi.fn();
        await createComponent({ onDatesSetMethodID });
        await waitForCalendar();
        expect(component.fullCalendarOptions().datesSet).toBeDefined();
    });

    it('should always register viewDidMount', async () => {
        await waitForCalendar();
        expect(component.fullCalendarOptions().viewDidMount).toBeDefined();
    });

    it('should use provided calendarOptions', async () => {
        await createComponent({ calendarOptions: { initialView: 'dayGridMonth', weekends: false } });
        await waitForCalendar();
        expect(component.fullCalendarOptions().weekends).toBe(false);
    });

    it('should set initial events when provided', async () => {
        const events = [{ title: 'Test Event', start: '2026-01-01' }];
        await createComponent({ events });
        await waitForCalendar();
        expect(component.fullCalendarOptions().events).toEqual(events);
    });

    it('should add scheduler plugins when license key is provided', async () => {
        await createComponent({ calendarOptions: { schedulerLicenseKey: 'test-key' } });
        await waitForCalendar();
        expect(component.fullCalendarOptions().plugins!.length).toBeGreaterThan(8);
    });

    it('should restore view when view input is provided', async () => {
        const view = { type: 'dayGridMonth', currentStart: new Date(2026, 5, 1) } as any;
        await createComponent({ view });
        await waitForCalendar();
        expect(component.fullCalendarOptions().initialView).toBe('dayGridMonth');
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

    // ---------------------------------------------------------------------------
    // Fast, synchronous tests. These do NOT render <full-calendar> and never use
    // the slow waitForCalendar() helper. The live calendar API is replaced by a
    // fake object of spies, injected by overriding the calendarComponent viewChild
    // signal with a plain function that returns { getApi: () => fakeApi }.
    // ---------------------------------------------------------------------------

    function makeFakeEvent() {
        return {
            setProp: vi.fn(),
            setExtendedProp: vi.fn(),
            setStart: vi.fn(),
            setEnd: vi.fn(),
            setDates: vi.fn(),
            setAllDay: vi.fn(),
            moveStart: vi.fn(),
            moveEnd: vi.fn(),
            moveDates: vi.fn(),
            formatRange: vi.fn(() => 'formatted-range'),
            remove: vi.fn(),
            setResources: vi.fn(),
            getResources: vi.fn(() => [{ id: 'r1', title: 'Res 1' }]),
            getEvents: vi.fn(() => [{ id: 'e1', title: 'Ev 1' }]),
            getParent: vi.fn(() => ({ id: 'parent', title: 'Parent' })),
            getChildren: vi.fn(() => [{ id: 'child', title: 'Child' }]),
            toPlainObject: vi.fn(() => ({ id: 'e1', title: 'Ev 1' })),
            id: 'e1',
            title: 'Ev 1',
            className: 'a b'
        };
    }

    function makeFakeResource() {
        return {
            setProp: vi.fn(),
            setExtendedProp: vi.fn(),
            remove: vi.fn(),
            getParent: vi.fn(() => ({ id: 'parent', title: 'Parent' })),
            getChildren: vi.fn(() => [{ id: 'child', title: 'Child' }]),
            getEvents: vi.fn(() => [{ id: 'e1', title: 'Ev 1' }]),
            toPlainObject: vi.fn(() => ({ id: 'r1', title: 'Res 1' })),
            id: 'r1',
            title: 'Res 1'
        };
    }

    function makeFakeEventSource() {
        return {
            id: 'src1',
            format: 'json',
            url: 'http://example.com/feed',
            refetch: vi.fn(),
            remove: vi.fn()
        };
    }

    function makeFakeApi() {
        const fakeEvent = makeFakeEvent();
        const fakeResource = makeFakeResource();
        const fakeSource = makeFakeEventSource();
        const addedEvent = makeFakeEvent();
        const api: any = {
            _fakeEvent: fakeEvent,
            _fakeResource: fakeResource,
            _fakeSource: fakeSource,
            _addedEvent: addedEvent,
            getEvents: vi.fn(() => [fakeEvent]),
            getEventById: vi.fn(() => fakeEvent),
            addEvent: vi.fn(() => addedEvent),
            select: vi.fn(),
            unselect: vi.fn(),
            changeView: vi.fn(),
            getOption: vi.fn(() => 'opt-value'),
            setOption: vi.fn(),
            next: vi.fn(),
            prev: vi.fn(),
            prevYear: vi.fn(),
            nextYear: vi.fn(),
            today: vi.fn(),
            getDate: vi.fn(() => new Date(2026, 0, 1)),
            gotoDate: vi.fn(),
            incrementDate: vi.fn(),
            render: vi.fn(),
            destroy: vi.fn(),
            batchRendering: vi.fn(),
            formatIso: vi.fn(() => '2026-01-01T00:00:00Z'),
            formatRange: vi.fn(() => 'range-str'),
            formatDate: vi.fn(() => 'date-str'),
            getEventSources: vi.fn(() => [fakeSource]),
            getEventSourceById: vi.fn(() => fakeSource),
            addEventSource: vi.fn(() => fakeSource),
            refetchEvents: vi.fn(() => 'refetched'),
            scrollToTime: vi.fn(),
            view: { type: 'dayGridMonth', title: 'January 2026', activeStart: new Date(), activeEnd: new Date(), currentStart: new Date(), currentEnd: new Date() },
            getResources: vi.fn(() => [fakeResource]),
            getResourceById: vi.fn(() => fakeResource),
            addResource: vi.fn(() => fakeResource),
            getTopLevelResources: vi.fn(() => [fakeResource]),
            refetchResources: vi.fn()
        };
        return api;
    }

    function injectFakeApi() {
        const api = makeFakeApi();
        (component as any).calendarComponent = () => ({ getApi: () => api });
        return api;
    }

    describe('public API delegation (fake api)', () => {
        let api: any;

        beforeEach(() => {
            api = injectFakeApi();
        });

        // --- selection ---
        it('select delegates to api.select', () => {
            const start = new Date(2026, 0, 1);
            const end = new Date(2026, 0, 2);
            component.select(start, end);
            expect(api.select).toHaveBeenCalledWith(start, end);
        });

        it('unselect delegates to api.unselect', () => {
            const pev = { foo: 'bar' } as any;
            component.unselect(pev);
            expect(api.unselect).toHaveBeenCalledWith(pev);
        });

        // --- events read ---
        it('getCalendarEvents stringifies each event', () => {
            const result = component.getCalendarEvents();
            expect(api.getEvents).toHaveBeenCalled();
            expect(result.length).toBe(1);
            expect(result[0].id).toBe('e1');
            expect(result[0].classNames).toEqual(['a', 'b']);
        });

        it('getEventById delegates and stringifies', () => {
            const result = component.getEventById('e1');
            expect(api.getEventById).toHaveBeenCalledWith('e1');
            expect(result.id).toBe('e1');
        });

        it('addEvent delegates and stringifies', () => {
            const ev = { title: 'New' } as any;
            const src = { id: 'src1' };
            const result = component.addEvent(ev, src);
            expect(api.addEvent).toHaveBeenCalledWith(ev, src);
            expect(result.id).toBe('e1');
        });

        // --- event mutation (chain through getEventById) ---
        it('setPropEvent delegates to event.setProp', () => {
            component.setPropEvent('e1', 'title', 'X');
            expect(api.getEventById).toHaveBeenCalledWith('e1');
            expect(api._fakeEvent.setProp).toHaveBeenCalledWith('title', 'X');
        });

        it('setExtendedPropEvent delegates to event.setExtendedProp', () => {
            component.setExtendedPropEvent('e1', 'note', 'hi');
            expect(api._fakeEvent.setExtendedProp).toHaveBeenCalledWith('note', 'hi');
        });

        it('setStart delegates to event.setStart', () => {
            const d = new Date(2026, 0, 1);
            const opts = { maintainDuration: true };
            component.setStart('e1', d, opts);
            expect(api._fakeEvent.setStart).toHaveBeenCalledWith(d, opts);
        });

        it('setEnd delegates to event.setEnd', () => {
            const d = new Date(2026, 0, 2);
            component.setEnd('e1', d);
            expect(api._fakeEvent.setEnd).toHaveBeenCalledWith(d);
        });

        it('setDates delegates to event.setDates', () => {
            const s = new Date(2026, 0, 1);
            const e = new Date(2026, 0, 2);
            component.setDates('e1', s, e, { allDay: true });
            expect(api._fakeEvent.setDates).toHaveBeenCalledWith(s, e, { allDay: true });
        });

        it('setAllDay delegates to event.setAllDay', () => {
            component.setAllDay('e1', true, { maintainDuration: true });
            expect(api._fakeEvent.setAllDay).toHaveBeenCalledWith(true, { maintainDuration: true });
        });

        it('moveStart delegates to event.moveStart', () => {
            component.moveStart('e1', { days: 1 });
            expect(api._fakeEvent.moveStart).toHaveBeenCalledWith({ days: 1 });
        });

        it('moveEnd delegates to event.moveEnd', () => {
            component.moveEnd('e1', { days: 2 });
            expect(api._fakeEvent.moveEnd).toHaveBeenCalledWith({ days: 2 });
        });

        it('moveDates delegates to event.moveDates', () => {
            component.moveDates('e1', { hours: 3 });
            expect(api._fakeEvent.moveDates).toHaveBeenCalledWith({ hours: 3 });
        });

        it('formatRangeEvent delegates to event.formatRange', () => {
            component.formatRangeEvent('e1', { month: 'long' } as any);
            expect(api._fakeEvent.formatRange).toHaveBeenCalledWith({ month: 'long' });
        });

        it('removeEvent delegates to event.remove', () => {
            component.removeEvent('e1');
            expect(api._fakeEvent.remove).toHaveBeenCalled();
        });

        it('getEventResources stringifies resources of event', () => {
            const result = component.getEventResources('e1');
            expect(api._fakeEvent.getResources).toHaveBeenCalled();
            expect(result[0].id).toBe('r1');
        });

        it('setEventResources delegates to event.setResources', () => {
            component.setEventResources('e1', ['r1', 'r2']);
            expect(api._fakeEvent.setResources).toHaveBeenCalledWith(['r1', 'r2']);
        });

        it('toPlainObjectEvent returns JSON string', () => {
            const result = component.toPlainObjectEvent('e1', { collapseColor: true });
            expect(api._fakeEvent.toPlainObject).toHaveBeenCalledWith({ collapseColor: true });
            expect(result).toBe(JSON.stringify({ id: 'e1', title: 'Ev 1' }));
        });

        // --- event sources ---
        it('getEventSources stringifies all sources', () => {
            const result = component.getEventSources();
            expect(api.getEventSources).toHaveBeenCalled();
            expect(result[0].id).toBe('src1');
            expect(result[0].url).toBe('http://example.com/feed');
        });

        it('getEventSourceById delegates and stringifies', () => {
            const result = component.getEventSourceById('src1');
            expect(api.getEventSourceById).toHaveBeenCalledWith('src1');
            expect(result.id).toBe('src1');
        });

        it('addEventSourceToCalendar maps className to classNames', () => {
            const result = component.addEventSourceToCalendar({ id: 'src1', className: ['x'] } as any);
            expect(api.addEventSource).toHaveBeenCalledWith({ id: 'src1', classNames: ['x'] });
            expect(result.id).toBe('src1');
        });

        it('addEventSourceToCalendar keeps source without className', () => {
            component.addEventSourceToCalendar({ id: 'src2' } as any);
            expect(api.addEventSource).toHaveBeenCalledWith({ id: 'src2' });
        });

        it('addFunctionEventSourceToCalendar wraps the callback', () => {
            const cb = vi.fn();
            const result = component.addFunctionEventSourceToCalendar({ id: 'src1', className: ['y'] } as any, cb);
            expect(api.addEventSource).toHaveBeenCalled();
            const arg = (api.addEventSource.mock.calls[0] as any[])[0];
            expect(typeof arg.events).toBe('function');
            expect(arg.classNames).toEqual(['y']);
            expect(result.id).toBe('src1');
        });

        it('refetchEvents delegates to api.refetchEvents', () => {
            const result = component.refetchEvents();
            expect(api.refetchEvents).toHaveBeenCalled();
            expect(result).toBe('refetched');
        });

        it('refetchEventSource delegates to source.refetch', () => {
            component.refetchEventSource('src1');
            expect(api.getEventSourceById).toHaveBeenCalledWith('src1');
            expect(api._fakeSource.refetch).toHaveBeenCalled();
        });

        // --- navigation ---
        it('scrollToTime delegates', () => {
            component.scrollToTime({ hours: 8 });
            expect(api.scrollToTime).toHaveBeenCalledWith({ hours: 8 });
        });

        it('getView delegates to api.view and stringifies', () => {
            const result = component.getView();
            expect(result.type).toBe('dayGridMonth');
            expect(result.title).toBe('January 2026');
        });

        it('changeView delegates', () => {
            component.changeView('timeGridWeek', { start: '2026-01-01', end: '2026-01-07' });
            expect(api.changeView).toHaveBeenCalledWith('timeGridWeek', { start: '2026-01-01', end: '2026-01-07' });
        });

        it('getOption delegates', () => {
            const result = component.getOption('weekends' as any);
            expect(api.getOption).toHaveBeenCalledWith('weekends');
            expect(result).toBe('opt-value');
        });

        it('setCalendarOption delegates to api.setOption', () => {
            component.setCalendarOption('weekends', false);
            expect(api.setOption).toHaveBeenCalledWith('weekends', false);
        });

        it('next delegates', () => {
            component.next();
            expect(api.next).toHaveBeenCalled();
        });

        it('prev delegates', () => {
            component.prev();
            expect(api.prev).toHaveBeenCalled();
        });

        it('prevYear delegates', () => {
            component.prevYear();
            expect(api.prevYear).toHaveBeenCalled();
        });

        it('nextYear delegates', () => {
            component.nextYear();
            expect(api.nextYear).toHaveBeenCalled();
        });

        it('today delegates', () => {
            component.today();
            expect(api.today).toHaveBeenCalled();
        });

        it('getDate delegates', () => {
            const result = component.getDate();
            expect(api.getDate).toHaveBeenCalled();
            expect(result).toBeInstanceOf(Date);
        });

        it('gotoDate delegates', () => {
            const d = new Date(2026, 2, 1);
            component.gotoDate(d);
            expect(api.gotoDate).toHaveBeenCalledWith(d);
        });

        it('incrementDate delegates', () => {
            component.incrementDate({ months: 1 });
            expect(api.incrementDate).toHaveBeenCalledWith({ months: 1 });
        });

        it('render delegates', () => {
            component.render();
            expect(api.render).toHaveBeenCalled();
        });

        it('destroy delegates', () => {
            component.destroy();
            expect(api.destroy).toHaveBeenCalled();
        });

        it('batchRendering delegates', () => {
            const fn = vi.fn();
            component.batchRendering(fn);
            expect(api.batchRendering).toHaveBeenCalledWith(fn);
        });

        it('formatIso delegates', () => {
            const d = new Date(2026, 0, 1);
            const result = component.formatIso(d, true);
            expect(api.formatIso).toHaveBeenCalledWith(d, true);
            expect(result).toBe('2026-01-01T00:00:00Z');
        });

        it('formatRangeCalendar delegates', () => {
            const s = new Date(2026, 0, 1);
            const e = new Date(2026, 0, 2);
            const result = component.formatRangeCalendar(s, e, { month: 'long' });
            expect(api.formatRange).toHaveBeenCalledWith(s, e, { month: 'long' });
            expect(result).toBe('range-str');
        });

        it('formatDate delegates', () => {
            const d = new Date(2026, 0, 1);
            const result = component.formatDate(d, { month: 'short' });
            expect(api.formatDate).toHaveBeenCalledWith(d, { month: 'short' });
            expect(result).toBe('date-str');
        });

        // --- resources ---
        it('refetchResources delegates', () => {
            component.refetchResources();
            expect(api.refetchResources).toHaveBeenCalled();
        });

        it('getTopLevelResources stringifies', () => {
            const result = component.getTopLevelResources();
            expect(api.getTopLevelResources).toHaveBeenCalled();
            expect(result[0].id).toBe('r1');
        });

        it('getResources stringifies', () => {
            const result = component.getResources();
            expect(api.getResources).toHaveBeenCalled();
            expect(result[0].id).toBe('r1');
        });

        it('getResourceById delegates and stringifies', () => {
            const result = component.getResourceById('r1');
            expect(api.getResourceById).toHaveBeenCalledWith('r1');
            expect(result.id).toBe('r1');
        });

        it('addResource delegates and stringifies', () => {
            const res = { id: 'r9', title: 'New Res' } as any;
            const result = component.addResource(res, true);
            expect(api.addResource).toHaveBeenCalledWith(res, true);
            expect(result.id).toBe('r1');
        });

        it('getParent delegates to resource.getParent', () => {
            const result = component.getParent('r1');
            expect(api._fakeResource.getParent).toHaveBeenCalled();
            expect(result.id).toBe('parent');
        });

        it('getChildren stringifies children', () => {
            const result = component.getChildren('r1');
            expect(api._fakeResource.getChildren).toHaveBeenCalled();
            expect(result[0].id).toBe('child');
        });

        it('getEvents stringifies resource events', () => {
            const result = component.getEvents('r1');
            expect(api._fakeResource.getEvents).toHaveBeenCalled();
            expect(result[0].id).toBe('e1');
        });

        it('setPropResource delegates to resource.setProp', () => {
            component.setPropResource('r1', 'title', 'X');
            expect(api._fakeResource.setProp).toHaveBeenCalledWith('title', 'X');
        });

        it('setExtendedPropResource delegates to resource.setExtendedProp', () => {
            component.setExtendedPropResource('r1', 'k', 'v');
            expect(api._fakeResource.setExtendedProp).toHaveBeenCalledWith('k', 'v');
        });

        it('removeResource delegates to resource.remove', () => {
            component.removeResource('r1');
            expect(api._fakeResource.remove).toHaveBeenCalled();
        });

        it('toPlainObjectResource returns JSON string', () => {
            const result = component.toPlainObjectResource('r1', { collapseColor: true });
            expect(api._fakeResource.toPlainObject).toHaveBeenCalledWith({ collapseColor: true });
            expect(result).toBe(JSON.stringify({ id: 'r1', title: 'Res 1' }));
        });

        it('setCalendarOption is a no-op when no calendar', () => {
            (component as any).calendarComponent = () => undefined;
            expect(() => component.setCalendarOption('weekends', false)).not.toThrow();
        });
    });

    describe('transforms (stringify helpers)', () => {
        it('stringifyEvent maps all fields', () => {
            const event: any = {
                source: { id: 's1', format: 'json', url: 'u' },
                start: new Date(2026, 0, 1),
                end: new Date(2026, 0, 2),
                startStr: '2026-01-01',
                endStr: '2026-01-02',
                id: 'e1',
                groupId: 'g1',
                allDay: true,
                title: 'T',
                url: 'eurl',
                display: 'auto',
                startEditable: true,
                durationEditable: false,
                constraint: 'c',
                overlap: true,
                color: '#fff',
                contrastColor: '#000',
                className: 'a b c',
                extendedProps: { x: 1 },
                resourceId: 'r1',
                resourceIds: ['r1', 'r2']
            };
            const result = component.stringifyEvent(event);
            expect(result.id).toBe('e1');
            expect(result.groupId).toBe('g1');
            expect(result.backgroundColor).toBe('#fff');
            expect(result.textColor).toBe('#000');
            expect(result.classNames).toEqual(['a', 'b', 'c']);
            expect(result.resourceIds).toEqual(['r1', 'r2']);
        });

        it('stringifyEvent handles empty className', () => {
            const result = component.stringifyEvent({ id: 'e1' } as any);
            expect(result.classNames).toEqual([]);
            expect(result.id).toBe('e1');
        });

        it('stringifyEventSource maps id/format/url', () => {
            const result = component.stringifyEventSource({ id: 's1', format: 'json', url: 'u' } as any);
            expect(result).toEqual({ id: 's1', format: 'json', url: 'u' });
        });

        it('stringifyView maps the view fields', () => {
            const view: any = {
                type: 'dayGridMonth',
                title: 'Jan',
                activeStart: new Date(2026, 0, 1),
                activeEnd: new Date(2026, 0, 31),
                currentStart: new Date(2026, 0, 1),
                currentEnd: new Date(2026, 1, 1)
            };
            const result = component.stringifyView(view);
            expect(result.type).toBe('dayGridMonth');
            expect(result.title).toBe('Jan');
        });

        it('stringifyResource keeps string eventConstraint, nulls non-string', () => {
            const str = component.stringifyResource({ id: 'r1', eventConstraint: 'biz' });
            expect(str.eventConstraint).toBe('biz');
            const nonStr = component.stringifyResource({ id: 'r2', eventConstraint: { foo: 1 } });
            expect(nonStr.eventConstraint).toBeNull();
        });

        it('evalDeepProperty returns nested value', () => {
            const obj: any = { a: { b: { c: 42 } } };
            expect(component.evalDeepProperty(obj, 'a.b.c')).toBe(42);
        });

        it('evalDeepProperty returns null when path breaks', () => {
            const obj: any = { a: null };
            expect(component.evalDeepProperty(obj, 'a.b.c')).toBeNull();
        });

        it('evalDeepProperty throws on empty property', () => {
            expect(() => component.evalDeepProperty({} as any, '')).toThrow();
        });
    });

    describe('callbacks (handlers invoked)', () => {
        it('viewDidMount sets _view and emits viewChange and calls handler', () => {
            const onViewDidMountMethodID = vi.fn();
            fixture.componentRef.setInput('onViewDidMountMethodID', onViewDidMountMethodID);
            fixture.detectChanges();
            const emitSpy = vi.spyOn(component.viewChange, 'emit');
            const view: any = { type: 'dayGridMonth', title: 'Jan' };
            component.viewDidMount({ view } as any);
            expect(component._view()).toBe(view);
            expect(onViewDidMountMethodID).toHaveBeenCalled();
            // emit is deferred with setTimeout, but handler fired synchronously
            expect(emitSpy).not.toHaveBeenCalled();
        });

        it('viewWillUnmount calls handler', () => {
            const onViewWillUnmountMethodID = vi.fn();
            fixture.componentRef.setInput('onViewWillUnmountMethodID', onViewWillUnmountMethodID);
            fixture.detectChanges();
            component.viewWillUnmount({ view: { type: 'x' } } as any);
            expect(onViewWillUnmountMethodID).toHaveBeenCalled();
        });

        it('resourceAdd reverts when handler resolves false', async () => {
            const revert = vi.fn();
            const onResourceAddMethodID = vi.fn(() => Promise.resolve(false));
            fixture.componentRef.setInput('onResourceAddMethodID', onResourceAddMethodID);
            fixture.detectChanges();
            component.resourceAdd({ resource: { id: 'r1' }, revert } as any);
            await Promise.resolve();
            await Promise.resolve();
            expect(onResourceAddMethodID).toHaveBeenCalled();
            expect(revert).toHaveBeenCalled();
        });

        it('resourceChange calls handler with old and new', async () => {
            const onResourceChangeMethodID = vi.fn(() => Promise.resolve(true));
            fixture.componentRef.setInput('onResourceChangeMethodID', onResourceChangeMethodID);
            fixture.detectChanges();
            component.resourceChange({ oldResource: { id: 'o' }, resource: { id: 'n' }, revert: vi.fn() } as any);
            await Promise.resolve();
            expect(onResourceChangeMethodID).toHaveBeenCalledWith({ id: 'o' }, { id: 'n' });
        });

        it('resourceRemove calls handler', async () => {
            const onResourceRemoveMethodID = vi.fn(() => Promise.resolve(true));
            fixture.componentRef.setInput('onResourceRemoveMethodID', onResourceRemoveMethodID);
            fixture.detectChanges();
            component.resourceRemove({ resource: { id: 'r1' }, revert: vi.fn() } as any);
            await Promise.resolve();
            expect(onResourceRemoveMethodID).toHaveBeenCalled();
        });

        it('resourcesSet calls handler', () => {
            const onResourcesSetMethodID = vi.fn();
            fixture.componentRef.setInput('onResourcesSetMethodID', onResourcesSetMethodID);
            fixture.detectChanges();
            component.resourcesSet([{ id: 'r1' }] as any);
            expect(onResourcesSetMethodID).toHaveBeenCalledWith([{ id: 'r1' }]);
        });

        it('loading calls handler', () => {
            const onLoadingMethodID = vi.fn();
            fixture.componentRef.setInput('onLoadingMethodID', onLoadingMethodID);
            fixture.detectChanges();
            component.loading(true);
            expect(onLoadingMethodID).toHaveBeenCalledWith(true);
        });

        it('datesSet calls handler with stringified view', () => {
            const onDatesSetMethodID = vi.fn();
            fixture.componentRef.setInput('onDatesSetMethodID', onDatesSetMethodID);
            fixture.detectChanges();
            const arg: any = { start: new Date(), end: new Date(), startStr: 'a', endStr: 'b', timeZone: 'local', view: { type: 't' } };
            component.datesSet(arg);
            expect(onDatesSetMethodID).toHaveBeenCalled();
            expect((onDatesSetMethodID.mock.calls[0] as any[])[5].type).toBe('t');
        });

        it('selectCallback calls handler', () => {
            const onSelectMethodID = vi.fn();
            fixture.componentRef.setInput('onSelectMethodID', onSelectMethodID);
            fixture.detectChanges();
            const arg: any = { start: new Date(), end: new Date(), startStr: 'a', endStr: 'b', allDay: false, jsEvent: {}, view: { type: 't' }, resource: { _resource: { id: 'r' } } };
            component.selectCallback(arg);
            expect(onSelectMethodID).toHaveBeenCalled();
            expect((onSelectMethodID.mock.calls[0] as any[])[7]).toEqual({ id: 'r' });
        });

        it('unselectCallback calls handler', () => {
            const onUnselectMethodID = vi.fn();
            fixture.componentRef.setInput('onUnselectMethodID', onUnselectMethodID);
            fixture.detectChanges();
            component.unselectCallback({ jsEvent: {}, view: { type: 't' } } as any);
            expect(onUnselectMethodID).toHaveBeenCalled();
        });

        it('navLinkDayClick calls handler', () => {
            const onNavLinkDayClickMethodID = vi.fn();
            fixture.componentRef.setInput('onNavLinkDayClickMethodID', onNavLinkDayClickMethodID);
            fixture.detectChanges();
            const d = new Date();
            const e = {} as any;
            component.navLinkDayClick(d, e);
            expect(onNavLinkDayClickMethodID).toHaveBeenCalledWith(d, e);
        });

        it('navLinkWeekClick calls handler', () => {
            const onNavLinkWeekClickMethodID = vi.fn();
            fixture.componentRef.setInput('onNavLinkWeekClickMethodID', onNavLinkWeekClickMethodID);
            fixture.detectChanges();
            const d = new Date();
            const e = {} as any;
            component.navLinkWeekClick(d, e);
            expect(onNavLinkWeekClickMethodID).toHaveBeenCalledWith(d, e);
        });

        it('dateClick single-click path calls onDateClick when no dbl handler', () => {
            const onDateClickMethodID = vi.fn();
            fixture.componentRef.setInput('onDateClickMethodID', onDateClickMethodID);
            fixture.detectChanges();
            const arg: any = { date: new Date(), dateStr: 's', dayEl: {}, jsEvent: {}, view: { type: 't' }, resource: { id: 'r' } };
            component.dateClick(arg);
            expect(onDateClickMethodID).toHaveBeenCalled();
        });

        it('dateClick double path calls onDateDblClick', () => {
            const onDateClickMethodID = vi.fn();
            const onDateDblClickMethodID = vi.fn();
            fixture.componentRef.setInput('onDateClickMethodID', onDateClickMethodID);
            fixture.componentRef.setInput('onDateDblClickMethodID', onDateDblClickMethodID);
            fixture.detectChanges();
            const arg: any = { date: new Date(), dateStr: 's', dayEl: {}, jsEvent: {}, view: { type: 't' }, resource: { id: 'r' } };
            component.dateClick(arg); // first -> sets timeout
            component.dateClick(arg); // second -> dbl
            expect(onDateDblClickMethodID).toHaveBeenCalled();
        });

        it('eventClick single-click path calls onEventClick when no dbl handler', () => {
            const onEventClickMethodID = vi.fn();
            fixture.componentRef.setInput('onEventClickMethodID', onEventClickMethodID);
            fixture.detectChanges();
            const arg: any = { event: { id: 'e1' }, jsEvent: {}, view: { type: 't' } };
            component.eventClick(arg);
            expect(onEventClickMethodID).toHaveBeenCalled();
        });

        it('eventClick double path calls onEventDblClick', () => {
            const onEventClickMethodID = vi.fn();
            const onEventDblClickMethodID = vi.fn();
            fixture.componentRef.setInput('onEventClickMethodID', onEventClickMethodID);
            fixture.componentRef.setInput('onEventDblClickMethodID', onEventDblClickMethodID);
            fixture.detectChanges();
            const arg: any = { event: { id: 'e1' }, jsEvent: {}, view: { type: 't' } };
            component.eventClick(arg);
            component.eventClick(arg);
            expect(onEventDblClickMethodID).toHaveBeenCalled();
        });

        it('eventMouseEnter calls both handlers', () => {
            const onEventMouseEnterMethodID = vi.fn();
            const onMouseEnter = vi.fn();
            fixture.componentRef.setInput('onEventMouseEnterMethodID', onEventMouseEnterMethodID);
            fixture.componentRef.setInput('onMouseEnter', onMouseEnter);
            fixture.detectChanges();
            component.eventMouseEnter({ event: { id: 'e1' }, jsEvent: {}, view: { type: 't' } } as any);
            expect(onEventMouseEnterMethodID).toHaveBeenCalled();
            expect(onMouseEnter).toHaveBeenCalled();
        });

        it('eventMouseLeave calls both handlers', () => {
            const onEventMouseLeaveMethodID = vi.fn();
            const onMouseLeave = vi.fn();
            fixture.componentRef.setInput('onEventMouseLeaveMethodID', onEventMouseLeaveMethodID);
            fixture.componentRef.setInput('onMouseLeave', onMouseLeave);
            fixture.detectChanges();
            component.eventMouseLeave({ event: { id: 'e1' }, jsEvent: {}, view: { type: 't' } } as any);
            expect(onEventMouseLeaveMethodID).toHaveBeenCalled();
            expect(onMouseLeave).toHaveBeenCalled();
        });

        it('eventAdd reverts on false', async () => {
            const revert = vi.fn();
            const onEventAddMethodID = vi.fn(() => Promise.resolve(false));
            fixture.componentRef.setInput('onEventAddMethodID', onEventAddMethodID);
            fixture.detectChanges();
            component.eventAdd({ event: { id: 'e1' }, relatedEvents: [{ id: 'e2' }], revert } as any);
            await Promise.resolve();
            await Promise.resolve();
            expect(revert).toHaveBeenCalled();
        });

        it('eventRemove calls handler', async () => {
            const onEventRemoveMethodID = vi.fn(() => Promise.resolve(true));
            fixture.componentRef.setInput('onEventRemoveMethodID', onEventRemoveMethodID);
            fixture.detectChanges();
            component.eventRemove({ event: { id: 'e1' }, relatedEvents: [], revert: vi.fn() } as any);
            await Promise.resolve();
            expect(onEventRemoveMethodID).toHaveBeenCalled();
        });

        it('eventChange calls handler with event and oldEvent', async () => {
            const onEventChangeMethodID = vi.fn(() => Promise.resolve(true));
            fixture.componentRef.setInput('onEventChangeMethodID', onEventChangeMethodID);
            fixture.detectChanges();
            component.eventChange({ event: { id: 'e1' }, oldEvent: { id: 'e0' }, relatedEvents: [], revert: vi.fn() } as any);
            await Promise.resolve();
            expect(onEventChangeMethodID).toHaveBeenCalled();
        });

        it('eventResize passes millisecond deltas', async () => {
            const onEventResizeMethodID = vi.fn(() => Promise.resolve(true));
            fixture.componentRef.setInput('onEventResizeMethodID', onEventResizeMethodID);
            fixture.detectChanges();
            const zero = { years: 0, months: 0, days: 0, milliseconds: 0 };
            const oneDay = { years: 0, months: 0, days: 1, milliseconds: 0 };
            component.eventResize({ event: { id: 'e1' }, oldEvent: { id: 'e0' }, relatedEvents: [], endDelta: oneDay, startDelta: zero, jsEvent: {}, view: {}, revert: vi.fn() } as any);
            await Promise.resolve();
            expect(onEventResizeMethodID).toHaveBeenCalled();
            expect((onEventResizeMethodID.mock.calls[0] as any[])[3]).toBe(86400000);
        });

        it('eventDrop passes resources and delta', async () => {
            const onEventDropMethodID = vi.fn(() => Promise.resolve(true));
            fixture.componentRef.setInput('onEventDropMethodID', onEventDropMethodID);
            fixture.detectChanges();
            const delta = { years: 0, months: 0, days: 0, milliseconds: 1000 };
            component.eventDrop({ event: { id: 'e1' }, oldEvent: { id: 'e0' }, relatedEvents: [], oldResource: { id: 'o' }, newResource: { id: 'n' }, delta, jsEvent: {}, view: {}, revert: vi.fn() } as any);
            await Promise.resolve();
            expect(onEventDropMethodID).toHaveBeenCalled();
            expect((onEventDropMethodID.mock.calls[0] as any[])[5]).toBe(1000);
        });

        it('drop calls handler', () => {
            const onDropMethodID = vi.fn();
            fixture.componentRef.setInput('onDropMethodID', onDropMethodID);
            fixture.detectChanges();
            component.drop({ allDay: true, date: new Date(), dateStr: 's', draggedEl: {}, jsEvent: {}, resource: { id: 'r' }, view: { type: 't' } } as any);
            expect(onDropMethodID).toHaveBeenCalled();
        });

        it('eventResizeStart calls handler', () => {
            const onEventResizeStartMethodID = vi.fn();
            fixture.componentRef.setInput('onEventResizeStartMethodID', onEventResizeStartMethodID);
            fixture.detectChanges();
            component.eventResizeStart({ event: { id: 'e1' }, jsEvent: {}, view: { type: 't' } } as any);
            expect(onEventResizeStartMethodID).toHaveBeenCalled();
        });

        it('eventResizeStop calls handler', () => {
            const onEventResizeStopMethodID = vi.fn();
            fixture.componentRef.setInput('onEventResizeStopMethodID', onEventResizeStopMethodID);
            fixture.detectChanges();
            component.eventResizeStop({ event: { id: 'e1' }, jsEvent: {}, view: { type: 't' } } as any);
            expect(onEventResizeStopMethodID).toHaveBeenCalled();
        });

        it('eventDragStart calls handler', () => {
            const onEventDragStartMethodID = vi.fn();
            fixture.componentRef.setInput('onEventDragStartMethodID', onEventDragStartMethodID);
            fixture.detectChanges();
            component.eventDragStart({ event: { id: 'e1' }, jsEvent: {}, view: { type: 't' } } as any);
            expect(onEventDragStartMethodID).toHaveBeenCalled();
        });

        it('eventDragStop calls handler', () => {
            const onEventDragStopMethodID = vi.fn();
            fixture.componentRef.setInput('onEventDragStopMethodID', onEventDragStopMethodID);
            fixture.detectChanges();
            component.eventDragStop({ event: { id: 'e1' }, jsEvent: {}, view: { type: 't' } } as any);
            expect(onEventDragStopMethodID).toHaveBeenCalled();
        });

        it('eventReceive calls handler', async () => {
            const onEventReceiveMethodID = vi.fn(() => Promise.resolve(true));
            fixture.componentRef.setInput('onEventReceiveMethodID', onEventReceiveMethodID);
            fixture.detectChanges();
            component.eventReceive({ event: { id: 'e1' }, relatedEvents: [], draggedEl: {}, view: { type: 't' }, revert: vi.fn() } as any);
            await Promise.resolve();
            expect(onEventReceiveMethodID).toHaveBeenCalled();
        });

        it('eventLeave calls handler', async () => {
            const onEventLeaveMethodID = vi.fn(() => Promise.resolve(true));
            fixture.componentRef.setInput('onEventLeaveMethodID', onEventLeaveMethodID);
            fixture.detectChanges();
            component.eventLeave({ event: { id: 'e1' }, relatedEvents: [], draggedEl: {}, view: { type: 't' }, revert: vi.fn() } as any);
            await Promise.resolve();
            expect(onEventLeaveMethodID).toHaveBeenCalled();
        });

        it('eventsSet stringifies and calls handler', () => {
            const onEventsSetMethodID = vi.fn();
            fixture.componentRef.setInput('onEventsSetMethodID', onEventsSetMethodID);
            fixture.detectChanges();
            component.eventsSet([{ id: 'e1' }, { id: 'e2' }] as any);
            expect(onEventsSetMethodID).toHaveBeenCalled();
            expect((onEventsSetMethodID.mock.calls[0] as any[])[0].length).toBe(2);
        });

        it('windowResize calls handler', () => {
            const onWindowResizeMethodID = vi.fn();
            fixture.componentRef.setInput('onWindowResizeMethodID', onWindowResizeMethodID);
            fixture.detectChanges();
            component.windowResize({ view: { type: 't' } as any });
            expect(onWindowResizeMethodID).toHaveBeenCalled();
        });

        it('eventDidMount wires tooltip handlers when tooltipExpression set', () => {
            fixture.componentRef.setInput('tooltipExpression', '{{title}}');
            fixture.detectChanges();
            const showSpy = vi.spyOn(component.tooltipService, 'showTooltip').mockImplementation(() => undefined as any);
            const hideSpy = vi.spyOn(component.tooltipService, 'hideTooltip').mockImplementation(() => undefined as any);
            const el: any = {};
            component.eventDidMount({ event: { title: 'Hi' }, el });
            expect(typeof el.onmouseenter).toBe('function');
            expect(typeof el.onmouseleave).toBe('function');
            el.onmouseenter({});
            el.onmouseleave({});
            expect(showSpy).toHaveBeenCalled();
            expect(hideSpy).toHaveBeenCalled();
        });

        it('eventDidMount wires contextmenu when right-click handler set', () => {
            const onEventRightClickMethodID = vi.fn();
            fixture.componentRef.setInput('onEventRightClickMethodID', onEventRightClickMethodID);
            fixture.detectChanges();
            const listeners: Record<string, (e: any) => void> = {};
            const el: any = { addEventListener: (type: string, fn: any) => { listeners[type] = fn; } };
            component.eventDidMount({ event: { id: 'e1' }, el, view: { type: 't' } });
            expect(typeof listeners['contextmenu']).toBe('function');
            const preventDefault = vi.fn();
            listeners['contextmenu']({ preventDefault });
            expect(preventDefault).toHaveBeenCalled();
            expect(onEventRightClickMethodID).toHaveBeenCalled();
        });
    });

    describe('event source helpers', () => {
        it('getES concatenates all source arrays', async () => {
            await createComponent({
                arrayEventSources: [{ id: 'a1' }],
                gcalEventSources: [{ id: 'g1', googleCalendarId: 'x' }],
                jsonEventSources: [{ id: 'j1' }],
                iCalendarEventSources: [{ id: 'i1' }]
            });
            const result = component.getES();
            const ids = result.map((s: any) => s.id);
            expect(ids).toContain('a1');
            expect(ids).toContain('g1');
            expect(ids).toContain('j1');
            expect(ids).toContain('i1');
        });

        it('getES wraps function event sources', async () => {
            await createComponent({ functionEventSources: [{ id: 'f1', events: vi.fn() }] });
            const result = component.getES();
            expect(result.length).toBe(1);
            expect(typeof (result[0] as any).events).toBe('function');
        });

        it('getEventSourcesIndexById returns matching index', () => {
            fixture.componentRef.setInput('eventSources', [{ id: 's0' }, { id: 's1' }] as any);
            fixture.detectChanges();
            expect(component.getEventSourcesIndexById('s1')).toBe(1);
            expect(component.getEventSourcesIndexById('missing')).toBeNull();
        });

        it('transformFunctionResource returns a loader that resolves', async () => {
            const resolveFn = vi.fn(() => Promise.resolve(['ev']));
            const loader = component.transformFunctionResource(resolveFn);
            const success = vi.fn();
            const failure = vi.fn();
            loader({ start: new Date(), end: new Date() } as any, success, failure);
            await Promise.resolve();
            expect(resolveFn).toHaveBeenCalled();
            expect(success).toHaveBeenCalledWith(['ev']);
        });

        it('transformFunctionEventSource copies props and sets events function', () => {
            const src = component.transformFunctionEventSource({ id: 'f1', color: 'red' } as any, vi.fn());
            expect(src.id).toBe('f1');
            expect((src as any).color).toBe('red');
            expect(typeof src.events).toBe('function');
        });
    });

    describe('lifecycle', () => {
        it('svyOnChanges triggers initFullCalendar when hasToDraw goes false->true', () => {
            const spy = vi.spyOn(component, 'initFullCalendar');
            component.svyOnChanges({ hasToDraw: { currentValue: true, previousValue: false } });
            expect(spy).toHaveBeenCalled();
        });

        it('svyOnChanges ignores unrelated property changes', () => {
            const spy = vi.spyOn(component, 'initFullCalendar');
            component.svyOnChanges({ styleClass: { currentValue: 'x', previousValue: '' } });
            expect(spy).not.toHaveBeenCalled();
        });

        it('svyOnChanges handles null changes', () => {
            expect(() => component.svyOnChanges(null)).not.toThrow();
        });
    });
});

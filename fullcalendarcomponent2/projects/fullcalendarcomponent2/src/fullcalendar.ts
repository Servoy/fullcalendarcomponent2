import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { BaseCustomObject, LoggerFactory, LoggerService, ServoyBaseComponent, ServoyPublicService } from '@servoy/public';
import { FullCalendarComponent} from '@fullcalendar/angular';
import { Input } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import { DateClickArg, DropArg, EventDragStartArg, EventDragStopArg, EventLeaveArg, EventReceiveArg, EventResizeDoneArg, EventResizeStartArg, EventResizeStopArg } from '@fullcalendar/interaction';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import resourceDayGridPlugin from '@fullcalendar/resource-daygrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeline from '@fullcalendar/timeline';
import luxonPlugin from '@fullcalendar/luxon2';
import iCalendarPlugin from '@fullcalendar/icalendar';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { CommonModule } from '@angular/common';
import { ServoyPublicModule, SpecTypesService } from '@servoy/public';
import { ResourceAddArg, ResourceApi, ResourceChangeArg, ResourceRemoveArg } from '@fullcalendar/resource';
import { CalendarOptions, ConstraintInput, DateInput, DateRangeInput, DateSelectArg, DatesSetArg,
    DateUnselectArg, Duration, DurationInput, EventAddArg, EventApi, EventChangeArg, EventClickArg,
    EventDropArg, EventHoveringArg, EventInput, EventRemoveArg, EventSourceApi, FormatterInput, ViewApi, ViewMountArg } from '@fullcalendar/core';
import { PointerDragEvent } from '@fullcalendar/core/internal';

@Component({
    selector: 'svy-fullcalendar2',
    templateUrl: './fullcalendar.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullCalendar extends ServoyBaseComponent<HTMLDivElement> implements OnInit {

    // IMPLEMENTED
    @Input() onSelectMethodID: (start: Date, end: Date, startStr: string, endStr: string, allDay: boolean, event: MouseEvent, view: View, resource?: any) => void;
    @Input() onUnselectMethodID: (jsEvent: MouseEvent, view: View) => void;
    @Input() onDateClickMethodID: (date: Date, dateStr: string, dayEl: HTMLElement, event: MouseEvent, view: View, resource?: Resource) => void;
    @Input() onNavLinkDayClickMethodID: (date: Date, event: MouseEvent) => void;
    @Input() onNavLinkWeekClickMethodID: (date: Date, event: MouseEvent) => void;
    @Input() onEventClickMethodID: (event: Event, jsEvent: MouseEvent, view: View) => void;
    @Input() onEventMouseEnterMethodID: (el: HTMLElement, event: Event, jsEvent: MouseEvent, view: View) => void;
    @Input() onEventMouseLeaveMethodID: (el: HTMLElement, event: Event, jsEvent: MouseEvent, view: View) => void;
    @Input() onEventAddMethodID: (event: Event, relatedEvents: Event[]) => Promise<boolean>;
    @Input() onEventRemoveMethodID: (event: Event, relatedEvents: Event[]) => Promise<boolean>;
    @Input() onEventChangeMethodID: (event: Event, oldEvent: Event, relatedEvents: Event[]) => Promise<boolean>;
    @Input() onLoadingMethodID: (isLoading: boolean) => void;
    @Input() onDatesSetMethodID: (start: Date, end: Date, startStr: string, endStr: string, timeZone: string, view: View) => void;
    @Input() onEventsSetMethodID: (events: Event[]) => void;
    @Input() onWindowResizeMethodID: (view: View) => void;
    @Input() onEventResizeMethodID: (event: Event, relatedEvents: Event[], oldEvent: Event, endDelta: Duration, startDelta: Duration, view: View,
        el: HTMLElement, jsEvent: MouseEvent) => Promise<boolean>;
    @Input() onEventDropMethodID: (event: Event, relatedEvents: Event[], oldEvent: Event, oldResource: Resource,
        newResource: Resource, delta: Duration, view: View, el: HTMLElement, jsEvent: MouseEvent) => Promise<boolean>;
    @Input() onDropMethodID: (allDay: boolean, date: Date, dateStr: string, draggedEl: HTMLElement, jsEvent: MouseEvent, resource: Resource, view: View) => void;
    @Input() onEventDragStartMethodID: (event: Event, jsEvent: MouseEvent, view: View) => void;
    @Input() onEventResizeStartMethodID: (event: Event, jsEvent: MouseEvent, view: View) => void;
    @Input() onEventDragStopMethodID: (event: Event, jsEvent: MouseEvent, view: View) => void;
    @Input() onEventResizeStopMethodID: (event: Event, jsEvent: MouseEvent, view: View) => void;
    @Input() onEventReceiveMethodID: (event: Event, relatedEvents: Event[], draggedEl: HTMLElement, view: View) => Promise<boolean>;
    @Input() onEventLeaveMethodID: (event: Event, relatedEvents: Event[], draggedEl: HTMLElement, view: View) => Promise<boolean>;
    @Input() onResourceAddMethodID: (resource: ResourceApi) => Promise<boolean>;
    @Input() onResourceChangeMethodID: (oldResource: ResourceApi, newResource: ResourceApi) => Promise<boolean>;
    @Input() onResourceRemoveMethodID: (resource: ResourceApi) => Promise<boolean>;
    @Input() onResourcesSetMethodID: (resources: ResourceApi[]) => void;
    @Input() onViewDidMountMethodID: (view: View) => void;
    @Input() onViewWillUnmountMethodID: (view: View) => void;

    @Input() hasToDraw: boolean;
    @Input() renderOnCurrentView: boolean;
    @Input() styleClass: string;
    @Input() calendarOptions: CalendarOptions;
    @Input() view: ViewApi;
    @Input() events: EventInput[];
    @Input() eventSources: EventSource[];
    @Input() arrayEventSources: ArrayEventSource[];
    @Input() functionEventSources: FunctionEventSource[];
    @Input() gcalEventSources: GoogleCalendarEventSource[];
    @Input() jsonEventSources: JSONEventSource[];
    @Input() functionResources: ServerFunction;
    @Input() iCalendarEventSources: iCalendarEventSource[];
    @Input() tooltipExpression: string;
    @Input() themeSystem: string;
    @ViewChild('calendar') calendarComponent: FullCalendarComponent;
    @ViewChild('element', { static: false }) elementRef: ElementRef<HTMLDivElement>;

    fullCalendarOptions: CalendarOptions = {};
    TIMEZONE_DEFAULT = 'local';
    log: LoggerService;
    isReadyForRendering = false;

    constructor(private servoyService: ServoyPublicService,
        renderer: Renderer2, cdRef: ChangeDetectorRef,
        logFactory: LoggerFactory) {
        super(renderer, cdRef);
        this.log = logFactory.getLogger('FullCalendar');
    }

    svyOnChanges(changes: SimpleChanges) {
        if (changes) {
            for (const property of Object.keys(changes)) {
                const change = changes[property];
                switch (property) {
                    case 'hasToDraw': {
                        if (change.currentValue === true && change.previousValue === false) {
                            this.initFullCalendar();
                            this.hasToDraw = false;
                        }
                        break;
                    }
                }
            }
        }
    }

    svyOnInit() {
        super.svyOnInit();
        this.initFullCalendar();
    }

    initFullCalendar() {
        this.fullCalendarOptions = this.calendarOptions ? this.calendarOptions : {} as CalendarOptions;

        this.initializeCallbacks();

        if ((!this.hasToDraw || this.renderOnCurrentView) && this.view) {
            this.fullCalendarOptions.initialView = this.view.title;
            this.fullCalendarOptions.initialDate = new Date(this.view.currentStart);
        }
        if (this.events && this.events.length) {
            this.fullCalendarOptions.events = this.events;
        }
        if (!this.fullCalendarOptions.timeZone) {
            this.fullCalendarOptions.timeZone = this.TIMEZONE_DEFAULT;
        }

        const eventSources = this.getES();
        if (eventSources) {
            this.fullCalendarOptions.eventSources = eventSources;
        }

        if (this.functionResources) {
            this.fullCalendarOptions.resources = this.transformFunctionResource(this.functionResources);
        }

        this.fullCalendarOptions.plugins = [ // register FullCalendar plugins
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            listPlugin,
            luxonPlugin,
            googleCalendarPlugin,
            iCalendarPlugin,
            bootstrap5Plugin
        ];
        if (this.fullCalendarOptions.schedulerLicenseKey) {
            this.fullCalendarOptions.plugins.push(timeline, resourceTimelinePlugin, resourceTimeGridPlugin, resourceDayGridPlugin);
        }

        if (this.themeSystem) {
            this.fullCalendarOptions.themeSystem = this.themeSystem;
        }

        this.isReadyForRendering = true;
    }

    /***********************************************************************************************************
    * CALLBACKS
    * **********************************************************************************************************/

    viewDidMount = (viewDidMount: ViewMountArg) => {
        this.view = viewDidMount.view;
        if (this.onViewDidMountMethodID) {
            this.onViewDidMountMethodID(this.stringifyView(viewDidMount.view));
        }
    }

    viewWillUnmount = (viewWillUnmount: ViewMountArg) => {
        if (this.onViewWillUnmountMethodID) {
            this.onViewWillUnmountMethodID(this.stringifyView(viewWillUnmount.view));
        }
    }

    resourceAdd = (resAdd: ResourceAddArg) => {
        if (this.onResourceAddMethodID) {
            this.onResourceAddMethodID(resAdd.resource).then(success => {
                if (!success) {
                    resAdd.revert();
                }
            }, error => {
                this.log.error('resourceAdd handler error');
                this.log.error(error);
            });
        }

    }
    resourceChange = (resChange: ResourceChangeArg) => {
        if (this.onResourceChangeMethodID) {
            this.onResourceChangeMethodID(resChange.oldResource, resChange.resource).then(success => {
                if (!success) {
                    resChange.revert();
                }
            }, error => {
                this.log.error('resourceChange handler error');
                this.log.error(error);
            });
        }
    }
    resourceRemove = (resRemove: ResourceRemoveArg) => {
        if (this.onResourceRemoveMethodID) {
            this.onResourceRemoveMethodID(resRemove.resource).then(success => {
                if (!success) {
                    resRemove.revert();
                }
            }, error => {
                this.log.error('resourceRemove handler error');
                this.log.error(error);
            });
        }
    }
    resourcesSet = (resources: ResourceApi[]) => {
        if (this.onResourcesSetMethodID) {
            this.onResourcesSetMethodID(resources);
        }
    }

    loading = (isLoading: boolean) => {
        if (this.onLoadingMethodID) {
            this.onLoadingMethodID(isLoading);
        }
    }

    datesSet = (arg: DatesSetArg) => {
        if (this.onDatesSetMethodID) {
            this.onDatesSetMethodID(arg.start, arg.end, arg.startStr, arg.endStr, arg.timeZone, this.stringifyView(arg.view));
        }
    }

    selectCallback = (selectionInfo: DateSelectArg) => {
        if (this.onSelectMethodID) {
            this.onSelectMethodID(selectionInfo.start, selectionInfo.end, selectionInfo.startStr, selectionInfo.endStr,
                selectionInfo.allDay, selectionInfo.jsEvent, this.stringifyView(selectionInfo.view), selectionInfo.resource);
        }
    }

    unselectCallback = (selectionInfo: DateUnselectArg) => {
        if (this.onUnselectMethodID) {
            this.onUnselectMethodID(selectionInfo.jsEvent, this.stringifyView(selectionInfo.view));
        }
    }

    dateClick = (arg: DateClickArg) => {
        if (this.onDateClickMethodID) {
            this.onDateClickMethodID(arg.date, arg.dateStr, arg.dayEl, arg.jsEvent, this.stringifyView(arg.view), this.stringifyResource(arg.resource));
        }
    }

    navLinkDayClick = (date : Date,event : MouseEvent) => {
        if (this.onNavLinkDayClickMethodID) {
            this.onNavLinkDayClickMethodID(date, event);
        }
    }
    
    navLinkWeekClick = (date : Date,event : MouseEvent) => {
        if (this.onNavLinkWeekClickMethodID) {
            this.onNavLinkWeekClickMethodID(date, event);
        }
    }
    
    eventClick = (eventClickArg: EventClickArg) => {
        if (this.onEventClickMethodID) {
            this.onEventClickMethodID(this.stringifyEvent(eventClickArg.event), eventClickArg.jsEvent, this.stringifyView(eventClickArg.view));
        }
    }

    eventMouseEnter = (eventHovering: EventHoveringArg) => {
        if (this.onEventMouseEnterMethodID) {
            this.onEventMouseEnterMethodID(eventHovering.el, this.stringifyEvent(eventHovering.event), eventHovering.jsEvent, eventHovering.view);
        }
    }

    eventMouseLeave = (eventHovering: EventHoveringArg) => {
        if (this.onEventMouseLeaveMethodID) {
            this.onEventMouseLeaveMethodID(eventHovering.el, this.stringifyEvent(eventHovering.event), eventHovering.jsEvent, eventHovering.view);
        }
    }

    eventAdd = (eventAdd: EventAddArg) => {
        if (this.onEventAddMethodID) {
            const stringifyedRelatedEvents = [];
            eventAdd.relatedEvents.forEach((e) => {
                stringifyedRelatedEvents.push(this.stringifyEvent(e));
            });
            this.onEventAddMethodID(this.stringifyEvent(eventAdd.event), stringifyedRelatedEvents).then((success) => {
                if (!success) {
                    eventAdd.revert();
                }
            }, (error) => {
                this.log.error('eventAdd handler error');
                this.log.error(error);
            });
        }
    }

    eventRemove = (eventRemove: EventRemoveArg) => {
        if (this.onEventRemoveMethodID) {
            const stringifyedRelatedEvents = [];
            eventRemove.relatedEvents.forEach((e) => {
                stringifyedRelatedEvents.push(this.stringifyEvent(e));
            });
            this.onEventRemoveMethodID(this.stringifyEvent(eventRemove.event), stringifyedRelatedEvents).then((success) => {
                if (!success) {
                    eventRemove.revert();
                }
            }, (error) => {
                this.log.error('eventRemove handler error');
                this.log.error(error);
            });
        }
    }

    eventChange = (eventChange: EventChangeArg) => {
        if (this.onEventChangeMethodID) {
            const stringifyedRelatedEvents = [];
            eventChange.relatedEvents.forEach((e) => {
                stringifyedRelatedEvents.push(this.stringifyEvent(e));
            });
            this.onEventChangeMethodID(this.stringifyEvent(eventChange.event),
                this.stringifyEvent(eventChange.oldEvent), stringifyedRelatedEvents).then((success) => {
                    if (!success) {
                        eventChange.revert();
                    }
                }, (error) => {
                    this.log.error('eventChange handler error');
                    this.log.error(error);
                });
        }
    }

    eventResize = (resizeArg: EventResizeDoneArg) => {
        if (this.onEventResizeMethodID) {
            const stringifyedRelatedEvents = [];
            resizeArg.relatedEvents.forEach((e) => {
                stringifyedRelatedEvents.push(this.stringifyEvent(e));
            });
            const retValue = this.onEventResizeMethodID(this.stringifyEvent(resizeArg.event), stringifyedRelatedEvents, this.stringifyEvent(resizeArg.oldEvent),
                resizeArg.endDelta, resizeArg.startDelta, resizeArg.view, resizeArg.el, resizeArg.jsEvent);
            retValue.then((success) => {
                if (!success) {
                    resizeArg.revert();
                }
            }, (error) => {
                this.log.error('onResize handler error');
                this.log.error(error);
            });
        }
    }

    eventDrop = (dropArg: EventDropArg) => {
        if (this.onEventDropMethodID) {
            const stringifyedRelatedEvents = [];
            dropArg.relatedEvents.forEach((e) => {
                stringifyedRelatedEvents.push(this.stringifyEvent(e));
            });
            const retValue = this.onEventDropMethodID(this.stringifyEvent(dropArg.event), stringifyedRelatedEvents, this.stringifyEvent(dropArg.oldEvent),
                this.stringifyResource(dropArg.oldResource), this.stringifyResource(dropArg.newResource), dropArg.delta, this.stringifyView(dropArg.view), dropArg.el, dropArg.jsEvent);
            retValue.then((success) => {
                if (!success) {
                    dropArg.revert();
                }
            }, (error) => {
                this.log.error('onDrop handler error');
                this.log.error(error);
            });
        }
    }

    drop = (dropArg: DropArg) => {
        if (this.onDropMethodID) {
            this.onDropMethodID(dropArg.allDay, dropArg.date, dropArg.dateStr, dropArg.draggedEl,
                dropArg.jsEvent, this.stringifyResource(dropArg.resource), this.stringifyView(dropArg.view));
        }
    }

    eventResizeStart = (resizeStart: EventResizeStartArg) => {
        if (this.onEventResizeStartMethodID) {
            this.onEventResizeStartMethodID(this.stringifyEvent(resizeStart.event), resizeStart.jsEvent, this.stringifyView(resizeStart.view));
        }
    }

    eventResizeStop = (resizeStop: EventResizeStopArg) => {
        if (this.onEventResizeStopMethodID) {
            this.onEventResizeStopMethodID(this.stringifyEvent(resizeStop.event), resizeStop.jsEvent, this.stringifyView(resizeStop.view));
        }
    }

    eventDragStart = (dragStart: EventDragStartArg) => {
        if (this.onEventDragStartMethodID) {
            this.onEventDragStartMethodID(this.stringifyEvent(dragStart.event), dragStart.jsEvent, this.stringifyView(dragStart.view));
        }
    }

    eventDragStop = (dragStop: EventDragStopArg) => {
        if (this.onEventDragStopMethodID) {
            this.onEventDragStopMethodID(this.stringifyEvent(dragStop.event), dragStop.jsEvent, this.stringifyView(dragStop.view));
        }
    }

    eventReceive = (receiveArg: EventReceiveArg) => {
        if (this.onEventReceiveMethodID) {
            const stringifyedRelatedEvents = [];
            receiveArg.relatedEvents.forEach((e) => {
                stringifyedRelatedEvents.push(this.stringifyEvent(e));
            });
            this.onEventReceiveMethodID(this.stringifyEvent(receiveArg.event), stringifyedRelatedEvents,
                receiveArg.draggedEl, this.stringifyView(receiveArg.view)).then(success => {
                    if (!success) {
                        receiveArg.revert();
                    }
                }, error => {
                    this.log.error('eventReceive handler error');
                    this.log.error(error);
                });
        }
    }

    eventLeave = (leaveArg: EventLeaveArg) => {
        if (this.onEventLeaveMethodID) {
            const stringifyedRelatedEvents = [];
            leaveArg.relatedEvents.forEach((e) => {
                stringifyedRelatedEvents.push(this.stringifyEvent(e));
            });
            this.onEventReceiveMethodID(this.stringifyEvent(leaveArg.event), stringifyedRelatedEvents,
                leaveArg.draggedEl, this.stringifyView(leaveArg.view)).then(success => {
                    if (!success) {
                        leaveArg.revert();
                    }
                }, error => {
                    this.log.error('eventLeave handler error');
                    this.log.error(error);
                });
        }
    }

    eventsSet = (events: EventApi[]) => {
        if (this.onEventsSetMethodID) {
            const stringifyedRelatedEvents = [];
            events.forEach((e) => {
                stringifyedRelatedEvents.push(this.stringifyEvent(e));
            });
            this.onEventsSetMethodID(stringifyedRelatedEvents);
        }
    }

    windowResize = (arg: { view: ViewApi }) => {
        if (this.onWindowResizeMethodID) {
            this.onWindowResizeMethodID(arg.view);
        }
    }

    /***********************************************************************************************************
    * APIs
    * **********************************************************************************************************/

    select(dateOrObj: any, end?: DateInput) {
        this.calendarComponent.getApi().select(dateOrObj, end);
    }

    unselect(pev?: PointerDragEvent) {
        this.calendarComponent.getApi().unselect(pev);
    }

    getCalendarEvents() {
        const stringifyedEvents = [];
        this.calendarComponent.getApi().getEvents().forEach((e) => {
            stringifyedEvents.push(this.stringifyEvent(e));
        });
        return stringifyedEvents;
    }

    getEventById(id: string) {
        return this.stringifyEvent(this.calendarComponent.getApi().getEventById(id));
    }

    addEvent(event: EventInput, source?: any) {

        return this.stringifyEvent(this.calendarComponent.getApi().addEvent(event, source));
    }

    setPropEvent(eventID: string, name: string, value: any) {
        this.calendarComponent.getApi().getEventById(eventID).setProp(name, value);
    }

    setExtendedPropEvent(eventID: string, name: string, value: any) {
        this.calendarComponent.getApi().getEventById(eventID).setExtendedProp(name, value);
    }

    setStart(eventID: string, date: DateInput, options?: any) {
        this.calendarComponent.getApi().getEventById(eventID).setStart(date, options);
    }

    setEnd(eventID: string, date: DateInput) {
        this.calendarComponent.getApi().getEventById(eventID).setEnd(date);
    }

    setDates(eventID: string, start: DateInput, end: DateInput, options?: any) {
        this.calendarComponent.getApi().getEventById(eventID).setDates(start, end, options);
    }

    setAllDay(eventID: string, allDay: boolean, options?: { maintainDuration?: boolean }) {
        this.calendarComponent.getApi().getEventById(eventID).setAllDay(allDay, options);
    }

    moveStart(eventID: string, delta: DurationInput) {
        this.calendarComponent.getApi().getEventById(eventID).moveStart(delta);
    }

    moveEnd(eventID: string, delta: DurationInput) {
        this.calendarComponent.getApi().getEventById(eventID).moveEnd(delta);
    }

    moveDates(eventID: string, delta: DurationInput) {
        this.calendarComponent.getApi().getEventById(eventID).moveDates(delta);
    }

    formatRangeEvent(eventID: string, formatter: FormatterInput) {
        this.calendarComponent.getApi().getEventById(eventID).formatRange(formatter);
    }

    removeEvent(eventID: string) {
        this.calendarComponent.getApi().getEventById(eventID).remove();
    }

    getEventResources(eventID: string) {
        const stringifyedResources = [];
        this.calendarComponent.getApi().getEventById(eventID).getResources().forEach((r) => {
            stringifyedResources.push(this.stringifyResource(r));
        });
        return stringifyedResources;
    }

    setEventResources(eventID: string, resources: string[] | ResourceApi[]) {
        this.calendarComponent.getApi().getEventById(eventID).setResources(resources);
    }

    toPlainObjectEvent(eventID: string, settings?: { collapseExtendedProps?: boolean; collapseColor?: boolean }) {
        return JSON.stringify(this.calendarComponent.getApi().getEventById(eventID).toPlainObject(settings));
    }

    getEventSources() {
        const stringifyedEventSources = [];
        this.calendarComponent.getApi().getEventSources().forEach((e) => {
            stringifyedEventSources.push(this.stringifyEventSource(e));
        });
        return stringifyedEventSources;
    }

    getEventSourceById(eventSourceID: string) {
        return this.stringifyEventSource(this.calendarComponent.getApi().getEventSourceById(eventSourceID));
    }

    addEventSourceToCalendar(eventSource: EventSource) {
        return this.stringifyEventSource(this.calendarComponent.getApi().addEventSource(eventSource));
    }

    addFunctionEventSourceToCalendar(eventSource: EventSource, callback: { formname: string; script: string }) {
        if (callback) eventSource = this.transformFunctionEventSource(eventSource, callback);
        return this.stringifyEventSource(this.calendarComponent.getApi().addEventSource(eventSource));
    }

    refetchEvents() {
        return this.calendarComponent.getApi().refetchEvents();
    }

    refetchEventSource(eventSourceID: string) {
        this.calendarComponent.getApi().getEventSourceById(eventSourceID).refetch();
    }

    async removeEventSource(eventSourceID: string) {
        const index = this.getEventSourcesIndexById(eventSourceID);
        if (this.eventSources[index]) {
            const retValue = await this.servoyApi.callServerSideApi('removeEventSource', [eventSourceID]);
            if (retValue === true) {
                this.calendarComponent.getApi().getEventSourceById(eventSourceID).remove();
            } else {
                this.log.warn('Could not remove event source ' + eventSourceID);
            }
        }
    }

    scrollToTime(durationInput: DurationInput) {
        this.calendarComponent.getApi().scrollToTime(durationInput);
    }

    getView() {
        return this.stringifyView(this.calendarComponent.getApi().view);
    }

    /**
     * API for changing the view
     *
     * @param viewName possible views: dayGridMonth, dayGridWeek, timeGridWeek, listWeek
     * premium: resourceTimeline, resourceTimelineWeek, resourceTimelineFourDays, resourceTimeGridDay
     * @param dateOrRange
     */
    changeView(viewName: string, dateOrRange: DateRangeInput | DateInput) {
        this.calendarComponent.getApi().changeView(viewName, dateOrRange);
    }

    setOption<OptionName extends keyof CalendarOptions>(option: OptionName, value: CalendarOptions[OptionName]) {
        this.calendarComponent.getApi().setOption(option, value);
    }

    getOption<OptionName extends keyof CalendarOptions>(name: OptionName) {
        const option = this.calendarComponent.getApi().getOption(name);
        return option;
    }

    next() {
        this.calendarComponent.getApi().next();
    }

    prev() {
        this.calendarComponent.getApi().prev();
    }

    prevYear() {
        this.calendarComponent.getApi().prevYear();
    }

    nextYear() {
        this.calendarComponent.getApi().nextYear();
    }

    today() {
        this.calendarComponent.getApi().today();
    }

    getDate() {
        return this.calendarComponent.getApi().getDate();
    }

    gotoDate(zonedDateInput: any) {
        this.calendarComponent.getApi().gotoDate(zonedDateInput);
    }

    incrementDate(deltaInput: any) {
        this.calendarComponent.getApi().incrementDate(deltaInput);
    }

    render() {
        this.calendarComponent.getApi().render();
    }

    destroy() {
        this.calendarComponent.getApi().destroy();
    }

    batchRendering(func: any) {
        this.calendarComponent.getApi().batchRendering(func);
    }

    formatIso(date: DateInput, omitTime?: boolean) {
        return this.calendarComponent.getApi().formatIso(date, omitTime);
    }

    formatRangeCalendar(start: DateInput, end: DateInput, settings: any) {
        return this.calendarComponent.getApi().formatRange(start, end, settings);
    }

    formatDate(date: DateInput, settings: any) {
        return this.calendarComponent.getApi().formatDate(date, settings);
    }

    // Resource Data APIs - premium

    refetchResources() {
        this.calendarComponent.getApi().refetchResources();
    }

    getTopLevelResources() {
        const stringifyedResources = [];
        this.calendarComponent.getApi().getTopLevelResources().forEach((res) => {
            stringifyedResources.push(this.stringifyResource(res));
        });
        return stringifyedResources;
    }

    getResources() {
        const stringifyedResources = [];
        this.calendarComponent.getApi().getResources().forEach((res) => {
            stringifyedResources.push(this.stringifyResource(res));
        });
        return stringifyedResources;
    }

    getResourceById(id: string) {
        return this.stringifyResource(this.calendarComponent.getApi().getResourceById(id));
    }

    /**
     * This api can't be placed server side because
     * the resources defined initially in the options
     * might come from a callback function.
     * So pushing a new object directly into the options would not be possible.
     *
     * @returns the newly added resource (its stringifyed api)
     */
    addResource(resource: ResourceObject, scrollTo?: boolean) {
        return this.stringifyResource(this.calendarComponent.getApi().addResource(resource, scrollTo));
    }

    getParent(id: string) {
        return this.stringifyResource(this.calendarComponent.getApi().getResourceById(id).getParent());
    }

    getChildren(id: string) {
        const stringifyedResources = [];
        this.calendarComponent.getApi().getResourceById(id).getChildren().forEach((res) => {
            stringifyedResources.push(this.stringifyResource(res));
        });
        return stringifyedResources;
    }

    getEvents(id: string) {
        const stringifyedEvents = [];
        this.calendarComponent.getApi().getResourceById(id).getEvents().forEach((e) => {
            stringifyedEvents.push(this.stringifyEvent(e));
        });
        return stringifyedEvents;
    }

    setPropResource(id: string, name: string, value: any) {
        this.calendarComponent.getApi().getResourceById(id).setProp(name, value);
    }

    setExtendedPropResource(id: string, name: string, value: any) {
        this.calendarComponent.getApi().getResourceById(id).setExtendedProp(name, value);
    }

    removeResource(id: string) {
        this.calendarComponent.getApi().getResourceById(id).remove();
    }

    toPlainObjectResource(id: string, settings?: { collapseExtendedProps?: boolean; collapseColor?: boolean }) {
        return JSON.stringify(this.calendarComponent.getApi().getResourceById(id).toPlainObject(settings));
    }


    /**
     *  PRIVATE UTILITY METHODS
     */


    /**
     * Getter for event sources.
     *
     * @returns an array of event sources
     */
    getES() {
        let eventSources = [] as EventSource[];

        // arrayEventSources
        if (this.arrayEventSources && this.arrayEventSources.length) {
            eventSources = eventSources.concat(this.arrayEventSources);
            eventSources = this.arrayEventSources;
        }
        // functionEventSources
        for (let i = 0; this.functionEventSources && i < this.functionEventSources.length; i++) {
            eventSources.push(this.transformFunctionEventSource(this.functionEventSources[i], this.functionEventSources[i]['events']));
        }
        // GoogleFeedEventSources
        if (this.gcalEventSources && this.gcalEventSources.length) {
            eventSources = eventSources.concat(this.gcalEventSources);
        }
        // JSONEventSources
        if (this.jsonEventSources && this.jsonEventSources.length) {
            eventSources = eventSources.concat(this.jsonEventSources);
        }
        // ICalendarEventSources
        if (this.iCalendarEventSources && this.iCalendarEventSources.length) {
            eventSources = eventSources.concat(this.iCalendarEventSources);
        }

        return eventSources;
    }

    getEventSourcesIndexById(id: string) {
        for (let i = 0; this.eventSources && i < this.eventSources.length; i++) {
            if (this.eventSources[i].id === id) {
                return i;
            }
        }
        return null;
    }

    transformFunctionResource(resource) {
        // register server side callback
        return (info: FunctionInfo, successCallback: Function, failureCallback: Function) => {
            const retValue = this.servoyService.executeInlineScript(resource.formname, resource.script, [info]);
            retValue.then((success) => {
                successCallback(success);
            }, (error) => {
                failureCallback(error);
            });
        };
    }

    transformFunctionEventSource(eventSource: EventSource, callback: { formname: string; script: string }) {
        const source = {} as EventSource;

        // copy properties of eventSource
        for (const property in eventSource) {
            source[property] = eventSource[property];
        }

        // register server side callback
        source['events'] = (info: FunctionInfo, successCallback: (arg) => void, failureCallback: (arg) => void) => {
            const retValue = this.servoyService.executeInlineScript(callback.formname, callback.script, [info.start, info.end, eventSource.data]);
            retValue.then((success) => {
                successCallback(success);
            }, (error) => {
                failureCallback(error);
            });
        };
        return source;
    }

    stringifyFunctionESInfo(info: FunctionInfo) {
        return {
            start: info.start,
            end: info.end,
            startStr: info.startStr,
            endStr: info.endStr,
            timezone: info.timezone
        };
    }

    stringifyEvent(event: EventApi): Event {
        return {
            sourceId: (event?.source) ? event.source.id : null,
            start: event?.start,
            end: event?.end,
            startStr: event?.startStr,
            endStr: event?.endStr,
            id: event?.id,
            groupId: event?.groupId,
            allDay: event?.allDay,
            title: event?.title,
            url: event?.url,
            display: event?.display,
            startEditable: event?.startEditable,
            durationEditable: event?.durationEditable,
            constraint: (typeof (event?.constraint) === 'string') ? event.constraint : null,
            overlap: event?.overlap,
            backgroundColor: event?.backgroundColor,
            borderColor: event?.borderColor,
            textColor: event?.textColor,
            classNames: event?.classNames
        };
    }

    stringifyEventSource(eventSource: EventSourceApi) {
        return {
            id: eventSource?.id,
            format: eventSource?.format,
            url: eventSource?.url
        };
    }

    stringifyView(view: ViewApi): View {
        return {
            type: view?.type,
            title: view?.title,
            activeStart: view?.activeStart,
            activeEnd: view?.activeEnd,
            currentStart: view?.currentStart,
            currentEnd: view?.currentEnd
        };
    }

    stringifyResource(resource: any): Resource {
        return {
            id: resource?.id,
            title: resource?.title,
            eventConstraint: typeof (resource?.eventConstraint) === 'string' ? resource.eventConstraint : null,
            eventOverlap: resource?.eventOverlap,
            eventBackgroundColor: resource?.eventBackgroundColor,
            eventBorderColor: resource?.eventBorderColor,
            eventTextColor: resource?.eventTextColor,
            eventClassNames: resource?.eventClassNames
        };
    }

    private initializeCallbacks() {
        this.fullCalendarOptions.select = this.selectCallback;
        this.fullCalendarOptions.unselect = this.unselectCallback;
        this.fullCalendarOptions.eventClick = this.eventClick;
        this.fullCalendarOptions.eventResize = this.eventResize;
        this.fullCalendarOptions.eventResizeStart = this.eventDragStart;
        this.fullCalendarOptions.eventResizeStop = this.eventResizeStop;
        this.fullCalendarOptions.eventDrop = this.eventDrop;
        this.fullCalendarOptions.eventDragStart = this.eventDragStart;
        this.fullCalendarOptions.eventDragStop = this.eventDragStop;
        this.fullCalendarOptions.eventReceive = this.eventReceive;
        this.fullCalendarOptions.eventLeave = this.eventLeave;
        this.fullCalendarOptions.drop = this.drop;
        this.fullCalendarOptions.eventMouseEnter = this.eventMouseEnter;
        this.fullCalendarOptions.eventMouseLeave = this.eventMouseLeave;
        this.fullCalendarOptions.eventAdd = this.eventAdd;
        this.fullCalendarOptions.eventChange = this.eventChange;
        this.fullCalendarOptions.eventRemove = this.eventRemove;
        this.fullCalendarOptions.eventsSet = this.eventsSet;
        this.fullCalendarOptions.windowResize = this.windowResize;
        this.fullCalendarOptions.datesSet = this.datesSet;
        this.fullCalendarOptions.loading = this.loading;
        this.fullCalendarOptions.dateClick = this.dateClick;
        this.fullCalendarOptions.resourceAdd = this.resourceAdd;
        this.fullCalendarOptions.resourceChange = this.resourceChange;
        this.fullCalendarOptions.resourceRemove = this.resourceRemove;
        this.fullCalendarOptions.resourcesSet = this.resourcesSet;
        this.fullCalendarOptions.viewDidMount = this.viewDidMount;
        this.fullCalendarOptions.viewWillUnmount = this.viewWillUnmount;
        if (!this.fullCalendarOptions.navLinkDayClick){
            this.fullCalendarOptions.navLinkDayClick = this.navLinkDayClick;
        }
        if (!this.fullCalendarOptions.navLinkWeekClick){
            this.fullCalendarOptions.navLinkWeekClick = this.navLinkWeekClick;
        }
    }
}

interface Resource {
    id: string;
    title: string;
    eventConstraint: string;
    eventOverlap: boolean;
    eventBackgroundColor: string;
    eventBorderColor: string;
    eventTextColor: string;
    eventClassNames: string[];
}

interface Event {
    sourceId: string;
    start: Date;
    end: Date;
    startStr: string;
    endStr: string;
    id: string;
    groupId: string;
    allDay: boolean;
    title: string;
    url: string;
    display: string;
    startEditable: boolean;
    durationEditable: boolean;
    constraint: string;
    overlap: boolean;
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    classNames: string[];
}

interface View {
    type: string;
    title: string;
    activeStart: Date;
    activeEnd: Date;
    currentStart: Date;
    currentEnd: Date;
}

interface FunctionInfo {
    start: Date;
    end: Date;
    startStr: string;
    endStr: string;
    timezone: string;
}

interface DropInfo {
    allDay?: boolean;
    end?: Date;
    endStr?: string;
    resource?: Resource;
    start?: Date;
    startStr: string;
}

interface FetchInfo {
    start?: Date;
    end?: Date;
    startStr?: string;
    endStr?: string;
    timezone?: string;
}

export class EventSource extends BaseCustomObject {
    public id?: string;
    public events?: any;
    public className?: string[];
    public editable?: boolean;
    public startEditable?: boolean;
    public durationEditable?: boolean;
    public overlap?: boolean;
    public constraint?: ConstraintInput;
    public color?: string;
    public backgroundcColor?: string;
    public borderColor?: string;
    public textColor?: string;
    public data?: any;
    public defaultAllDay?: boolean;
    public url?: string;
    public format?: string;
    public eventDataTransform: (eventData: EventInput) => EventInput;
    public success: (rawEvents: EventInput[], xhr?: XMLHttpRequest) => void | EventInput[];
    public failure: (errorObj: { message: string }) => void;
    public display: string;
    public eventAllow: (dropInfo: DropInfo, draggedEvent: Event) => boolean;
}

export class JSONEventSource extends EventSource { }

export class iCalendarEventSource extends EventSource { }

export class GoogleCalendarEventSource extends EventSource {
    public googleCalendarId: string;
}

export class FunctionEventSource extends EventSource {
    public events: { formname: string; script: string };
}

export class ArrayEventSource extends EventSource {
    public events?: EventObject[];
}

export class EventObject extends BaseCustomObject {
    public id?: string;
    public groupId?: string;
    public start?: string | Date;
    public end?: string | Date;
    public startStr?: string;
    public endStr?: string;
    public className?: string[];
    public editable?: boolean;
    public startEditable?: boolean;
    public durationEditable?: boolean;
    public resourceEditable?: boolean;
    public overlap?: boolean;
    public constraint?: ConstraintInput;
    public backgroundcColor?: string;
    public borderColor?: string;
    public textColor?: string;
    public extendedProps: any;
    public display?: string;
    public url?: string;
    public source?: EventSource;
}

export class ResourceObject extends BaseCustomObject {
    public id?: string;
    public title?: string;
    public extendedProps: any;
    public eventConstraint?: any;
    public eventOverlap?: any;
    public eventAllow?: any;
    public eventBackgroundColor?: any;
    public eventBorderColor?: any;
    public eventTextColor?: any;
    public eventClassNames?: any;
}

class ServerFunction {
    public formname?: string;
    public script?: string;
}

@NgModule({
    declarations: [
        FullCalendar
    ],
    imports: [
        ServoyPublicModule,
        CommonModule,
        FullCalendarModule
    ],
    exports: [
        FullCalendar
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class FullCalendarComponentModule {
    constructor(specTypesService: SpecTypesService) {
        specTypesService.registerType('svy-fullcalendar.EventSource', EventSource);
        specTypesService.registerType('svy-fullcalendar.EventObject', EventObject);
        specTypesService.registerType('svy-fullcalendar.ResourceObject', ResourceObject);
        specTypesService.registerType('svy-fullcalendar.ArrayEventSource', ArrayEventSource);
        specTypesService.registerType('svy-fullcalendar.JSONEventSource', JSONEventSource);
        specTypesService.registerType('svy-fullcalendar.GoogleCalendarEventSource', GoogleCalendarEventSource);
        specTypesService.registerType('svy-fullcalendar.iCalendarEventSource', iCalendarEventSource);
        specTypesService.registerType('svy-fullcalendar.FunctionEventSource', FunctionEventSource);
    }
}

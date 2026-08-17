import { ChangeDetectionStrategy, Component, inject, viewChild, NgModule, CUSTOM_ELEMENTS_SCHEMA, linkedSignal } from '@angular/core';
import { LoggerFactory, LoggerService, ServoyBaseComponent, ServoyPublicService, ICustomObjectValue, TooltipService, ServoyPublicModule } from '@servoy/public';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { input, output } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DateClickInfo, DropInfo, EventDragStartInfo, EventDragStopInfo, EventLeaveInfo, EventReceiveInfo, EventResizeDoneInfo, EventResizeStartInfo, EventResizeStopInfo, MountInfo, ViewDisplayInfo } from '@fullcalendar/angular';
import { DatesSetInfo } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/angular/interaction';
import dayGridPlugin from '@fullcalendar/angular/daygrid';
import timeGridPlugin from '@fullcalendar/angular/timegrid';
import listPlugin from '@fullcalendar/angular/list';
import resourceTimeGridPlugin from '@fullcalendar/angular-scheduler/resource-timegrid';
import resourceDayGridPlugin from '@fullcalendar/angular-scheduler/resource-daygrid';
import resourceTimelinePlugin from '@fullcalendar/angular-scheduler/resource-timeline';
import scrollGridPlugin from '@fullcalendar/angular-scheduler/scrollgrid';
import rrulePlugin from '@fullcalendar/rrule';
import timeline from '@fullcalendar/angular-scheduler/timeline';
import luxonPlugin from '@fullcalendar/format-luxon3';
import iCalendarPlugin from '@fullcalendar/icalendar';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { CommonModule } from '@angular/common';
import { ResourceAddInfo, ResourceApi, ResourceChangeInfo, ResourceRemoveInfo } from '@fullcalendar/angular-scheduler';
import { CalendarOptions, ConstraintInput, DateInput, DateRangeInput, DateSelectInfo,
    DateUnselectInfo, Duration, DurationInput, EventAddInfo, EventApi, EventChangeInfo, EventClickInfo,
    EventDropInfo, EventHoveringInfo, EventInput, EventRemoveInfo, EventSourceApi, FormatterInput, ViewApi } from 'fullcalendar';
import { PointerDragEvent } from 'fullcalendar/protected-api';

@Component({
    selector: 'svy-fullcalendar2',
    templateUrl: './fullcalendar.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, FullCalendarModule, ServoyPublicModule]
})
export class FullCalendar extends ServoyBaseComponent<HTMLDivElement> {

    readonly onSelectMethodID = input<((start: Date, end: Date, startStr: string, endStr: string, allDay: boolean, event: MouseEvent, view: ViewType, resource?: any) => void) | undefined>(undefined);
    readonly onUnselectMethodID = input<((jsEvent: MouseEvent, view: ViewType) => void) | undefined>(undefined);
    readonly onDateClickMethodID = input<((date: Date, dateStr: string, dayEl: HTMLElement, event: MouseEvent, view: ViewType, resource?: ResourceObject) => void) | undefined>(undefined);
    readonly onDateDblClickMethodID = input<((date: Date, dateStr: string, dayEl: HTMLElement, event: MouseEvent, view: ViewType, resource?: ResourceObject) => void) | undefined>(undefined);
    readonly onNavLinkDayClickMethodID = input<((date: Date, event: MouseEvent) => void) | undefined>(undefined);
    readonly onNavLinkWeekClickMethodID = input<((date: Date, event: MouseEvent) => void) | undefined>(undefined);
    readonly onEventClickMethodID = input<((event: EventObject, jsEvent: MouseEvent, view: ViewType) => void) | undefined>(undefined);
    readonly onEventDblClickMethodID = input<((event: EventObject, jsEvent: MouseEvent, view: ViewType) => void) | undefined>(undefined);
    readonly onEventMouseEnterMethodID = input<((el: HTMLElement, event: EventObject, jsEvent: MouseEvent, view: ViewType) => void) | undefined>(undefined);
    readonly onEventMouseLeaveMethodID = input<((el: HTMLElement, event: EventObject, jsEvent: MouseEvent, view: ViewType) => void) | undefined>(undefined);
    readonly onMouseEnter = input<((event: EventObject, jsEvent: MouseEvent, view: ViewType) => void) | undefined>(undefined);
    readonly onMouseLeave = input<((event: EventObject, jsEvent: MouseEvent, view: ViewType) => void) | undefined>(undefined);
    readonly onEventAddMethodID = input<((event: EventObject, relatedEvents: EventObject[]) => Promise<boolean>) | undefined>(undefined);
    readonly onEventRemoveMethodID = input<((event: EventObject, relatedEvents: EventObject[]) => Promise<boolean>) | undefined>(undefined);
    readonly onEventChangeMethodID = input<((event: EventObject, oldEvent: EventObject, relatedEvents: EventObject[]) => Promise<boolean>) | undefined>(undefined);
    readonly onLoadingMethodID = input<((isLoading: boolean) => void) | undefined>(undefined);
    readonly onDatesSetMethodID = input<((start: Date, end: Date, startStr: string, endStr: string, timeZone: string, view: ViewType) => void) | undefined>(undefined);
    readonly onEventsSetMethodID = input<((events: EventObject[]) => void) | undefined>(undefined);
    readonly onWindowResizeMethodID = input<((view: ViewType) => void) | undefined>(undefined);
    readonly onEventResizeMethodID = input<((event: EventObject, relatedEvents: EventObject[], oldEvent: EventObject, endDelta: number, startDelta: number, jsEvent: MouseEvent, view: ViewType) => Promise<boolean>) | undefined>(undefined);
    readonly onEventDropMethodID = input<((event: EventObject, relatedEvents: EventObject[], oldEvent: EventObject, oldResource: ResourceObject, newResource: ResourceObject, delta: number, jsEvent: MouseEvent, view: ViewType) => Promise<boolean>) | undefined>(undefined);
    readonly onDropMethodID = input<((allDay: boolean, date: Date, dateStr: string, draggedEl: HTMLElement, jsEvent: MouseEvent, resource: ResourceObject, view: ViewType) => void) | undefined>(undefined);
    readonly onEventDragStartMethodID = input<((event: EventObject, jsEvent: MouseEvent, view: ViewType) => void) | undefined>(undefined);
    readonly onEventResizeStartMethodID = input<((event: EventObject, jsEvent: MouseEvent, view: ViewType) => void) | undefined>(undefined);
    readonly onEventRightClickMethodID = input<((event: EventObject, jsEvent: MouseEvent, view: ViewType) => void) | undefined>(undefined);
    readonly onEventDragStopMethodID = input<((event: EventObject, jsEvent: MouseEvent, view: ViewType) => void) | undefined>(undefined);
    readonly onEventResizeStopMethodID = input<((event: EventObject, jsEvent: MouseEvent, view: ViewType) => void) | undefined>(undefined);
    readonly onEventReceiveMethodID = input<((event: EventObject, relatedEvents: Event[], draggedEl: HTMLElement, view: ViewType) => Promise<boolean>) | undefined>(undefined);
    readonly onEventLeaveMethodID = input<((event: EventObject, relatedEvents: Event[], draggedEl: HTMLElement, view: ViewType) => Promise<boolean>) | undefined>(undefined);
    readonly onResourceAddMethodID = input<((resource: ResourceApi) => Promise<boolean>) | undefined>(undefined);
    readonly onResourceChangeMethodID = input<((oldResource: ResourceApi, newResource: ResourceApi) => Promise<boolean>) | undefined>(undefined);
    readonly onResourceRemoveMethodID = input<((resource: ResourceApi) => Promise<boolean>) | undefined>(undefined);
    readonly onResourcesSetMethodID = input<((resources: ResourceApi[]) => void) | undefined>(undefined);
    readonly onViewDidMountMethodID = input<((view: ViewType) => void) | undefined>(undefined);
    readonly onViewWillUnmountMethodID = input<((view: ViewType) => void) | undefined>(undefined);

    readonly hasToDraw = input<boolean>(false);
    readonly renderOnCurrentView = input<boolean>(false);
    readonly styleClass = input<string>('');
    readonly calendarOptions = input<CalendarOptions>({} as CalendarOptions);
    readonly view = input<ViewApi | undefined>(undefined);
    readonly viewChange = output<ViewApi>();
    _view = linkedSignal(() => this.view());
    readonly events = input<EventInput[]>([]);
    readonly eventSources = input<EventSource[]>([]);
    readonly arrayEventSources = input<ArrayEventSource[]>([]);
    readonly functionEventSources = input<FunctionEventSource[]>([]);
    readonly gcalEventSources = input<GoogleCalendarEventSource[]>([]);
    readonly jsonEventSources = input<JSONEventSource[]>([]);
    readonly functionResources = input<ServerFunction | undefined>(undefined);
    readonly iCalendarEventSources = input<iCalendarEventSource[]>([]);
    readonly tooltipExpression = input<string>('');
    readonly themeSystem = input<string>('');

    readonly calendarComponent = viewChild<FullCalendarComponent>('calendar');

    fullCalendarOptions: CalendarOptions = {};
    TIMEZONE_DEFAULT = 'local';
    log: LoggerService;
    isReadyForRendering = false;
    tooltipService: TooltipService;

    clickTimeout: any = null;
    clickDelay = 300;

    private initialDelay = 750;
    private dismissDelay = 5000;
    private servoyService = inject(ServoyPublicService);

    constructor() {
        super();
        const logFactory = inject(LoggerFactory);
        const tooltipSrv = inject(TooltipService);
        this.log = logFactory.getLogger('FullCalendar');
        this.tooltipService = tooltipSrv;
        this.initialDelay = this.servoyService.getUIProperty('tooltipInitialDelay');
        if (this.initialDelay === null || isNaN(this.initialDelay)) this.initialDelay = 750;
        this.dismissDelay = this.servoyService.getUIProperty('tooltipDismissDelay');
        if (this.dismissDelay === null || isNaN(this.dismissDelay)) this.dismissDelay = 5000;
    }

    svyOnChanges(changes: any) {
        if (changes) {
            for (const property of Object.keys(changes)) {
                const change = changes[property];
                switch (property) {
                    case 'hasToDraw': {
                        if (change.currentValue === true && change.previousValue === false) {
                            this.initFullCalendar();
                        }
                        break;
                    }
                }
            }
        }
    }

    svyOnInit() {
        super.svyOnInit();
        this.initFullCalendar(true);
    }

    initFullCalendar(restoreView?: boolean) {
        const calOpts = this.calendarOptions();
        this.fullCalendarOptions = calOpts ? { ...calOpts } : {} as CalendarOptions;

        this.fullCalendarOptions.eventDidMount = this.eventDidMount;

        this.initializeCallbacks();

        const currentView = this._view();
        if ((!this.hasToDraw() || this.renderOnCurrentView() || restoreView) && currentView) {
            this.fullCalendarOptions.initialView = currentView.type;
            const initialDate = currentView.currentStart ? new Date(currentView.currentStart) : calOpts?.initialDate || new Date();
            this.fullCalendarOptions.initialDate = initialDate;
        }
        const evts = this.events();
        if (evts && evts.length) {
            this.fullCalendarOptions.events = evts;
        }
        if (!this.fullCalendarOptions.timeZone) {
            this.fullCalendarOptions.timeZone = this.TIMEZONE_DEFAULT;
        }

        const eventSources = this.getES();
        if (eventSources) {
            this.fullCalendarOptions.eventSources = eventSources.map(({ className, ...rest }) =>
                className ? { ...rest, classNames: className } : rest
            ) as any;
        }

        const funcRes = this.functionResources();
        if (funcRes) {
            this.fullCalendarOptions.resources = this.transformFunctionResource(funcRes) as any;
        }

        this.fullCalendarOptions.plugins = [
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            listPlugin,
            luxonPlugin,
            googleCalendarPlugin,
            iCalendarPlugin as any,
            rrulePlugin
        ];
        if (this.fullCalendarOptions.schedulerLicenseKey) {
            this.fullCalendarOptions.plugins!.push(timeline, resourceTimelinePlugin, resourceTimeGridPlugin, resourceDayGridPlugin, scrollGridPlugin);
        }

        const themeMap = {
            classic: () => import('@fullcalendar/angular/themes/classic'),
            breezy: () => import('@fullcalendar/angular/themes/breezy'),
            forma: () => import('@fullcalendar/angular/themes/forma'),
            monarch: () => import('@fullcalendar/angular/themes/monarch'),
            pulse: () => import('@fullcalendar/angular/themes/pulse'),
        };
        const themeLoader = (themeMap as any)[this.themeSystem()] || themeMap['classic'];
        themeLoader().then((theme: any) => {
            this.fullCalendarOptions.plugins!.push(theme.default);
            this.isReadyForRendering = true;
            this.detectChanges();
        });
    }

    viewDidMount = (viewDidMount: MountInfo<ViewDisplayInfo>) => {
        this._view.set(viewDidMount.view);
        setTimeout(() => this.viewChange.emit(viewDidMount.view));
        if (this.onViewDidMountMethodID()) {
            this.onViewDidMountMethodID()!(this.stringifyView(viewDidMount.view));
        }
    }

    viewWillUnmount = (viewWillUnmount: MountInfo<ViewDisplayInfo>) => {
        if (this.onViewWillUnmountMethodID()) {
            this.onViewWillUnmountMethodID()!(this.stringifyView(viewWillUnmount.view));
        }
    }

    resourceAdd = (resAdd: ResourceAddInfo) => {
        if (this.onResourceAddMethodID()) {
            this.onResourceAddMethodID()!(resAdd.resource).then(success => {
                if (!success) {
                    resAdd.revert();
                }
            }, error => {
                this.log.error('resourceAdd handler error');
                this.log.error(error);
            });
        }
    }

    resourceChange = (resChange: ResourceChangeInfo) => {
        if (this.onResourceChangeMethodID()) {
            this.onResourceChangeMethodID()!(resChange.oldResource, resChange.resource).then(success => {
                if (!success) {
                    resChange.revert();
                }
            }, error => {
                this.log.error('resourceChange handler error');
                this.log.error(error);
            });
        }
    }

    resourceRemove = (resRemove: ResourceRemoveInfo) => {
        if (this.onResourceRemoveMethodID()) {
            this.onResourceRemoveMethodID()!(resRemove.resource).then(success => {
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
        if (this.onResourcesSetMethodID()) {
            this.onResourcesSetMethodID()!(resources);
        }
    }

    loading = (isLoading: boolean) => {
        if (this.onLoadingMethodID()) {
            this.onLoadingMethodID()!(isLoading);
        }
    }

    datesSet = (arg: DatesSetInfo) => {
        if (this.onDatesSetMethodID()) {
            this.onDatesSetMethodID()!(arg.start, arg.end, arg.startStr, arg.endStr, arg.timeZone, this.stringifyView(arg.view));
        }
    }

    selectCallback = (selectionInfo: DateSelectInfo) => {
        if (this.onSelectMethodID()) {
            const _resources = selectionInfo.resource?._resource;
            this.onSelectMethodID()!(selectionInfo.start, selectionInfo.end, selectionInfo.startStr, selectionInfo.endStr,
                selectionInfo.allDay, selectionInfo.jsEvent as MouseEvent, this.stringifyView(selectionInfo.view), _resources);
        }
    }

    unselectCallback = (selectionInfo: DateUnselectInfo) => {
        if (this.onUnselectMethodID()) {
            this.onUnselectMethodID()!(selectionInfo.jsEvent!, this.stringifyView(selectionInfo.view));
        }
    }

    dateClick = (arg: DateClickInfo) => {
        if (this.clickTimeout) {
            clearTimeout(this.clickTimeout);
            this.clickTimeout = null;

            if (this.onDateDblClickMethodID()) {
                this.onDateDblClickMethodID()!(arg.date, arg.dateStr, arg.dayEl, arg.jsEvent, this.stringifyView(arg.view), this.stringifyResource(arg.resource));
            }
        } else {
            if (this.onDateDblClickMethodID()) {
                this.clickTimeout = setTimeout(() => {
                    this.clickTimeout = null;
                    if (this.onDateClickMethodID()) {
                        this.onDateClickMethodID()!(arg.date, arg.dateStr, arg.dayEl, arg.jsEvent, this.stringifyView(arg.view), this.stringifyResource(arg.resource));
                    }
                }, this.clickDelay);
            } else {
                if (this.onDateClickMethodID()) {
                    this.onDateClickMethodID()!(arg.date, arg.dateStr, arg.dayEl, arg.jsEvent, this.stringifyView(arg.view), this.stringifyResource(arg.resource));
                }
            }
        }
    }

    navLinkDayClick = (date: Date, event: MouseEvent) => {
        if (this.onNavLinkDayClickMethodID()) {
            this.onNavLinkDayClickMethodID()!(date, event);
        }
    }

    navLinkWeekClick = (date: Date, event: MouseEvent) => {
        if (this.onNavLinkWeekClickMethodID()) {
            this.onNavLinkWeekClickMethodID()!(date, event);
        }
    }

    eventClick = (eventClickArg: EventClickInfo) => {
        if (this.clickTimeout) {
            clearTimeout(this.clickTimeout);
            this.clickTimeout = null;

            if (this.onEventDblClickMethodID()) {
                this.onEventDblClickMethodID()!(this.stringifyEvent(eventClickArg.event), eventClickArg.jsEvent, this.stringifyView(eventClickArg.view));
            }
        } else {
            if (this.onEventDblClickMethodID()) {
                this.clickTimeout = setTimeout(() => {
                    this.clickTimeout = null;
                    if (this.onEventClickMethodID()) {
                        this.onEventClickMethodID()!(this.stringifyEvent(eventClickArg.event), eventClickArg.jsEvent, this.stringifyView(eventClickArg.view));
                    }
                }, this.clickDelay);
            } else {
                if (this.onEventClickMethodID()) {
                    this.onEventClickMethodID()!(this.stringifyEvent(eventClickArg.event), eventClickArg.jsEvent, this.stringifyView(eventClickArg.view));
                }
            }
        }
    }

    eventMouseEnter = (eventHovering: EventHoveringInfo) => {
        if (this.onEventMouseEnterMethodID()) {
            this.onEventMouseEnterMethodID()!(null as any, this.stringifyEvent(eventHovering.event), eventHovering.jsEvent, eventHovering.view);
        }
        if (this.onMouseEnter()) {
            this.onMouseEnter()!(this.stringifyEvent(eventHovering.event), eventHovering.jsEvent, eventHovering.view);
        }
    }

    eventMouseLeave = (eventHovering: EventHoveringInfo) => {
        if (this.onEventMouseLeaveMethodID()) {
            this.onEventMouseLeaveMethodID()!(null as any, this.stringifyEvent(eventHovering.event), eventHovering.jsEvent, eventHovering.view);
        }
        if (this.onMouseLeave()) {
            this.onMouseLeave()!(this.stringifyEvent(eventHovering.event), eventHovering.jsEvent, eventHovering.view);
        }
    }

    eventAdd = (eventAdd: EventAddInfo) => {
        if (this.onEventAddMethodID()) {
            const stringifyedRelatedEvents: any[] = [];
            eventAdd.relatedEvents.forEach((e) => {
                stringifyedRelatedEvents.push(this.stringifyEvent(e));
            });
            this.onEventAddMethodID()!(this.stringifyEvent(eventAdd.event), stringifyedRelatedEvents).then((success) => {
                if (!success) {
                    eventAdd.revert();
                }
            }, (error) => {
                this.log.error('eventAdd handler error');
                this.log.error(error);
            });
        }
    }

    eventRemove = (eventRemove: EventRemoveInfo) => {
        if (this.onEventRemoveMethodID()) {
            const stringifyedRelatedEvents: any[] = [];
            eventRemove.relatedEvents.forEach((e) => {
                stringifyedRelatedEvents.push(this.stringifyEvent(e));
            });
            this.onEventRemoveMethodID()!(this.stringifyEvent(eventRemove.event), stringifyedRelatedEvents).then((success) => {
                if (!success) {
                    eventRemove.revert();
                }
            }, (error) => {
                this.log.error('eventRemove handler error');
                this.log.error(error);
            });
        }
    }

    eventChange = (eventChange: EventChangeInfo) => {
        if (this.onEventChangeMethodID()) {
            const stringifyedRelatedEvents: any[] = [];
            eventChange.relatedEvents.forEach((e) => {
                stringifyedRelatedEvents.push(this.stringifyEvent(e));
            });
            this.onEventChangeMethodID()!(this.stringifyEvent(eventChange.event),
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

    eventResize = (resizeArg: EventResizeDoneInfo) => {
        if (this.onEventResizeMethodID()) {
            const stringifyedRelatedEvents: any[] = [];
            resizeArg.relatedEvents.forEach((e) => {
                stringifyedRelatedEvents.push(this.stringifyEvent(e));
            });
            const retValue = this.onEventResizeMethodID()!(this.stringifyEvent(resizeArg.event), stringifyedRelatedEvents, this.stringifyEvent(resizeArg.oldEvent),
                this.durationToMilliseconds(resizeArg.endDelta), this.durationToMilliseconds(resizeArg.startDelta), resizeArg.jsEvent, resizeArg.view);
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

    eventDrop = (dropArg: EventDropInfo) => {
        if (this.onEventDropMethodID()) {
            const stringifyedRelatedEvents: any[] = [];
            dropArg.relatedEvents.forEach((e) => {
                stringifyedRelatedEvents.push(this.stringifyEvent(e));
            });
            const retValue = this.onEventDropMethodID()!(this.stringifyEvent(dropArg.event), stringifyedRelatedEvents, this.stringifyEvent(dropArg.oldEvent),
                this.stringifyResource(dropArg.oldResource), this.stringifyResource(dropArg.newResource), this.durationToMilliseconds(dropArg.delta), dropArg.jsEvent, dropArg.view);
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

    drop = (dropArg: DropInfo) => {
        if (this.onDropMethodID()) {
            this.onDropMethodID()!(dropArg.allDay, dropArg.date, dropArg.dateStr, dropArg.draggedEl,
                dropArg.jsEvent, this.stringifyResource(dropArg.resource), this.stringifyView(dropArg.view));
        }
    }

    eventResizeStart = (resizeStart: EventResizeStartInfo) => {
        if (this.onEventResizeStartMethodID()) {
            this.onEventResizeStartMethodID()!(this.stringifyEvent(resizeStart.event), resizeStart.jsEvent, this.stringifyView(resizeStart.view));
        }
    }

    eventResizeStop = (resizeStop: EventResizeStopInfo) => {
        if (this.onEventResizeStopMethodID()) {
            this.onEventResizeStopMethodID()!(this.stringifyEvent(resizeStop.event), resizeStop.jsEvent, this.stringifyView(resizeStop.view));
        }
    }

    eventDragStart = (dragStart: EventDragStartInfo) => {
        if (this.onEventDragStartMethodID()) {
            this.onEventDragStartMethodID()!(this.stringifyEvent(dragStart.event), dragStart.jsEvent, this.stringifyView(dragStart.view));
        }
    }

    eventDragStop = (dragStop: EventDragStopInfo) => {
        if (this.onEventDragStopMethodID()) {
            this.onEventDragStopMethodID()!(this.stringifyEvent(dragStop.event), dragStop.jsEvent, this.stringifyView(dragStop.view));
        }
    }

    eventReceive = (receiveArg: EventReceiveInfo) => {
        if (this.onEventReceiveMethodID()) {
            const stringifyedRelatedEvents: any[] = [];
            receiveArg.relatedEvents.forEach((e) => {
                stringifyedRelatedEvents.push(this.stringifyEvent(e));
            });
            this.onEventReceiveMethodID()!(this.stringifyEvent(receiveArg.event), stringifyedRelatedEvents,
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

    eventLeave = (leaveArg: EventLeaveInfo) => {
        if (this.onEventLeaveMethodID()) {
            const stringifyedRelatedEvents: any[] = [];
            leaveArg.relatedEvents.forEach((e) => {
                stringifyedRelatedEvents.push(this.stringifyEvent(e));
            });
            this.onEventLeaveMethodID()!(this.stringifyEvent(leaveArg.event), stringifyedRelatedEvents,
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
        if (this.onEventsSetMethodID()) {
            const stringifyedRelatedEvents: any[] = [];
            events.forEach((e) => {
                stringifyedRelatedEvents.push(this.stringifyEvent(e));
            });
            this.onEventsSetMethodID()!(stringifyedRelatedEvents);
        }
    }

    windowResize = (arg: { view: ViewApi }) => {
        if (this.onWindowResizeMethodID()) {
            this.onWindowResizeMethodID()!(arg.view);
        }
    }

    eventDidMount = (info: any) => {
        if (this.tooltipExpression()) {
            const tooltip = this.evaluateTooltipExpression(this.tooltipExpression(), info.event);
            info.el.onmouseenter = (jsEvent: MouseEvent) => {
                this.tooltipService.showTooltip(jsEvent, tooltip, this.initialDelay, this.dismissDelay);
            };
            info.el.onmouseleave = (_jsEvent: MouseEvent) => {
                this.tooltipService.hideTooltip();
            };
        }
        if (this.onEventRightClickMethodID()) {
            info.el.addEventListener('contextmenu', (event: any) => {
                event.preventDefault();
                this.onEventRightClickMethodID()!(this.stringifyEvent(info.event), event, info.view);
            });
        }
    }

    evaluateTooltipExpression = (expression: string, event: EventObject) => {
        return expression.replace(/({{[a-zA-Z][a-zA-Z0-9&._]*}})/g, (j) => {
            let property = j.replace(/{{/, '').replace(/}}/, '');
            return this.evalDeepProperty(event, property) || '';
        });
    }

    evalDeepProperty = (obj: EventObject, property: string): any => {
        if (!property) {
            throw 'Illegal argument property undefined';
        }

        let parts = property.split('.');
        let deepObj = (obj as any)[parts[0]];

        if (parts.length === 1) {
            return deepObj;
        } else if (deepObj) {
            return this.evalDeepProperty(deepObj, parts.slice(1).join('.'));
        } else {
            return null;
        }
    }

    select(dateOrObj: any, end?: DateInput) {
        this.calendarComponent()!.getApi().select(dateOrObj, end);
    }

    unselect(pev?: PointerDragEvent) {
        this.calendarComponent()!.getApi().unselect(pev);
    }

    getCalendarEvents() {
        const stringifyedEvents: any[] = [];
        this.calendarComponent()!.getApi().getEvents().forEach((e) => {
            stringifyedEvents.push(this.stringifyEvent(e));
        });
        return stringifyedEvents;
    }

    getEventById(id: string) {
        return this.stringifyEvent(this.calendarComponent()!.getApi().getEventById(id)!);
    }

    addEvent(event: EventInput, source?: any) {
        return this.stringifyEvent(this.calendarComponent()!.getApi().addEvent(event, source)!);
    }

    setPropEvent(eventID: string, name: string, value: any) {
        this.calendarComponent()!.getApi().getEventById(eventID)!.setProp(name, value);
    }

    setExtendedPropEvent(eventID: string, name: string, value: any) {
        this.calendarComponent()!.getApi().getEventById(eventID)!.setExtendedProp(name, value);
    }

    setStart(eventID: string, date: DateInput, options?: any) {
        this.calendarComponent()!.getApi().getEventById(eventID)!.setStart(date, options);
    }

    setEnd(eventID: string, date: DateInput) {
        this.calendarComponent()!.getApi().getEventById(eventID)!.setEnd(date);
    }

    setDates(eventID: string, start: DateInput, end: DateInput, options?: any) {
        this.calendarComponent()!.getApi().getEventById(eventID)!.setDates(start, end, options);
    }

    setAllDay(eventID: string, allDay: boolean, options?: { maintainDuration?: boolean }) {
        this.calendarComponent()!.getApi().getEventById(eventID)!.setAllDay(allDay, options);
    }

    moveStart(eventID: string, delta: DurationInput) {
        this.calendarComponent()!.getApi().getEventById(eventID)!.moveStart(delta);
    }

    moveEnd(eventID: string, delta: DurationInput) {
        this.calendarComponent()!.getApi().getEventById(eventID)!.moveEnd(delta);
    }

    moveDates(eventID: string, delta: DurationInput) {
        this.calendarComponent()!.getApi().getEventById(eventID)!.moveDates(delta);
    }

    formatRangeEvent(eventID: string, formatter: FormatterInput) {
        this.calendarComponent()!.getApi().getEventById(eventID)!.formatRange(formatter);
    }

    removeEvent(eventID: string) {
        this.calendarComponent()!.getApi().getEventById(eventID)!.remove();
    }

    getEventResources(eventID: string) {
        const stringifyedResources: any[] = [];
        this.calendarComponent()!.getApi().getEventById(eventID)!.getResources().forEach((r) => {
            stringifyedResources.push(this.stringifyResource(r));
        });
        return stringifyedResources;
    }

    setEventResources(eventID: string, resources: string[] | ResourceApi[]) {
        this.calendarComponent()!.getApi().getEventById(eventID)!.setResources(resources);
    }

    toPlainObjectEvent(eventID: string, settings?: { collapseExtendedProps?: boolean; collapseColor?: boolean }) {
        return JSON.stringify(this.calendarComponent()!.getApi().getEventById(eventID)!.toPlainObject(settings));
    }

    getEventSources() {
        const stringifyedEventSources: any[] = [];
        this.calendarComponent()!.getApi().getEventSources().forEach((e) => {
            stringifyedEventSources.push(this.stringifyEventSource(e));
        });
        return stringifyedEventSources;
    }

    getEventSourceById(eventSourceID: string): EventSource {
        return this.stringifyEventSource(this.calendarComponent()!.getApi().getEventSourceById(eventSourceID)!);
    }

    addEventSourceToCalendar(eventSource: EventSource): EventSource {
        const { className, ...rest } = eventSource as any;
        const input = className ? { ...rest, classNames: className } : rest;
        return this.stringifyEventSource(this.calendarComponent()!.getApi().addEventSource(input));
    }

    addFunctionEventSourceToCalendar(eventSource: EventSource, callback: (...args: unknown[]) => any) {
        if (callback) eventSource = this.transformFunctionEventSource(eventSource, callback);
        const { className, ...rest } = eventSource as any;
        const inp = className ? { ...rest, classNames: className } : rest;
        return this.stringifyEventSource(this.calendarComponent()!.getApi().addEventSource(inp));
    }

    refetchEvents() {
        return this.calendarComponent()!.getApi().refetchEvents();
    }

    refetchEventSource(eventSourceID: string) {
        this.calendarComponent()!.getApi().getEventSourceById(eventSourceID)!.refetch();
    }

    async removeEventSource(eventSourceID: string) {
        const index = this.getEventSourcesIndexById(eventSourceID);
        const sources = this.eventSources();
        if (sources[index!]) {
            const retValue = await this.servoyApi().callServerSideApi('removeEventSource', [eventSourceID]);
            if ((retValue as any) === true) {
                this.calendarComponent()!.getApi().getEventSourceById(eventSourceID)!.remove();
            } else {
                this.log.warn('Could not remove event source ' + eventSourceID);
            }
        }
    }

    scrollToTime(durationInput: DurationInput) {
        this.calendarComponent()!.getApi().scrollToTime(durationInput);
    }

    getView() {
        return this.stringifyView(this.calendarComponent()!.getApi().view);
    }

    changeView(viewName: string, dateOrRange: DateRangeInput | DateInput) {
        this.calendarComponent()!.getApi().changeView(viewName, dateOrRange);
    }

    getOption<OptionName extends keyof CalendarOptions>(name: OptionName) {
        return this.calendarComponent()!.getApi().getOption(name);
    }

    setCalendarOption(name: string, value: any) {
        const cal = this.calendarComponent();
        if (cal) {
            cal.getApi().setOption(name as any, value);
        }
    }

    next() {
        this.calendarComponent()!.getApi().next();
    }

    prev() {
        this.calendarComponent()!.getApi().prev();
    }

    prevYear() {
        this.calendarComponent()!.getApi().prevYear();
    }

    nextYear() {
        this.calendarComponent()!.getApi().nextYear();
    }

    today() {
        this.calendarComponent()!.getApi().today();
    }

    getDate() {
        return this.calendarComponent()!.getApi().getDate();
    }

    gotoDate(zonedDateInput: any) {
        this.calendarComponent()!.getApi().gotoDate(zonedDateInput);
    }

    incrementDate(deltaInput: any) {
        this.calendarComponent()!.getApi().incrementDate(deltaInput);
    }

    render() {
        this.calendarComponent()!.getApi().render();
    }

    destroy() {
        this.calendarComponent()!.getApi().destroy();
    }

    batchRendering(func: any) {
        this.calendarComponent()!.getApi().batchRendering(func);
    }

    formatIso(date: DateInput, omitTime?: boolean) {
        return this.calendarComponent()!.getApi().formatIso(date, omitTime);
    }

    formatRangeCalendar(start: DateInput, end: DateInput, settings: any) {
        return this.calendarComponent()!.getApi().formatRange(start, end, settings);
    }

    formatDate(date: DateInput, settings: any) {
        return this.calendarComponent()!.getApi().formatDate(date, settings);
    }

    refetchResources() {
        this.calendarComponent()!.getApi().refetchResources();
    }

    getTopLevelResources() {
        const stringifyedResources: any[] = [];
        this.calendarComponent()!.getApi().getTopLevelResources().forEach((res) => {
            stringifyedResources.push(this.stringifyResource(res));
        });
        return stringifyedResources;
    }

    getResources() {
        const stringifyedResources: any[] = [];
        this.calendarComponent()!.getApi().getResources().forEach((res) => {
            stringifyedResources.push(this.stringifyResource(res));
        });
        return stringifyedResources;
    }

    getResourceById(id: string) {
        return this.stringifyResource(this.calendarComponent()!.getApi().getResourceById(id));
    }

    addResource(resource: ResourceObject, scrollTo?: boolean) {
        return this.stringifyResource(this.calendarComponent()!.getApi().addResource(resource, scrollTo));
    }

    getParent(id: string) {
        return this.stringifyResource(this.calendarComponent()!.getApi().getResourceById(id)!.getParent());
    }

    getChildren(id: string) {
        const stringifyedResources: any[] = [];
        this.calendarComponent()!.getApi().getResourceById(id)!.getChildren().forEach((res) => {
            stringifyedResources.push(this.stringifyResource(res));
        });
        return stringifyedResources;
    }

    getEvents(id: string) {
        const stringifyedEvents: any[] = [];
        this.calendarComponent()!.getApi().getResourceById(id)!.getEvents().forEach((e) => {
            stringifyedEvents.push(this.stringifyEvent(e));
        });
        return stringifyedEvents;
    }

    setPropResource(id: string, name: string, value: any) {
        this.calendarComponent()!.getApi().getResourceById(id)!.setProp(name, value);
    }

    setExtendedPropResource(id: string, name: string, value: any) {
        this.calendarComponent()!.getApi().getResourceById(id)!.setExtendedProp(name, value);
    }

    removeResource(id: string) {
        this.calendarComponent()!.getApi().getResourceById(id)!.remove();
    }

    toPlainObjectResource(id: string, settings?: { collapseExtendedProps?: boolean; collapseColor?: boolean }) {
        return JSON.stringify(this.calendarComponent()!.getApi().getResourceById(id)!.toPlainObject(settings));
    }

    getES() {
        let eventSources = [] as EventSource[];

        const arraySources = this.arrayEventSources();
        if (arraySources && arraySources.length) {
            eventSources = eventSources.concat(arraySources);
        }
        const funcSources = this.functionEventSources();
        for (let i = 0; funcSources && i < funcSources.length; i++) {
            eventSources.push(this.transformFunctionEventSource(funcSources[i], funcSources[i]['events']));
        }
        const gcalSources = this.gcalEventSources();
        if (gcalSources && gcalSources.length) {
            eventSources = eventSources.concat(gcalSources);
        }
        const jsonSources = this.jsonEventSources();
        if (jsonSources && jsonSources.length) {
            eventSources = eventSources.concat(jsonSources);
        }
        const iCalSources = this.iCalendarEventSources();
        if (iCalSources && iCalSources.length) {
            eventSources = eventSources.concat(iCalSources);
        }

        return eventSources;
    }

    getEventSourcesIndexById(id: string) {
        const sources = this.eventSources();
        for (let i = 0; sources && i < sources.length; i++) {
            if (sources[i].id === id) {
                return i;
            }
        }
        return null;
    }

    transformFunctionResource(resource: any) {
        return (info: FunctionInfo, successCallback: any, failureCallback: any) => {
            const retValue = resource(info);
            retValue.then((success: any) => {
                successCallback(success);
            }, (error: any) => {
                failureCallback(error);
            });
        };
    }

    transformFunctionEventSource(eventSource: EventSource, callback: (...args: unknown[]) => any) {
        const source = {} as EventSource;

        for (const property in eventSource) {
            (source as any)[property] = (eventSource as any)[property];
        }

        source['events'] = (info: FunctionInfo, successCallback: (arg: any) => void, failureCallback: (arg: any) => void) => {
            const index = this.getEventSourcesIndexById(source.id!);
            const retValue = this.servoyApi().callServerSideApi('getEventsFromFunctionEventSource', [index, info.start, info.end, eventSource.data]);
            (retValue as any).then((success: any) => {
                successCallback(success);
            }, (error: any) => {
                failureCallback(error);
            });
        };
        return source;
    }

    private durationToMilliseconds(duration: Duration): number {
        return duration.years * 31556952000 + duration.months * 2629746000 + duration.days * 86400000 + duration.milliseconds;
    }

    stringifyEvent(event: EventApi): EventObject {
        return {
            source: this.stringifyEventSource(event?.source!) as any,
            start: event?.start as any,
            end: event?.end as any,
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
            constraint: event?.constraint,
            overlap: event?.overlap,
            backgroundColor: event?.color,
            borderColor: event?.color,
            textColor: event?.contrastColor,
            classNames: event?.className ? event.className.split(' ') : [],
            extendedProps: event?.extendedProps,
            resourceId: event ? (event as any)['resourceId'] : null,
            resourceIds: event ? (event as any)['resourceIds'] : null
        };
    }

    stringifyEventSource(eventSource: EventSourceApi): EventSource {
        return {
            id: eventSource?.id,
            format: eventSource?.format,
            url: eventSource?.url
        };
    }

    stringifyView(view: ViewApi): ViewType {
        return {
            type: view?.type,
            title: view?.title,
            activeStart: view?.activeStart,
            activeEnd: view?.activeEnd,
            currentStart: view?.currentStart,
            currentEnd: view?.currentEnd
        };
    }

    stringifyResource(resource: any): ResourceObject {
        return {
            id: resource?.id,
            title: resource?.title,
            eventConstraint: typeof (resource?.eventConstraint) === 'string' ? resource.eventConstraint : null,
            eventOverlap: resource?.eventOverlap,
            eventBackgroundColor: resource?.eventBackgroundColor,
            eventBorderColor: resource?.eventBorderColor,
            eventTextColor: resource?.eventTextColor,
            eventClassNames: resource?.eventClassNames,
            extendedProps: resource?.extendedProps
        };
    }

    private initializeCallbacks() {
        if (this.onSelectMethodID()) { this.fullCalendarOptions.select = this.selectCallback; }
        if (this.onUnselectMethodID()) { this.fullCalendarOptions.unselect = this.unselectCallback; }
        if (this.onEventDblClickMethodID() || this.onEventClickMethodID()) this.fullCalendarOptions.eventClick = this.eventClick;
        if (this.onEventResizeMethodID()) { this.fullCalendarOptions.eventResize = this.eventResize; }
        if (this.onEventDragStartMethodID()) { this.fullCalendarOptions.eventResizeStart = this.eventDragStart; }
        if (this.onEventResizeStopMethodID()) { this.fullCalendarOptions.eventResizeStop = this.eventResizeStop; }
        if (this.onEventDropMethodID()) { this.fullCalendarOptions.eventDrop = this.eventDrop; }
        if (this.onEventDragStartMethodID()) { this.fullCalendarOptions.eventDragStart = this.eventDragStart; }
        if (this.onEventDragStopMethodID()) { this.fullCalendarOptions.eventDragStop = this.eventDragStop; }
        if (this.onEventReceiveMethodID()) { this.fullCalendarOptions.eventReceive = this.eventReceive; }
        if (this.onEventLeaveMethodID()) { this.fullCalendarOptions.eventLeave = this.eventLeave; }
        if (this.onDropMethodID()) { this.fullCalendarOptions.drop = this.drop; }
        if (this.onEventMouseEnterMethodID() || this.onMouseEnter()) { this.fullCalendarOptions.eventMouseEnter = this.eventMouseEnter; }
        if (this.onEventMouseLeaveMethodID() || this.onMouseLeave()) { this.fullCalendarOptions.eventMouseLeave = this.eventMouseLeave; }
        if (this.onEventAddMethodID()) { this.fullCalendarOptions.eventAdd = this.eventAdd; }
        if (this.onEventChangeMethodID()) { this.fullCalendarOptions.eventChange = this.eventChange; }
        if (this.onEventRemoveMethodID()) { this.fullCalendarOptions.eventRemove = this.eventRemove; }
        if (this.onEventsSetMethodID()) { this.fullCalendarOptions.eventsSet = this.eventsSet; }
        if (this.onDatesSetMethodID()) { this.fullCalendarOptions.datesSet = this.datesSet; }
        if (this.onLoadingMethodID()) { this.fullCalendarOptions.loading = this.loading; }
        if (this.onDateClickMethodID() || this.onDateDblClickMethodID()) { this.fullCalendarOptions.dateClick = this.dateClick; }
        if (this.onResourceAddMethodID()) { this.fullCalendarOptions.resourceAdd = this.resourceAdd; }
        if (this.onResourceChangeMethodID()) { this.fullCalendarOptions.resourceChange = this.resourceChange; }
        if (this.onResourceRemoveMethodID()) { this.fullCalendarOptions.resourceRemove = this.resourceRemove; }
        if (this.onResourcesSetMethodID()) { this.fullCalendarOptions.resourcesSet = this.resourcesSet; }
        this.fullCalendarOptions.viewDidMount = this.viewDidMount;
        if (this.onViewWillUnmountMethodID()) { this.fullCalendarOptions.viewWillUnmount = this.viewWillUnmount; }
        if (!this.fullCalendarOptions.navLinkDayClick) {
            this.fullCalendarOptions.navLinkDayClick = this.navLinkDayClick as any;
        }
        if (!this.fullCalendarOptions.navLinkWeekClick) {
            this.fullCalendarOptions.navLinkWeekClick = this.navLinkWeekClick as any;
        }
    }
}

export class ViewType implements ICustomObjectValue {
    type!: string;
    title!: string;
    activeStart!: Date;
    activeEnd!: Date;
    currentStart!: Date;
    currentEnd!: Date;
}

interface FunctionInfo {
    start: Date;
    end: Date;
    startStr: string;
    endStr: string;
    timezone: string;
}

export class EventSource implements ICustomObjectValue {
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
    public display?: string;
}

export class JSONEventSource extends EventSource { }

export class iCalendarEventSource extends EventSource { }

export class GoogleCalendarEventSource extends EventSource {
    public googleCalendarId!: string;
}

export class FunctionEventSource extends EventSource {
    public events!: (...args: unknown[]) => any;
}

export class ArrayEventSource extends EventSource {
    public events?: EventObject[];
}

export class EventObject implements ICustomObjectValue {
    public id?: string;
    public groupId?: string;
    public title?: string;
    public allDay?: boolean;
    public start?: string | Date;
    public end?: string | Date;
    public startStr?: string;
    public endStr?: string;
    public classNames?: string[];
    public editable?: boolean;
    public startEditable?: boolean;
    public durationEditable?: boolean;
    public resourceEditable?: boolean;
    public overlap?: boolean;
    public constraint?: ConstraintInput;
    public backgroundColor?: string;
    public borderColor?: string;
    public textColor?: string;
    public extendedProps?: any;
    public display?: string;
    public url?: string;
    public source?: EventSource;
    public resourceId?: string;
    public resourceIds?: string[];
}

export class ResourceObject implements ICustomObjectValue {
    public id?: string;
    public title?: string;
    public children?: ResourceObject[];
    public parentId?: string;
    public extendedProps!: any;
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
    imports: [
        FullCalendar
    ],
    exports: [
        FullCalendar
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class FullCalendarComponentModule {
}

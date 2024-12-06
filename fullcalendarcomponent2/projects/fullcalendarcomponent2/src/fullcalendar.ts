import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { LoggerFactory, LoggerService, ServoyBaseComponent, ServoyPublicService, ICustomObjectValue, TooltipService } from '@servoy/public';
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
import luxonPlugin from '@fullcalendar/luxon3';
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
    @Input() onSelectMethodID: (start: Date, end: Date, startStr: string, endStr: string, allDay: boolean, event: MouseEvent, view: ViewType, resource?: any) => void;
    @Input() onUnselectMethodID: (jsEvent: MouseEvent, view: ViewType) => void;
    @Input() onDateClickMethodID: (date: Date, dateStr: string, dayEl: HTMLElement, event: MouseEvent, view: ViewType, resource?: ResourceObject) => void;
    @Input() onDateDblClickMethodID: (date: Date, dateStr: string, dayEl: HTMLElement, event: MouseEvent, view: ViewType, resource?: ResourceObject) => void;
    @Input() onNavLinkDayClickMethodID: (date: Date, event: MouseEvent) => void;
    @Input() onNavLinkWeekClickMethodID: (date: Date, event: MouseEvent) => void;
    @Input() onEventClickMethodID: (event: EventObject, jsEvent: MouseEvent, view: ViewType) => void;
    @Input() onEventDblClickMethodID: (event: EventObject, jsEvent: MouseEvent, view: ViewType) => void;
    @Input() onEventMouseEnterMethodID: (el: HTMLElement, event: EventObject, jsEvent: MouseEvent, view: ViewType) => void;
    @Input() onEventMouseLeaveMethodID: (el: HTMLElement, event: EventObject, jsEvent: MouseEvent, view: ViewType) => void;
	@Input() onMouseEnter: (event: EventObject, jsEvent: MouseEvent, view: ViewType) => void;
	@Input() onMouseLeave: (event: EventObject, jsEvent: MouseEvent, view: ViewType) => void;
    @Input() onEventAddMethodID: (event: EventObject, relatedEvents: EventObject[]) => Promise<boolean>;
    @Input() onEventRemoveMethodID: (event: EventObject, relatedEvents: EventObject[]) => Promise<boolean>;
    @Input() onEventChangeMethodID: (event: EventObject, oldEvent: EventObject, relatedEvents: EventObject[]) => Promise<boolean>;
    @Input() onLoadingMethodID: (isLoading: boolean) => void;
    @Input() onDatesSetMethodID: (start: Date, end: Date, startStr: string, endStr: string, timeZone: string, view: ViewType) => void;
    @Input() onEventsSetMethodID: (events: EventObject[]) => void;
    @Input() onWindowResizeMethodID: (view: ViewType) => void;
    @Input() onEventResizeMethodID: (event: EventObject, relatedEvents: EventObject[], oldEvent: EventObject, endDelta: number, startDelta: number, jsEvent: MouseEvent, view: ViewType) => Promise<boolean>;
    @Input() onEventDropMethodID: (event: EventObject, relatedEvents: EventObject[], oldEvent: EventObject, oldResource: ResourceObject,
        newResource: ResourceObject, delta: number, jsEvent: MouseEvent, view: ViewType) => Promise<boolean>;
    @Input() onDropMethodID: (allDay: boolean, date: Date, dateStr: string, draggedEl: HTMLElement, jsEvent: MouseEvent, resource: ResourceObject, view: ViewType) => void;
    @Input() onEventDragStartMethodID: (event: EventObject, jsEvent: MouseEvent, view: ViewType) => void;
    @Input() onEventResizeStartMethodID: (event: EventObject, jsEvent: MouseEvent, view: ViewType) => void;
    @Input() onEventRightClickMethodID: (event: EventObject, jsEvent: MouseEvent, view: ViewType) => void;
    @Input() onEventDragStopMethodID: (event: EventObject, jsEvent: MouseEvent, view: ViewType) => void;
    @Input() onEventResizeStopMethodID: (event: EventObject, jsEvent: MouseEvent, view: ViewType) => void;
    @Input() onEventReceiveMethodID: (event: EventObject, relatedEvents: Event[], draggedEl: HTMLElement, view: ViewType) => Promise<boolean>;
    @Input() onEventLeaveMethodID: (event: EventObject, relatedEvents: Event[], draggedEl: HTMLElement, view: ViewType) => Promise<boolean>;
    @Input() onResourceAddMethodID: (resource: ResourceApi) => Promise<boolean>;
    @Input() onResourceChangeMethodID: (oldResource: ResourceApi, newResource: ResourceApi) => Promise<boolean>;
    @Input() onResourceRemoveMethodID: (resource: ResourceApi) => Promise<boolean>;
    @Input() onResourcesSetMethodID: (resources: ResourceApi[]) => void;
    @Input() onViewDidMountMethodID: (view: ViewType) => void;
    @Input() onViewWillUnmountMethodID: (view: ViewType) => void;

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
    tooltipService: TooltipService;

    clickTimeout = null;
    clickDelay = 300; //ms

    private initialDelay = 750;
    private dismissDelay = 5000;
    
    constructor(private servoyService: ServoyPublicService,
        tooltipSrv: TooltipService,
        renderer: Renderer2, cdRef: ChangeDetectorRef,
        logFactory: LoggerFactory) {
        super(renderer, cdRef);
        this.log = logFactory.getLogger('FullCalendar');
        this.tooltipService = tooltipSrv;
        this.initialDelay = servoyService.getUIProperty("tooltipInitialDelay");
        if (this.initialDelay === null || isNaN(this.initialDelay)) this.initialDelay = 750;
        this.dismissDelay = servoyService.getUIProperty("tooltipDismissDelay");
        if (this.dismissDelay === null || isNaN(this.dismissDelay)) this.dismissDelay = 5000;
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
					case 'calendarOptions': {
						if (this.calendarComponent) {
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
        this.initFullCalendar();
    }

    initFullCalendar() {
        this.fullCalendarOptions = this.calendarOptions ? this.calendarOptions : {} as CalendarOptions;

        this.fullCalendarOptions.eventDidMount = this.eventDidMount;

        this.initializeCallbacks();

        if ((!this.hasToDraw || this.renderOnCurrentView) && this.view) {
            this.fullCalendarOptions.initialView = this.view.type;
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
            const _resources = selectionInfo.resource?._resource;
            this.onSelectMethodID(selectionInfo.start, selectionInfo.end, selectionInfo.startStr, selectionInfo.endStr,
                selectionInfo.allDay, selectionInfo.jsEvent, this.stringifyView(selectionInfo.view), _resources);
        }
    }

    unselectCallback = (selectionInfo: DateUnselectArg) => {
        if (this.onUnselectMethodID) {
            this.onUnselectMethodID(selectionInfo.jsEvent, this.stringifyView(selectionInfo.view));
        }
    }

    dateClick = (arg: DateClickArg) => {
        if (this.clickTimeout) {
            clearTimeout(this.clickTimeout);
            this.clickTimeout = null;

            if (this.onDateDblClickMethodID) {
                this.onDateDblClickMethodID(arg.date, arg.dateStr, arg.dayEl, arg.jsEvent, this.stringifyView(arg.view), this.stringifyResource(arg.resource));
            }
        } else {
            if (this.onDateDblClickMethodID) {
                this.clickTimeout = setTimeout(() => {
                    this.clickTimeout = null;
                    if (this.onDateClickMethodID) {
                        this.onDateClickMethodID(arg.date, arg.dateStr, arg.dayEl, arg.jsEvent, this.stringifyView(arg.view), this.stringifyResource(arg.resource));
                    }
                }, this.clickDelay);
            } else {
                if (this.onDateClickMethodID) {
                    this.onDateClickMethodID(arg.date, arg.dateStr, arg.dayEl, arg.jsEvent, this.stringifyView(arg.view), this.stringifyResource(arg.resource));
                }
            }
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
        if (this.clickTimeout) {
            clearTimeout(this.clickTimeout);
            this.clickTimeout = null;

            if (this.onEventDblClickMethodID) {
                this.onEventDblClickMethodID(this.stringifyEvent(eventClickArg.event), eventClickArg.jsEvent, this.stringifyView(eventClickArg.view));
            }
        } else {

            if (this.onEventDblClickMethodID) {
                this.clickTimeout = setTimeout(() => {
                    this.clickTimeout = null;
                    if (this.onEventClickMethodID) {
                        this.onEventClickMethodID(this.stringifyEvent(eventClickArg.event), eventClickArg.jsEvent, this.stringifyView(eventClickArg.view));
                    }
                }, this.clickDelay);
            } else {
                if (this.onEventClickMethodID) {
                    this.onEventClickMethodID(this.stringifyEvent(eventClickArg.event), eventClickArg.jsEvent, this.stringifyView(eventClickArg.view));
                }
            }
        }
    }

    eventMouseEnter = (eventHovering: EventHoveringArg) => {
        if (this.onEventMouseEnterMethodID) {
            this.onEventMouseEnterMethodID(null, this.stringifyEvent(eventHovering.event), eventHovering.jsEvent, eventHovering.view);
        }
		if (this.onMouseEnter) {
			this.onMouseEnter(this.stringifyEvent(eventHovering.event), eventHovering.jsEvent, eventHovering.view);
		}
    }

    eventMouseLeave = (eventHovering: EventHoveringArg) => {
        if (this.onEventMouseLeaveMethodID) {
            this.onEventMouseLeaveMethodID(null, this.stringifyEvent(eventHovering.event), eventHovering.jsEvent, eventHovering.view);
        }
		if (this.onMouseLeave) {
			this.onMouseLeave(this.stringifyEvent(eventHovering.event), eventHovering.jsEvent, eventHovering.view);
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

    eventDrop = (dropArg: EventDropArg) => {
        if (this.onEventDropMethodID) {
            const stringifyedRelatedEvents = [];
            dropArg.relatedEvents.forEach((e) => {
                stringifyedRelatedEvents.push(this.stringifyEvent(e));
            });
            const retValue = this.onEventDropMethodID(this.stringifyEvent(dropArg.event), stringifyedRelatedEvents, this.stringifyEvent(dropArg.oldEvent),
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

    eventDidMount = (info: any) => {
        // show tooltip
        if (this.tooltipExpression) {
            const tooltip = this.evaluateTooltipExpression(this.tooltipExpression, info.event);
            info.el.onmouseenter = (jsEvent: MouseEvent) => {
                this.tooltipService.showTooltip(jsEvent, tooltip, this.initialDelay, this.dismissDelay);
            };
            info.el.onmouseleave = (jsEvent: MouseEvent) => {
                this.tooltipService.hideTooltip()
            };
        }
        if (this.onEventRightClickMethodID)
        {
            info.el.addEventListener("contextmenu", (event) => {
                event.preventDefault()
                this.onEventRightClickMethodID(this.stringifyEvent(info.event), event, info.view);
            })
        }
    }

    evaluateTooltipExpression = (expression: String, event: EventObject) => {
        // match all text wrapped in {{ }} which starts with a literal and may contains literal, numbers _ and . (. is used for nested properties)
        return expression.replace(/({{[a-zA-Z][a-zA-Z0-9&._]*}})/g, (j) => { 
            let property = j.replace(/{{/, '').replace(/}}/, '');				    	
            return this.evalDeepProperty(event, property) || '';
        });
    }

    evalDeepProperty = (obj: EventObject, property: String) => {
        if (!property) {
            throw 'Illegal argument property undefined';
        }
        
        let parts = property.split('.');
        let deepObj = obj[parts[0]];
        
        if (parts.length === 1) {
            return deepObj;
        } else if (deepObj) {
            return this.evalDeepProperty(deepObj, parts.slice(1).join('.'));
        } else {
            return null;
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

    getEventSourceById(eventSourceID: string) : EventSource{
        return this.stringifyEventSource(this.calendarComponent.getApi().getEventSourceById(eventSourceID));
    }

    addEventSourceToCalendar(eventSource: EventSource) : EventSource{
        return this.stringifyEventSource(this.calendarComponent.getApi().addEventSource(eventSource));
    }

    addFunctionEventSourceToCalendar(eventSource: EventSource, callback: (...args: unknown[]) => any) {
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
            const retValue = resource(info);
            retValue.then((success) => {
                successCallback(success);
            }, (error) => {
                failureCallback(error);
            });
        };
    }

    transformFunctionEventSource(eventSource: EventSource, callback: (...args: unknown[]) => any) {
        const source = {} as EventSource;

        // copy properties of eventSource
        for (const property in eventSource) {
            source[property] = eventSource[property];
        }

        // register server side callback
        source['events'] = (info: FunctionInfo, successCallback: (arg) => void, failureCallback: (arg) => void) => {
			const index = this.getEventSourcesIndexById(source.id);
            const retValue = this.servoyApi.callServerSideApi('getEventsFromFunctionEventSource', [index, info.start, info.end, eventSource.data]);
            retValue.then((success) => {
                successCallback(success);
            }, (error) => {
                failureCallback(error);
            });
        };
        return source;
    }

    private durationToMilliseconds(duration:Duration):number{
        return duration.years * 31556952000 + duration.months * 2629746000 + duration.days * 86400000 + duration.milliseconds ;
    }
    
    stringifyEvent(event: EventApi): EventObject {
        return {
            source: this.stringifyEventSource(event?.source),
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
            classNames: event?.classNames,
            extendedProps: event?.extendedProps,
            resourceId : event ? event['resourceId'] : null,
            resourceIds : event ? event['resourceIds'] : null
        };
    }

    stringifyEventSource(eventSource: EventSourceApi) : EventSource{
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
        if (this.onSelectMethodID) { this.fullCalendarOptions.select = this.selectCallback; }
        if (this.onUnselectMethodID) { this.fullCalendarOptions.unselect = this.unselectCallback; }
        if (this.onEventDblClickMethodID || this.onEventClickMethodID) this.fullCalendarOptions.eventClick = this.eventClick;
        if (this.onEventResizeMethodID) { this.fullCalendarOptions.eventResize = this.eventResize;}
        if (this.onEventDragStartMethodID) { this.fullCalendarOptions.eventResizeStart = this.eventDragStart; }
        if (this.onEventResizeStopMethodID) {  this.fullCalendarOptions.eventResizeStop = this.eventResizeStop; }
        if (this.onEventDropMethodID) { this.fullCalendarOptions.eventDrop = this.eventDrop; }
        if (this.onEventDragStartMethodID) { this.fullCalendarOptions.eventDragStart = this.eventDragStart; }
        if (this.onEventDragStopMethodID) { this.fullCalendarOptions.eventDragStop = this.eventDragStop; }
        if (this.onEventReceiveMethodID) { this.fullCalendarOptions.eventReceive = this.eventReceive; }
        if (this.onEventLeaveMethodID) { this.fullCalendarOptions.eventLeave = this.eventLeave; }
        if (this.onDropMethodID) { this.fullCalendarOptions.drop = this.drop; }
        if (this.onEventMouseEnterMethodID || this.onMouseEnter) { this.fullCalendarOptions.eventMouseEnter = this.eventMouseEnter; }
        if (this.onEventMouseLeaveMethodID || this.onMouseLeave) { this.fullCalendarOptions.eventMouseLeave = this.eventMouseLeave; }
        if (this.onEventAddMethodID) { this.fullCalendarOptions.eventAdd = this.eventAdd; }
        if (this.onEventChangeMethodID) {this.fullCalendarOptions.eventChange = this.eventChange; }
        if (this.onEventRemoveMethodID) { this.fullCalendarOptions.eventRemove = this.eventRemove; }
        if (this.onEventsSetMethodID) {this.fullCalendarOptions.eventsSet = this.eventsSet; }
        if (this.onWindowResizeMethodID) {this.fullCalendarOptions.windowResize = this.windowResize;}
        if (this.onDatesSetMethodID) { this.fullCalendarOptions.datesSet = this.datesSet; }
        if (this.onLoadingMethodID) { this.fullCalendarOptions.loading = this.loading; }
        if (this.onDateClickMethodID || this.onDateDblClickMethodID) {this.fullCalendarOptions.dateClick = this.dateClick; }
        if (this.onResourceAddMethodID) { this.fullCalendarOptions.resourceAdd = this.resourceAdd; }
        if (this.onResourceChangeMethodID) { this.fullCalendarOptions.resourceChange = this.resourceChange; }
        if (this.onResourceRemoveMethodID) { this.fullCalendarOptions.resourceRemove = this.resourceRemove; }
        if (this.onResourcesSetMethodID) { this.fullCalendarOptions.resourcesSet = this.resourcesSet; }
        this.fullCalendarOptions.viewDidMount = this.viewDidMount;
        if (this.onViewWillUnmountMethodID) { this.fullCalendarOptions.viewWillUnmount = this.viewWillUnmount; }
        if (!this.fullCalendarOptions.navLinkDayClick){
            this.fullCalendarOptions.navLinkDayClick = this.navLinkDayClick;
        }
        if (!this.fullCalendarOptions.navLinkWeekClick){
            this.fullCalendarOptions.navLinkWeekClick = this.navLinkWeekClick;
        }
    }
}

export class ViewType implements ICustomObjectValue {
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
    public googleCalendarId: string;
}

export class FunctionEventSource extends EventSource {
    public events: (...args: unknown[]) => any;
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
    public resourceId? : string;
    public resourceIds? : string[];
}

export class ResourceObject implements ICustomObjectValue {
    public id?: string;
    public title?: string;
    public children?: Array<ResourceObject>;
    public parentId?: string;
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
    }
}

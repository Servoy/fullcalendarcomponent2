import { ChangeDetectorRef, Component, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { LoggerFactory, LoggerService, ServoyBaseComponent, ServoyPublicService } from '@servoy/public';
import { CalendarOptions, DateInput, DateRangeInput, DateSelectArg, DatesSetArg, DateUnselectArg, Duration, DurationInput, EventAddArg, EventApi, EventChangeArg, EventClickArg, EventDropArg, EventHoveringArg, EventInput, EventRemoveArg, EventSourceInput, FormatterInput, FullCalendarComponent, PointerDragEvent, ViewApi } from '@fullcalendar/angular';
import { Input } from '@angular/core';
import { DateClickArg, DropArg, EventDragStartArg, EventDragStopArg, EventLeaveArg, EventReceiveArg, EventResizeDoneArg, EventResizeStartArg, EventResizeStopArg } from '@fullcalendar/interaction';

@Component({
    selector: 'svy-fullcalendar',
    template: `
    <div style="height:100%; width:100%; overflow:auto;" [ngClass]="styleClass">
         <full-calendar #calendar [options]="fullCalendarOptions"></full-calendar>
    </div>
    `
})
export class FullCalendar extends ServoyBaseComponent<HTMLDivElement> implements OnInit {

    // IMPLEMENTED
    @Input() onSelectMethodID: (start: Date, end: Date, startStr: string, endStr: string, allDay: boolean, event: MouseEvent, view: View, resource?: any) => void;
    @Input() onUnselectMethodID: (jsEvent: MouseEvent, view: View) => void;
    @Input() onDateClickMethodID: (date: Date, dateStr: string, dayEl: HTMLElement, event: MouseEvent, view: View, resource?: Resource) => void;
    @Input() onEventClickMethodID: (event: Event, jsEvent: MouseEvent, view: View) => void;
    @Input() onEventMouseEnterMethodID: (el: HTMLElement, event: Event, jsEvent: MouseEvent, view: View) => void;
    @Input() onEventMouseLeaveMethodID: (el: HTMLElement, event: Event, jsEvent: MouseEvent, view: View) => void;
    @Input() onEventAddMethodID: (event: Event, relatedEvents: Event[], revert: () => void) => void;
    @Input() onEventRemoveMethodID: (event: Event, relatedEvents: Event[], revert: () => void) => void;
    @Input() onEventChangeMethodID: (event: Event, oldEvent: Event,relatedEvents: Event[], revert: () => void) => void;
    @Input() onLoadingMethodID: (isLoading: boolean) => void;
    @Input() onDatesSetMethodID: (start: Date, end: Date, startStr: string, endStr: string, timeZone: string, view: View) => void;
    @Input() onEventsSetMethodID: (events: Event[]) => void;
    @Input() onWindowResizeMethodID: (view: View ) => void;
    @Input() onEventResizeMethodID: (event: Event, relatedEvents: Event[], oldEvent: Event, endDelta: Duration, startDelta: Duration, view: View, el: HTMLElement, jsEvent: MouseEvent) => Promise<boolean>;
    @Input() onEventDropMethodID: (event: Event, relatedEvents: Event[], oldEvent: Event, oldResource: Resource, newResource: Resource, delta: Duration, view: View, el: HTMLElement, jsEvent: MouseEvent) => Promise<boolean>;
    @Input() onDropMethodID: (allDay: boolean, date: Date, dateStr: string, draggedEl: HTMLElement, jsEvent: MouseEvent, resource: Resource, view: View) => void;
    @Input() onEventDragStartMethodID: (event: Event, jsEvent: MouseEvent, view: View) => void;
    @Input() onEventResizeStartMethodID: (event: Event, jsEvent: MouseEvent, view: View) => void;
    @Input() onEventDragStopMethodID: (event: Event, jsEvent: MouseEvent, view: View) => void;
    @Input() onEventResizeStopMethodID: (event: Event, jsEvent: MouseEvent, view: View) => void;
    @Input() onEventReceiveMethodID: (event: Event, relatedEvents: Event[], draggedEl: HTMLElement,  view: View) => void;
    @Input() onEventLeaveMethodID: (event: Event, relatedEvents: Event[], draggedEl: HTMLElement,  view: View) => void;

    @Input() hasToDraw: boolean;
    @Input() renderOnCurrentView: boolean;
    @Input() styleClass: string;
    @Input() calendarOptions: CalendarOptions;
    @Input() view: any;
    @Input() events: any[];
    @Input() eventSources: any[];
    @Input() arrayEventSources: any[];
    @Input() functionEventSources: any[];
    @Input() gcalEventSources: any[];
    @Input() jsonEventSources: any[];
    @Input() tooltipExpression: string;
    @Input() location: object;
    @Input() size: object;

    @ViewChild('calendar') calendarComponent: FullCalendarComponent;

    fullCalendarOptions: CalendarOptions = {};
    TIMEZONE_DEFAULT = "local";
    log: LoggerService;

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
                  case 'eventSources': {
                    if (change.currentValue && change.currentValue !== change.previousValue && this.eventSources.length > 0) {
                      let newEventSource = this.eventSources[this.eventSources.length - 1];
                      let lastFunctionES = this.functionEventSources.length > 0 ? this.functionEventSources[this.functionEventSources.length - 1] : null;
                      if (lastFunctionES && newEventSource === lastFunctionES) {
                        newEventSource = this.transformFunctionEventSource(newEventSource);
                      }
                      this.calendarComponent.getApi().addEventSource(newEventSource);
                    }
                    break;
                  }
                  case 'hasToDraw': {
                    if (change.currentValue && change.currentValue === true && change.previousValue && change.previousValue === false) {
                      this.initFullCalendar();
                      this.hasToDraw = false;
                    }
                    break;
                  }
              }
          }
      }
  }


    initFullCalendar() {
      this.fullCalendarOptions = this.calendarOptions;

      this.initializeCallbacks();

      // This code is from NG1, not sure if it's really necessary for NG2, must check
      if ((!this.hasToDraw || this.renderOnCurrentView) && this.view) {
        this.fullCalendarOptions.initialView = this.view.name;
        this.fullCalendarOptions.initialDate = new Date(this.view.defaultDate);
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

      if (!this.calendarOptions.schedulerLicenseKey) {
        // This is used only for testing purposes, the clients will set their own premium license key
        this.fullCalendarOptions.schedulerLicenseKey = 'CC-Attribution-NonCommercial-NoDerivatives';
      }
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
    }

    /***********************************************************************************************************
    * CALLBACKS
    * **********************************************************************************************************/

    loading(isLoading: boolean) {
      if (this.onLoadingMethodID) {
        this.onLoadingMethodID(isLoading);
      }
    }

    datesSet(arg: DatesSetArg) {
      if (this.onDatesSetMethodID) {
        this.onDatesSetMethodID(arg.start, arg.end, arg.startStr, arg.endStr, arg.timeZone, this.stringifyView(arg.view));
      }
    }

    selectCallback(selectionInfo : DateSelectArg) {
      if (this.onSelectMethodID) {
        this.onSelectMethodID(selectionInfo.start, selectionInfo.end, selectionInfo.startStr, selectionInfo.endStr,
          selectionInfo.allDay, selectionInfo.jsEvent, this.stringifyView(selectionInfo.view), selectionInfo.resource);
      }
    }

    unselectCallback(selectionInfo : DateUnselectArg) {
      if (this.onUnselectMethodID) {
        this.onUnselectMethodID(selectionInfo.jsEvent, this.stringifyView(selectionInfo.view));
      }
    }

    dateClick(arg: DateClickArg) {
      if (this.onDateClickMethodID) {
        this.onDateClickMethodID(arg.date, arg.dateStr, arg.dayEl, arg.jsEvent, this.stringifyView(arg.view), this.stringifyResource(arg.resource))
      }
    }

    eventClick(eventClickArg: EventClickArg) {
      if (this.onEventClickMethodID) {
        this.onEventClickMethodID(this.stringifyEvent(eventClickArg.event), eventClickArg.jsEvent, this.stringifyView(eventClickArg.view));
      }
    }

    eventMouseEnter(eventHovering: EventHoveringArg) {
      if (this.onEventMouseEnterMethodID) {
        this.onEventMouseEnterMethodID(eventHovering.el, this.stringifyEvent(eventHovering.event), eventHovering.jsEvent, eventHovering.view);
      }
    }

    eventMouseLeave(eventHovering: EventHoveringArg) {
      if (this.onEventMouseLeaveMethodID) {
        this.onEventMouseLeaveMethodID(eventHovering.el, this.stringifyEvent(eventHovering.event), eventHovering.jsEvent, eventHovering.view);
      }
    }

    eventAdd(eventAdd: EventAddArg) {
      if (this.onEventAddMethodID) {
        let stringifyedRelatedEvents = [];
        eventAdd.relatedEvents.forEach((e) => {
          stringifyedRelatedEvents.push(this.stringifyEvent(e));
        });
        this.onEventAddMethodID(this.stringifyEvent(eventAdd.event), stringifyedRelatedEvents, eventAdd.revert);
      }
    }

    eventRemove(eventRemove: EventRemoveArg) {
      if (this.onEventRemoveMethodID) {
        let stringifyedRelatedEvents = [];
        eventRemove.relatedEvents.forEach((e) => {
          stringifyedRelatedEvents.push(this.stringifyEvent(e));
        });
        this.onEventRemoveMethodID(this.stringifyEvent(eventRemove.event), stringifyedRelatedEvents, eventRemove.revert);
      }
    }

    eventChange(eventChange: EventChangeArg) {
      if (this.onEventChangeMethodID) {
        let stringifyedRelatedEvents = [];
        eventChange.relatedEvents.forEach((e) => {
          stringifyedRelatedEvents.push(this.stringifyEvent(e));
        });
        this.onEventChangeMethodID(this.stringifyEvent(eventChange.event), 
          this.stringifyEvent(eventChange.oldEvent), stringifyedRelatedEvents, eventChange.revert);
      }
    }

    eventResize(resizeArg: EventResizeDoneArg) {
      if (this.onEventResizeMethodID) {
        let stringifyedRelatedEvents = [];
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

    eventDrop(dropArg: EventDropArg) {
      if (this.onEventDropMethodID) {
        let stringifyedRelatedEvents = [];
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

    drop(dropArg: DropArg) {
      if (this.onDropMethodID) {
        this.onDropMethodID(dropArg.allDay, dropArg.date, dropArg.dateStr, dropArg.draggedEl, 
          dropArg.jsEvent, this.stringifyResource(dropArg.resource), this.stringifyView(dropArg.view));
      }
    }

    eventResizeStart(resizeStart: EventResizeStartArg) {
      if (this.onEventResizeStartMethodID) {
        this.onEventResizeStartMethodID(this.stringifyEvent(resizeStart.event), resizeStart.jsEvent, this.stringifyView(resizeStart.view));
      }
    }

    eventResizeStop(resizeStop: EventResizeStopArg) {
      if (this.onEventResizeStopMethodID) {
        this.onEventResizeStopMethodID(this.stringifyEvent(resizeStop.event), resizeStop.jsEvent, this.stringifyView(resizeStop.view));
      }
    }

    eventDragStart(dragStart: EventDragStartArg) {
      if (this.onEventDragStartMethodID) {
        this.onEventDragStartMethodID(this.stringifyEvent(dragStart.event), dragStart.jsEvent, this.stringifyView(dragStart.view));
      }
    }

    eventDragStop(dragStop: EventDragStopArg) {
      if (this.onEventDragStopMethodID) {
        this.onEventDragStopMethodID(this.stringifyEvent(dragStop.event), dragStop.jsEvent, this.stringifyView(dragStop.view));
      }
    }

    eventReceive(receiveArg: EventReceiveArg) {
      if (this.onEventReceiveMethodID) {
        let stringifyedRelatedEvents = [];
        receiveArg.relatedEvents.forEach((e) => {
          stringifyedRelatedEvents.push(this.stringifyEvent(e));
        });
        this.onEventReceiveMethodID(this.stringifyEvent(receiveArg.event), stringifyedRelatedEvents, receiveArg.draggedEl, this.stringifyView(receiveArg.view));
      }
    }

    eventLeave(leaveArg: EventLeaveArg) {
      if (this.onEventLeaveMethodID) {
        let stringifyedRelatedEvents = [];
        leaveArg.relatedEvents.forEach((e) => {
          stringifyedRelatedEvents.push(this.stringifyEvent(e));
        });
        this.onEventReceiveMethodID(this.stringifyEvent(leaveArg.event), stringifyedRelatedEvents, leaveArg.draggedEl, this.stringifyView(leaveArg.view));
      }
    }

    eventsSet(events: EventApi[]) {
      if (this.onEventsSetMethodID) {
        let stringifyedRelatedEvents = [];
        events.forEach((e) => {
          stringifyedRelatedEvents.push(this.stringifyEvent(e));
        });
        this.onEventsSetMethodID(stringifyedRelatedEvents);
      }
    }

    windowResize(arg: {view : ViewApi}) {
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
      let stringifyedEvents = [];
      this.calendarComponent.getApi().getEvents().forEach((e) => {
          stringifyedEvents.push(this.stringifyEvent(e));
        });
      return stringifyedEvents;
    }

    getEventById(id: string) {
      // in the doc is written that id can be string or number
      // but the method only accepts string
      // https://fullcalendar.io/docs/Calendar-getEventById
      this.calendarComponent.getApi().getEventById(id);
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

    setAllDay(eventID: string, allDay: boolean, options?: {maintainDuration?: boolean}) {
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
      // TODO: where is the method event.getResources() ?
      this.calendarComponent.getApi().getEventById(eventID);
    }

    setEventResources(eventID: string, settings: any) {
      // TODO: where is the method event.setResources() ?
      this.calendarComponent.getApi().getEventById(eventID);
    }

    toPlainObject(eventID: string, settings: {collapseExtendedProps?: boolean; collapseColor?: boolean;}) {
      return this.calendarComponent.getApi().getEventById(eventID).toPlainObject(settings);
    }

    getEventSources() {
      // TODO: stringify sources before sending
      return this.calendarComponent.getApi().getEventSources();
    }

    getEventSourceById(eventSourceID: string) {
      // TODO: stringify source before sending
      return this.calendarComponent.getApi().getEventSourceById(eventSourceID);
    }

    // async addEventSource(eventSource: any) {
    //   if (eventSource.events && eventSource.events instanceof Function) {
    //     eventSource = this.transformFunctionEventSource(eventSource);
    //   }
    //   await this.servoyApi.callServerSideApi('removeEventSource', [eventSource]);
    //   return this.calendarComponent.getApi().addEventSource(eventSource);
    // }

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
      // TODO: stringify view before sending
      return this.calendarComponent.getApi().view;
    }

    /**
     * API for changing the view
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
      this.calendarComponent.getApi().formatIso(date, omitTime);
    }

    formatRangeCalendar(start: DateInput, end: DateInput, settings: any) {
      this.calendarComponent.getApi().formatRange(start, end, settings);
    }

    formatDate(date: DateInput, settings: any) {
      this.calendarComponent.getApi().formatDate(date, settings);
    }

    // TODO: implement APIs for resource data (premium)

    // Resource Data APIs - premium

    refetchResources() {
      this.calendarComponent.getApi().refetchResources();
    }

    getTopLevelResources() {
      // TODO: stringify resources before sending back
      this.calendarComponent.getApi().getTopLevelResources();
    }

    getResources() {
      // TODO: stringify resources before sending back
      this.calendarComponent.getApi().getResources();
    }

    getResourceById(id: string) {
      return this.stringifyResource(this.calendarComponent.getApi().getResourceById(id));
    }

    

    /**
     *  PRIVATE UTILITY METHODS
     */


    /**
     * Getter for event sources.
     * @returns an array of event sources
     */
    getES() {
      let eventSources = [];

      // arrayEventSources
      if (this.arrayEventSources && this.arrayEventSources.length) {
        eventSources = eventSources.concat(this.arrayEventSources);
      }
      // functionEventSources
      for (let i = 0; this.functionEventSources && i < this.functionEventSources.length; i++) {
        eventSources.push(this.transformFunctionEventSource(this.functionEventSources[i]))
      }
      // GoogleFeedEventSources
      if (this.gcalEventSources && this.gcalEventSources.length) {
        eventSources = eventSources.concat(this.gcalEventSources);
      }
      // JSONEventSources
      if (this.jsonEventSources && this.jsonEventSources.length) {
        eventSources = eventSources.concat(this.jsonEventSources);
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

    transformFunctionEventSource(eventSource: any) {
      let source = {};
      
      // copy properties of eventSource
      for (let property in eventSource) {
        source[property] = eventSource[property];
      }

      // register server side callback
      let callback = eventSource.events;
      source['events'] = (start: Date, end : Date, timezone: string, callbackFunction: Function) => {
        const retValue = this.servoyService.executeInlineScript(callback.formname, callback.script, [start, end, eventSource.data]);
        retValue.then(function(success) {
          callbackFunction(success)
        },(error) => {
          this.log.error('handler error');
          this.log.error(error);
        });
      }
      return source;
    }

    stringifyEvent(event: EventApi): Event {
      return {
        sourceId: (event.source) ? event.source.id : null,
        start: event.start,
        end: event.end,
        startStr: event.startStr,
        endStr: event.endStr,
        id: event.id,
        groupId: event.groupId,
        allDay: event.allDay,
        title: event.title,
        url: event.url,
        display: event.display,
        startEditable: event.startEditable,
        durationEditable: event.durationEditable,
        constraint: (typeof(event.constraint) === 'string') ? event.constraint : null,
        overlap: event.overlap,
        backgroundColor: event.backgroundColor,
        borderColor: event.borderColor,
        textColor: event.textColor,
        classNames: event.classNames
      }
    }

    stringifyView(view: ViewApi): View {
      return {
        type: view.type, 
        title: view.title,
        activeStart: view.activeStart,
        activeEnd: view.activeEnd,
        currentStart: view.currentStart,
        currentEnd: view.currentEnd
      }
    }

    stringifyResource(resource: any): Resource {
      return {
        id: resource.id,
        title: resource.title,
        eventConstraint: typeof(resource.eventConstraint) === 'string' ? resource.eventConstraint : null,
        eventOverlap: resource.eventOverlap,
        eventBackgroundColor: resource.eventBackgroundColor,
        eventBorderColor: resource.eventBorderColor,
        eventTextColor: resource.eventTextColor, 
        eventClassNames: resource.eventClassNames
      }
    }
}

interface Resource {
  id: string,
  title: string,
  eventConstraint: string,
  eventOverlap: boolean,
  eventBackgroundColor: string,
  eventBorderColor: string,
  eventTextColor: string,
  eventClassNames: string[]
}

interface Event {
  sourceId: string,
  start: Date,
  end: Date,
  startStr: string,
  endStr: string,
  id: string,
  groupId: string,
  allDay: boolean,
  title: string,
  url: string,
  display: string,
  startEditable: boolean,
  durationEditable: boolean,
  constraint: string,
  overlap: boolean;
  backgroundColor: string,
  borderColor: string,
  textColor: string,
  classNames: string[]
}

interface View {
  type: string,
  title: string,
  activeStart: Date,
  activeEnd: Date,
  currentStart: Date,
  currentEnd: Date
}
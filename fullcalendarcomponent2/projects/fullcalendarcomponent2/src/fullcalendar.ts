import { Component, OnInit, ViewChild } from '@angular/core';
import { ServoyBaseComponent } from '@servoy/public';
import { CalendarOptions, DateInput, DateRangeInput, DateSelectArg, DatesSetArg, DateUnselectArg, DurationInput, EventAddArg, EventApi, EventChangeArg, EventClickArg, EventHoveringArg, EventInput, EventRemoveArg, EventSourceInput, FormatterInput, FullCalendarComponent, PointerDragEvent, ViewApi } from '@fullcalendar/angular';
import { Input } from '@angular/core';
import { DateClickArg } from '@fullcalendar/interaction';

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
    @Input() onSelectMethodID: (start: Date, end: Date, startStr: string, endStr: string, allDay: boolean, event: MouseEvent, view: ViewApi, resource?: any) => void;
    @Input() onUnselectMethodID: (event: MouseEvent, view: ViewApi) => void;
    @Input() onDateClickMethodID: (date: Date, dateStr: string, dayEl: HTMLElement, event: MouseEvent, view: ViewApi, resource?: any) => void;
    @Input() onEventClickMethodID: (event: EventApi, jsEvent: MouseEvent, view?: ViewApi) => void;
    @Input() onEventMouseEnterMethodID: (el: HTMLElement, event: EventApi, jsEvent: MouseEvent, view?: ViewApi) => void;
    @Input() onEventMouseLeaveMethodID: (el: HTMLElement, event: EventApi, jsEvent: MouseEvent, view?: ViewApi) => void;
    @Input() onEventAddMethodID: (event: EventApi, relatedEvents: EventApi[], revent: () => void) => void;
    @Input() onEventRemoveMethodID: (event: EventApi, relatedEvents: EventApi[], revent: () => void) => void;
    @Input() onEventChangeMethodID: (event: EventApi, oldEvent: EventApi,relatedEvents: EventApi[], revent: () => void) => void;
    @Input() onLoadingMethodID: (isLoadig: boolean) => void;
    @Input() onDatesSetMethodID: (start: Date, end: Date, startStr: string, endStr: string, timeZone: string, view: ViewApi) => void;
    @Input() onEventsSetMethodID: (events: EventApi[]) => void;
    @Input() onWindowResizeMethodID: (view: ViewApi ) => void;
    
    // UNIMPLEMENTED
    @Input() onDayClickMethodID: (date: Date, event: MouseEvent, view: ViewApi, resource?: any) => void;
    @Input() onEventRightClickMethodID: (data?: any) => void;
    @Input() onEventResizeMethodID: (data?: any) => void;
    @Input() onEventDropMethodID: (data?: any) => void;

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
    TIMEZONE_DEFAULT = "local"


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
      // there are some callbacks that are not yet supported (or didn't find)
      // i.e. the events from 'Event Dragging & Resizing' section
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
        this.onDateClickMethodID(arg.date, arg.dateStr, arg.dayEl, arg.jsEvent, this.stringifyView(arg.view), arg.resource)
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
        this.onEventChangeMethodID(this.stringifyEvent(eventChange.event), this.stringifyEvent(eventChange.oldEvent), stringifyedRelatedEvents, eventChange.revert);
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

    addEventSource(source: EventSourceInput) {
      // TODO: stringify source before sending
      return this.calendarComponent.getApi().addEventSource(source);
    }

    refetchEvents() {
      return this.calendarComponent.getApi().refetchEvents();
    }

    refetchEventSource(eventSourceID: string) {
      this.calendarComponent.getApi().getEventSourceById(eventSourceID).refetch();
    }

    removeEventSource(eventSourceID: string) {
      this.calendarComponent.getApi().getEventSourceById(eventSourceID).remove();
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


    transformFunctionEventSource(eventSource: any) {

      return null;
    }

    stringifyEvent(event: EventApi) {

      return null;
    }

    stringifyView(view: ViewApi): ViewApi {
      
      return null;
    }

    stringifyResource(resource: any) {
      
      return null;
    }
}
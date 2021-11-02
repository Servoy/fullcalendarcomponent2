import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import { ArrayEventSource, EventObject, EventSource, FullCalendar, FunctionEventSource, GoogleCalendarEventSource, iCalendarEventSource, JSONEventSource } from './fullcalendar';
import interactionPlugin from '@fullcalendar/interaction'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import luxonPlugin from '@fullcalendar/luxon';
import momentPlugin from '@fullcalendar/moment';
import iCalendarPlugin from '@fullcalendar/icalendar';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { CommonModule } from '@angular/common';
import { ServoyPublicModule, SpecTypesService } from '@servoy/public';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  listPlugin,
  resourceTimelinePlugin,
  resourceTimeGridPlugin,
  luxonPlugin,
  momentPlugin,
  // googleCalendarPlugin
  // iCalendarPlugin
]);

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
  constructor( specTypesService: SpecTypesService ) {
    specTypesService.registerType('svy-fullcalendar.EventSource', EventSource);
    specTypesService.registerType('svy-fullcalendar.EventObject', EventObject);
    specTypesService.registerType('svy-fullcalendar.ArrayEventSource', ArrayEventSource);
    specTypesService.registerType('svy-fullcalendar.JSONEventSource', JSONEventSource);
    specTypesService.registerType('svy-fullcalendar.GoogleCalendarEventSource', GoogleCalendarEventSource);
    specTypesService.registerType('svy-fullcalendar.iCalendarEventSource', iCalendarEventSource);
    specTypesService.registerType('svy-fullcalendar.FunctionEventSource', FunctionEventSource);
  } 
}  
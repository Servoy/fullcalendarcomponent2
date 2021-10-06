import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import { FullCalendar } from './fullcalendar';
import interactionPlugin from '@fullcalendar/interaction'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import luxonPlugin from '@fullcalendar/luxon';
import momentPlugin from '@fullcalendar/moment';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  listPlugin,
  resourceTimelinePlugin,
  resourceTimeGridPlugin,
  luxonPlugin,
  momentPlugin
]);

@NgModule({
  declarations: [
    FullCalendar
  ],
  imports: [
    BrowserModule,
    FullCalendarModule 
  ],
  providers: [],
})
export class FullCalendarComponentModule { }
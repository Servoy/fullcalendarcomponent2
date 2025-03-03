/* The FullCalendar component is a Titanium Client wrapper around <a href="https://fullcalendar.io/">https://fullcalendar.io/</a>.<br/>
Note that some features require a premium FullCalendar license.<br/><br/>

See <a href="https://fullcalendar.io/docs">https://fullcalendar.io/docs</a> for more details.*/

var hasToDraw;

var renderOnCurrentView;

var calendarOptions;

var view;

var events;

var eventSources;

var arrayEventSources;

var functionEventSources;

var jsonEventSources;

var iCalendarEventSources;

var gcalEventSources;

var functionResources;

var themeSystem;

/**
 * The text expression to be shown as tooltip when hovering over the calendar events.<br/>Use double curly brackets to evaluate {{propertyName}} the event's properties.<br/>For non-standard properties, use {{extendedProps.yourPropertyName}}.<br/><b>Example</b><br/><pre text>
This is the event title:{{title}}. The event starts at: {{start}}. Description: {{extendedPropsdata.data.description}}
</pre>
 */
var tooltipExpression;



var handlers = {
    /**
     * <b>onSelectMethodID</b> will be called when a date/time selection is made.
     * 
     * @param {Date} start
     * @param {Date} end
     * @param {String} startStr
     * @param {String} endStr
     * @param {Boolean} allDay
     * @param {JSEvent} jsEvent
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     * @param {CustomType<svy-fullcalendar2.ResourceObject>} [resource]
     */
    onSelectMethodID: function() {},

    /**
     * <b>onUnselectMethodID</b> will be called when the current selection is cleared.
     * 
     * @param {JSEvent} jsEvent
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     */
    onUnselectMethodID: function() {},

    /**
     * <b>onDateClickMethodID</b> will be called when the user clicks on a date or a time.
     * 
     * @param {Date} date
     * @param {String} dateStr
     * @param {Object} dayEl
     * @param {JSEvent} jsEvent
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     * @param {CustomType<svy-fullcalendar2.ResourceObject>} [resource]
     */
    onDateClickMethodID: function() {},

    /**
     * <b>onDateClickMethodID</b> will be called when the user double clicks on a date or a time.
     * 
     * @param {Date} date
     * @param {String} dateStr
     * @param {Object} dayEl
     * @param {JSEvent} jsEvent
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     * @param {CustomType<svy-fullcalendar2.ResourceObject>} [resource]
     */
    onDateDblClickMethodID: function() {},

    /**
     * <b>onNavLinkDayClickMethodID</b> when navLinks setting is true, will be called when the user clicks on a day. onDateClickMethodID will not be called in this scenario.
     * 
     * @param {Date} date
     * @param {JSEvent} jsEvent
     */
    onNavLinkDayClickMethodID: function() {},

    /**
     * <b>onNavLinkWeekClickMethodID</b> when navLinks setting is true, will be called when the user clicks on a week.
     * 
     * @param {Date} date
     * @param {JSEvent} jsEvent
     */
    onNavLinkWeekClickMethodID: function() {},

    /**
     * <b>onEventClickMethodID</b> will be called when the user clicks an event.
     * 
     * @param {CustomType<svy-fullcalendar2.EventObject>} event
     * @param {JSEvent} jsEvent
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     */
    onEventClickMethodID: function() {},

    /**
     * <b>onEventDblClickMethodID</b> will be called when the user dbl click an event.
     * 
     * @param {CustomType<svy-fullcalendar2.EventObject>} event
     * @param {JSEvent} jsEvent
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     */
    onEventDblClickMethodID: function() {},

    /**
     * <b>onEventAddMethodID</b> will be called after an event has been added to the calendar.
     * 
     * @param {CustomType<svy-fullcalendar2.EventObject>} event
     * @param {Array<CustomType<svy-fullcalendar2.EventObject>>} relatedEvents
     * @returns {Boolean} if it returns false, the event add action will be reverted, otherwise (true) the action is considered valid
     */
    onEventAddMethodID: function() {},

    /**
     * <b>onEventRemoveMethodID</b> will be called after an event has been removed from the calendar.
     * 
     * @param {CustomType<svy-fullcalendar2.EventObject>} event
     * @param {Array<CustomType<svy-fullcalendar2.EventObject>>} relatedEvents
     * @returns {Boolean} if it returns false, the event remove action will be reverted, otherwise (true) the action is considered valid
     */
    onEventRemoveMethodID: function() {},

    /**
     * <b>onEventChangeMethodID</b> will be called after an event has been modified in some way.
     * 
     * @param {CustomType<svy-fullcalendar2.EventObject>} event
     * @param {CustomType<svy-fullcalendar2.EventObject>} oldEvent
     * @param {Array<CustomType<svy-fullcalendar2.EventObject>>} relatedEvents
     * @returns {Boolean} if it returns false, the event change action will be reverted, otherwise (true) the action is considered valid
     */
    onEventChangeMethodID: function() {},

    /**
     * <b>onEventsSetMethodID</b> will be called after event data is initialized OR changed in any way.
     * 
     * @param {Array<CustomType<svy-fullcalendar2.EventObject>>} events
     */
    onEventsSetMethodID: function() {},

    /**
     * <b>onWindowResizeMethodID</b> will be called after the calendar’s dimensions have been changed due to the browser window being resized.
     * 
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     */
    onWindowResizeMethodID: function() {},

    /**
     * <b>onViewDidMountMethodID</b> will be called right after the view has been added to the DOM.
     * 
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     */
    onViewDidMountMethodID: function() {},

    /**
     * <b>onViewWillUnmountMethodID</b> will be called right before the view will be removed from the DOM.
     * 
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     */
    onViewWillUnmountMethodID: function() {},

    /**
     * @param {CustomType<svy-fullcalendar2.EventObject>} event
     * @param {JSEvent} jsEvent
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     */
    onEventRightClickMethodID: function() {},

    /**
     * <b>onEventResizeMethodID</b> will be called when resizing stops and the event has changed in duration.
     * 
     * @param {CustomType<svy-fullcalendar2.EventObject>} event
     * @param {Array<CustomType<svy-fullcalendar2.EventObject>>} relatedEvents
     * @param {CustomType<svy-fullcalendar2.EventObject>} oldEvent
     * @param {Number} endDateDelta
     * @param {Number} startDateDelta
     * @param {JSEvent} jsEvent
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     * @returns {Boolean} if it returns false, the event resize action will be reverted, otherwise (true) the action is considered valid
     */
    onEventResizeMethodID: function() {},

    /**
     * <b>onEventDropMethodID</b> will be called when dragging stops and the event has moved to a different day/time.
     * 
     * @param {CustomType<svy-fullcalendar2.EventObject>} event
     * @param {Array<CustomType<svy-fullcalendar2.EventObject>>} relatedEvents
     * @param {CustomType<svy-fullcalendar2.EventObject>} oldEvent
     * @param {CustomType<svy-fullcalendar2.ResourceObject>} oldResource
     * @param {CustomType<svy-fullcalendar2.ResourceObject>} newResource
     * @param {Number} delta
     * @param {JSEvent} jsEvent
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     * @returns {Boolean} if it returns false, the event drop action will be reverted, otherwise (true) the action is considered valid
     */
    onEventDropMethodID: function() {},

    /**
     * <b>onDropMethodID</b> will be called when an external draggable element or an event from another calendar has been dropped onto the calendar.
     * 
     * @param {Boolean} allDay
     * @param {Date} date
     * @param {String} dateStr
     * @param {Object} draggedElement
     * @param {JSEvent} jsEvent
     * @param {CustomType<svy-fullcalendar2.ResourceObject>} resource
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     */
    onDropMethodID: function() {},

    /**
     * <b>onEventDragStartMethodID</b> will be called when event dragging begins.
     * 
     * @param {CustomType<svy-fullcalendar2.EventObject>} event
     * @param {JSEvent} jsEvent
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     */
    onEventDragStartMethodID: function() {},

    /**
     * <b>onEventResizeStartMethodID</b> will be called when event resizing begins.
     * 
     * @param {CustomType<svy-fullcalendar2.EventObject>} event
     * @param {JSEvent} jsEvent
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     */
    onEventResizeStartMethodID: function() {},

    /**
     * <b>onEventDragStopMethodID</b> will be called when event dragging stops.
     * 
     * @param {CustomType<svy-fullcalendar2.EventObject>} event
     * @param {JSEvent} jsEvent
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     */
    onEventDragStopMethodID: function() {},

    /**
     * <b>onEventResizeStopMethodID</b> will be called when event resizing stops.
     * 
     * @param {CustomType<svy-fullcalendar2.EventObject>} event
     * @param {JSEvent} jsEvent
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     */
    onEventResizeStopMethodID: function() {},

    /**
     * <b>onEventMouseEnterMethodID</b> will be called when the user mouses over an event. Similar to the native mouseenter.
     * 
     * @param {Object} element
     * @param {CustomType<svy-fullcalendar2.EventObject>} eventObject
     * @param {JSEvent} jsEvent
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     */
    onEventMouseEnterMethodID: function() {},

    /**
     * <b>onEventMouseLeaveMethodID</b> will be called when the user mouses out of an event. Similar to the native mouseleave.
     * 
     * @param {Object} element
     * @param {CustomType<svy-fullcalendar2.EventObject>} event
     * @param {JSEvent} jsEvent
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     */
    onEventMouseLeaveMethodID: function() {},

    /**
     * <b>onMouseEnter</b> will be called when the user mouses over an event. Similar to the native mouseenter.
     * 
     * @param {CustomType<svy-fullcalendar2.EventObject>} eventObject
     * @param {JSEvent} jsEvent
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     */
    onMouseEnter: function() {},

    /**
     * <b>onMouseLeave</b> will be called when the user mouses out of an event. Similar to the native mouseleave.
     * 
     * @param {CustomType<svy-fullcalendar2.EventObject>} eventObject
     * @param {JSEvent} jsEvent
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     */
    onMouseLeave: function() {},

    /**
     * <b>onLoadingMethodID</b> will be called when event or resource fetching starts/stops.
     * 
     * @param {Boolean} isLoading
     */
    onLoadingMethodID: function() {},

    /**
     * <b>onDatesSetMethodID</b> will be called after the calendar’s date range has been initially set or changed in some way and the DOM has been updated.
     * 
     * @param {Date} start
     * @param {Date} end
     * @param {String} startStr
     * @param {String} endStr
     * @param {String} timeZone
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     */
    onDatesSetMethodID: function() {},

    /**
     * <b>onEventReceiveMethodID</b> will be called when an external draggable element with associated event data was dropped onto the calendar. Or an event from another calendar.
     * 
     * @param {CustomType<svy-fullcalendar2.EventObject>} event
     * @param {Array<CustomType<svy-fullcalendar2.EventObject>>} relatedEvents
     * @param {Object} draggedElement
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     * @returns {Boolean} if it returns false, the event receive action will be reverted, otherwise (true) the action is considered valid
     */
    onEventReceiveMethodID: function() {},

    /**
     * <b>onEventLeaveMethodID</b> will be called when on a calendar when one if its events is about to be dropped onto another calendar.
     * 
     * @param {CustomType<svy-fullcalendar2.EventObject>} event
     * @param {Array<CustomType<svy-fullcalendar2.EventObject>>} relatedEvents
     * @param {Object} draggedElement
     * @param {CustomType<svy-fullcalendar2.ViewType>} view
     * @returns {Boolean} if it returns false, the event leave action will be reverted, otherwise (true) the action is considered valid
     */
    onEventLeaveMethodID: function() {},

    /**
     * <b>onResourceAddMethodID</b> will be called after a resource has been added to the calendar.
     * 
     * @param {CustomType<svy-fullcalendar2.ResourceObject>} resource
     * @returns {Boolean} if it returns false, the resource add action will be reverted, otherwise (true) the action is considered valid
     */
    onResourceAddMethodID: function() {},

    /**
     * <b>onResourceChangeMethodID</b> will be called after a resource has been modified in some way.
     * 
     * @param {CustomType<svy-fullcalendar2.ResourceObject>} oldResource
     * @param {Object} newResource
     * @returns {Boolean} if it returns false, the resource change action will be reverted, otherwise (true) the action is considered valid
     */
    onResourceChangeMethodID: function() {},

    /**
     * <b>onResourceRemoveMethodID</b> will be called after a resource has been removed from the calendar.
     * 
     * @param {CustomType<svy-fullcalendar2.ResourceObject>} resource
     * @returns {Boolean} if it returns false, the resource remove action will be reverted, otherwise (true) the action is considered valid
     */
    onResourceRemoveMethodID: function() {},

    /**
     * <b>onResourcesSetMethodID</b> will be called after resource data is initialized OR changed in any way.
     * 
     * @param {Array<CustomType<svy-fullcalendar2.ResourceObject>>} resources
     */
    onResourcesSetMethodID: function() {}
};


/**
 * Getter for all calendar events.
 * 
 * @return {Array<CustomType<svy-fullcalendar2.EventObject>>} An array containing all event objects currently displayed in the calendar.
 */
 function getCalendarEvents() {}

/**
 * Gets a calendar event using a given ID.
 * 
 * @param {String} id The unique identifier of the event to retrieve.
 * 
 * @return {CustomType<svy-fullcalendar2.EventObject>} The event object corresponding to the provided ID.
 */
  function getEventById() {}

 /**
 * Adds an event to calendar.
 * 
 * @param {CustomType<svy-fullcalendar2.EventParsing>} event The event object to be added to the calendar.
 * @param {Object} [source] The source object specifying the origin of the event (e.g., a specific event source).
 * 
 * @return {CustomType<svy-fullcalendar2.EventObject>} The newly added event object.

 */
 function addEvent() {}

 /**
 * Modifies any of the non-date-related properties of an event.
 * 
 * @param {String} eventID The unique identifier of the event to modify.
 * @param {String} name The name of the property to modify (e.g., 'title' or 'color').
 * @param {Object} value The new value to assign to the specified property.
 */
 function setPropEvent() {}

 /**
 * Modifies a single property in an events' extendedProps hash.
 * 
 * @param {String} eventID The unique identifier of the event to modify.
 * @param {String} name The name of the extended property to modify.
 * @param {Object} value The new value to assign to the specified extended property.
 */
  function setExtendedPropEvent() {}

 /**
 * Sets an event’s start date.
 * 
 * @param {String} eventID The unique identifier of the event to modify.
 * @param {Object} date The new start date for the event.
 * @param {Object} [options] Optional settings for configuring how the start date is set.
 */
  function setStart() {}

 /**
 * Sets an event’s end date.
 * 
 * @param {String} eventID The unique identifier of the event to modify.
 * @param {Object} date The new end date for the event.
 */
  function setEnd() {}

/**
 * Sets an event’s start date, end date, and allDay properties at the same time.
 * 
 * @param {String} eventID The unique identifier of the event to modify.
 * @param {Object} start The new start date for the event.
 * @param {Object} end The new end date for the event.
 * @param {Object} [options] Optional settings for configuring how the dates are set.
 */
 function setDates() {}

/**
 * Sets whether an event is considered all-day.
 * 
 * @param {String} eventID The unique identifier of the event to modify.
 * @param {Boolean} allDay Whether the event should be marked as all-day.
 * @param {Object} [settings] Optional settings for configuring the all-day property.
 */
 function setAllDay() {}

/**
 * Will move an event’s start date by a specific period of time.
 * 
 * @param {String} eventID The unique identifier of the event to modify.
 * @param {Object} delta The duration to move the start date by (e.g., { days: 1 }).
 */
 function moveStart() {}

/**
 * Will move an event’s end date by a specific period of time.
 * 
 * @param {String} eventID The unique identifier of the event to modify.
 * @param {Object} delta The duration to move the end date by (e.g., { days: 1 }).
 */
 function moveEnd() {}

/**
 * Will move an event’s start and end dates by a specific period of time.
 * 
 * @param {String} eventID The unique identifier of the event to modify.
 * @param {Object} delta The duration to move the start and end dates by (e.g., { days: 1 }).
 */
 function moveDates() {}

/**
 * Formats an event’s dates into a string.
 * 
 * Accepts a date formatter.
 * 
 * If the event doesn’t have an end, then the start will be formatted alone.
 * 
 * @param {String} eventID The unique identifier of the event.
 * @param {Object} formatConfig Configuration for formatting the dates (e.g., date format, locale).
 */
 function formatRangeEvent() {}

/**
 * Removes an event from the calendar.
 * 
 * @param {String} eventID The unique identifier of the event to remove.
 */
 function removeEvent() {}

/**
 * Gets the Resources associated with the given event.
 * 
 * @param {String} eventID The unique identifier of the event.
 * @return {Array<CustomType<svy-fullcalendar2.ResourceObject>>} An array of resources associated with the event.
 */
 function getEventResources() {}

/**
 * Sets the Resources associated with the given event.
 * 
 * @param {String} eventID The unique identifier of the event.
 * @param {Array<CustomType<svy-fullcalendar2.ResourceObject>>} resources An array of resources to associate with the event.
 */
 function setEventResources() {}

/**
 * Serializes an Event API Object to a plain object.
 * 
 * @param {String} eventID The unique identifier of the event.
 * @param {Object} [settings] Optional settings for customizing the serialization process.
 */
 function toPlainObjectEvent() {}

/**
 * Retrieves all Event Source Objects.
 * 
 * @return {Array<CustomType<svy-fullcalendar2.EventSource>>} An array of all event source objects in the calendar.
 */
 function getEventSources() {}

/**
 * Retrieves a specific Event Source Object.
 * 
 * @param {String} id The unique identifier of the event source to retrieve.
 * @return {CustomType<svy-fullcalendar2.EventSource>} The event source object corresponding to the provided ID.
 */
 function getEventSourceById() {}

/**
 * Dynamically adds an event source.
 * 
 * @param {CustomType<svy-fullcalendar2.FunctionEventSource>} source The event source object to add to the calendar.
 */
 function addEventSource() {}

/**
 * Refetches events from all sources and rerenders them on the screen.
 */
 function refetchEvents() {}

/**
 * Refetches events from all sources and rerenders them on the screen.
 * 
 * @param {String} eventSourceID The unique identifier of the event source to refetch.
 */
 function refetchEventSource() {}

 /**
 * Removes all events associated with this source and prevents it from being fetched again.
 * 
 * @param {String} eventSourceID The unique identifier of the event source to remove.
 */
  function removeEventSource() {}

 /**
 * Programatically scroll the current view to the given time.
 * 
 * @param {Object} durationInput The duration to scroll to (e.g., '09:00:00').
 */
  function scrollToTime() {}

 /**
 * A method for programmatically selecting a period of time.
 * 
 * @param {Object} dateOrObj The start date or object representing the range to select.
 * @param {Object} [endDate] Optional end date for the selection range.
 */
  function select() {}

 /**
 * A method for programmatically clearing the current selection.
 */
  function unselect() {}

 /**
 * Gets the View Object for the current view.
 * 
 * @return {CustomType<svy-fullcalendar2.ViewType>} The view object representing the currently active calendar view (e.g., month, week, or day view).
 */
  function getView() {}

 /**
 * Gets the View Object for the current view.
 * 
 * @param {String} viewName The name of the view to switch to (e.g., 'dayGridMonth', 'timeGridWeek').
 * @param {Object} [dateOrRange] Optional date or date range to navigate to within the specified view.
 */
  function changeView() {}

 /**
 * Moves the calendar one step forward (by a month or week for example).
 * 
 * If the calendar is in dayGridMonth view, will move the calendar forward one month.
 * If the calendar is in dayGridWeek or timeGridWeek, will move the calendar forward one week.
 * If the calendar is in dayGridDay or timeGridDay, will move the calendar forward one day.
 */
  function next() {}

 /**
 * Moves the calendar one step back (by a month or week for example).
 * 
 * If the calendar is in dayGridMonth view, will move the calendar back one month.
 * If the calendar is in dayGridWeek or timeGridWeek, will move the calendar back one week.
 * If the calendar is in dayGridDay or timeGridDay, will move the calendar back one day.
 */
  function prev() {}

 /**
 * Moves the calendar back one year.
 */
  function prevYear() {}

 /**
 * Moves the calendar forward one year.
 */
  function nextYear() {}

 /**
 * Moves the calendar to the current date.
 */
  function today() {}

 /**
 * Returns a Date for the current date of the calendar.
 * 
 * @return {Date} The current date displayed by the calendar.
 */
  function getDate() {}

 /**
 * Moves the calendar to an arbitrary date.
 * 
 * @param {Date} date The target date to move the calendar to.
 */
  function gotoDate() {}

 /**
 * Moves the calendar forward/backward an arbitrary amount of time.
 * 
 * @param {Object} delta The time period to increment or decrement (e.g., { days: 7 }).
 */
  function incrementDate() {}

 /**
 * Causes the resource data to be fetched and freshly rerendered.
 */
  function refetchResources() {}

 /**
 * A method that retrieves only top-level Resources.
 * 
 * @return {Array<CustomType<svy-fullcalendar2.ResourceObject>>} An array of top-level resource objects.
 */
  function getTopLevelResources() {}

 /**
 * A method that retrieves all Resources, including children, as a single flat list.
 * 
 * @return {Array<CustomType<svy-fullcalendar2.ResourceObject>>} An array of all resource objects, including child resources.
 */
  function getResources() {}

 /**
 * A method that retrieves a specific Resource Object in memory.
 * 
 * @param {Object} resourceId The unique identifier of the resource to retrieve.
 * @return {CustomType<svy-fullcalendar2.ResourceObject>} The resource object corresponding to the provided ID.
 */
  function getResourceById() {}

 /**
 * Allows programmatic rendering of a new resource on the calendar after the initial set of resources has already been displayed.
 * 
 * @param {CustomType<svy-fullcalendar2.ResourceObject>} resource The resource object to be added.
 * @param {Boolean} [scrollTo] Whether to scroll to the newly added resource.
 */
  function addResource() {}

 /**
 * Programmatically removes a resource from the calendar.
 * 
 * @param {String} id The unique identifier of the resource to remove.
 */
  function removeResource() {}

 /**
 * Returns the parent Resource of a child resource.
 * 
 * @param {String} id The unique identifier of the child resource.
 * @return {CustomType<svy-fullcalendar2.ResourceObject>} The parent resource object.
 */
  function getParent() {}

 /**
 * Returns a list of a resource’s child resources.
 * 
 * @param {String} id The unique identifier of the parent resource.
 * @return {Array<CustomType<svy-fullcalendar2.ResourceObject>>} An array of child resource objects.
 */
  function getChildren() {}

 /**
 * Gets the Resources associated with the given event.
 * 
 * @param {String} id The unique identifier of the event.
 * @return {Array<CustomType<svy-fullcalendar2.ResourceObject>>} An array of resources associated with the specified event.
 */
  function getResourceEvents() {}

 /**
 * Modifies any of the properties of a Resource Object.
 * 
 * @param {String} id The unique identifier of the resource to modify.
 * @param {String} name The name of the property to modify.
 * @param {Object} value The new value to assign to the property.
 */
  function setPropResource() {}

 /**
 * Modifies a single property in an Resource Object’s extendedProps hash.
 * 
 * @param {String} id The unique identifier of the resource to modify.
 * @param {String} name The name of the extended property to modify.
 * @param {Object} value The new value to assign to the extended property.
 */
  function setExtendedPropResource() {}

 /**
 * Serializes a Resource API Object to a plain object.
 * 
 * @param {String} id The unique identifier of the resource.
 * @param {Object} [settings] Optional settings for customizing the serialization process.
 */
  function toPlainObjectResource() {}

 /**
 * Will initially render a calendar, or if it is already rendered, will rerender it.
 */
  function render() {}

 /**
 * Restores the container element to the state before FullCalendar was initialized.
 */
  function destroy() {}

 /**
 * A way to group operations that cause rerenders.
 * 
 * @param {Function} func The function containing the operations to group together.
 */
  function batchRendering() {}

 /**
 * Formats a date into an ISO8601 string. Outputs a UTC offset appropriate to the calendar it’s called on.
 * 
 * @param {Object} date The date to format.
 * @param {Boolean} [omitTime] Whether to omit the time portion from the formatted string.
 * @return {String} The formatted ISO8601 date string.
 */
  function formatIso() {}

 /**
 * Formats two dates, a start and an end, into a string. 
 * 
 * settings is an object that holds any of the date format config options. It also accepts the following additional properties:
 * separator — what will be inserted between the two dates. a ' - ' by default
 * isExclusive — if true, the given end date will be considered the exclusive end of the range, meaning date just before the end will be rendered instead. Useful if you need to format an exclusive-end whole-day range.
 * 
 * @param {Object} start The start date of the range to format.
 * @param {Object} end The end date of the range to format.
 * @param {Object} settings An object containing formatting settings and options.
 * @return {String} The formatted date range string.
 */
  function formatRangeCalendar() {}

 /**
 * A method that formats a date into a string. It inherits the locale and time zone settings of the calendar it’s called on.
 * 
 * @param {Object} date The date object to be formatted.
 * @param {Object} settings An object containing formatting settings, such as locale and time zone preferences.
 * @return {String} The formatted date string based on the provided settings.
 */
  function formatDate() {}

 /**
 * Sets an option for the calendar.
 * 
 * @param {String} name The name of the option to set (e.g., 'theme', 'locale', or 'headerToolbar').
 * @param {Object} value The value to assign to the specified option.
 */
function setOption() {}

 /**
 * Gets the value of an option from the calendar.
 * 
 * @param {String} name The name of the option to retrieve (e.g., 'theme', 'locale', or 'headerToolbar').
 * @return {Object} The current value of the specified option.
 */
function getOption() {}

/**
 * Initializes the FullCalendar component with the specified configuration options.
 * If the calendar has already been initialized and any configuration options have changed, 
 * the calendar will be destroyed and re-rendered with the updated options.
 *
 * @param {CustomType<svy-fullcalendar2.FullCalendarOptions>} calendarOptions 
 *                The configuration options for the FullCalendar component.
 *                These options include properties for event sources, calendar behavior, styling, and views. 
 *                Refer to the FullCalendar documentation for the complete list of options.
 *  @param {Boolean} [renderOnCurrentView]
 *                Indicates whether the calendar should re-render in the current view when the configuration is updated. 
 *                If false, the calendar will reset to the default view.
 *
 * @example <pre>  @type {svy-fullcalendar.FullCalendarOptions}
 * var options = {
 *       eventSources: [ {events: [{ title: "lunch event", start: new Date() }]}],
 *		selectable: true,
 *		editable: true,
 *		initialView: 'dayGridMonth',
 *  }
 *  elements.fullcalendarElementName.fullCalendar(options);
 */
function fullCalendar() {
}

/**
 * Retrieves the current configuration options for the FullCalendar component.
 * These options define the behavior, appearance, and data sources of the calendar.
 *
 * @example
 * var options = elements.fullcalendarElementName.getFullCalendarOptions();
 * // Example usage: Update a specific calendar option and reinitialize the calendar
 * options.scrollTime = '09:00:00';
 * elements.fullcalendarElementName.fullCalendar(options, true);
 *
 * @return {CustomType<svy-fullcalendar2.FullCalendarOptions>} The current configuration options for the FullCalendar component.
 * If the options are not set, it returns `null`.
 */
function getFullCalendarOptions() {
}

/**
 * Updates a specific configuration option for the FullCalendar component and forces the calendar to re-render.
 * This method allows you to dynamically adjust the calendar's behavior or appearance without requiring a full reinitialization.
 *
 * @example
 * // Update the scroll time to start the calendar at 1 PM
 * elements.fullcalendarElementName.updateFullCalendar('scrollTime', '13:00:00');
 *
 * @param {string} option The name of the configuration option to update (e.g., 'scrollTime', 'editable').
 * @param {Object} value The new value for the specified configuration option.
 *
 * @returns {void}
 */
function updateFullCalendar(option, value) {
}
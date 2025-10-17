/*
 * The FullCalendar component is a Titanium Client wrapper around <a href="https://fullcalendar.io/">https://fullcalendar.io/</a>.<br/>
 * Note that some features require a premium FullCalendar license.<br/><br/>
 *
 * See <a href="https://fullcalendar.io/docs">https://fullcalendar.io/docs</a> for more details.
 */

/**
 * CSS class to be applied to the calendar container element.
 */
var styleClass;

/**
 * Determines which theme system to use for styling the calendar.
 */
var themeSystem;

/**
 * The text expression to be shown as tooltip when hovering over the calendar events.
 */
var tooltipExpression;


var handlers = {
    /**
     * <b>onSelectMethodID</b> will be called when a date/time selection is made.
     *
     * @param {Date} start The start date/time of the selection.
     * @param {Date} end The end date/time of the selection.
     * @param {String} startStr The string representation of the start date/time.
     * @param {String} endStr The string representation of the end date/time.
     * @param {Boolean} allDay Indicates if the selection is for an all-day event.
     * @param {JSEvent} jsEvent The event object associated with the selection.
     * @param {CustomType<svy-fullcalendar2.ViewType>} view The current calendar view.
     * @param {CustomType<svy-fullcalendar2.ResourceObject>} [resource] Optional resource associated with the selection.
     */
    onSelectMethodID: function() {},

    /**
     * <b>onUnselectMethodID</b> will be called when the current selection is cleared.
     *
     * @param {JSEvent} jsEvent The event object associated with the unselect action.
     * @param {CustomType<svy-fullcalendar2.ViewType>} view The current calendar view.
     */
    onUnselectMethodID: function() {},

    /**
     * <b>onDateClickMethodID</b> will be called when the user clicks on a date or a time.
     *
     * @param {Date} date The clicked date.
     * @param {String} dateStr The string representation of the clicked date.
     * @param {Object} dayEl The DOM element representing the clicked day.
     * @param {JSEvent} jsEvent The event object associated with the click.
     * @param {CustomType<svy-fullcalendar2.ViewType>} view The current calendar view.
     * @param {CustomType<svy-fullcalendar2.ResourceObject>} [resource] Optional resource associated with the clicked date.
     */
    onDateClickMethodID: function() {},

    /**
     * <b>onDateClickMethodID</b> will be called when the user double clicks on a date or a time.
     *
     * @param {Date} date The double-clicked date.
     * @param {String} dateStr The string representation of the double-clicked date.
     * @param {Object} dayEl The DOM element representing the clicked day.
     * @param {JSEvent} jsEvent The event object associated with the double-click.
     * @param {CustomType<svy-fullcalendar2.ViewType>} view The current calendar view.
     * @param {CustomType<svy-fullcalendar2.ResourceObject>} [resource] Optional resource associated with the clicked date.
     */
    onDateDblClickMethodID: function() {},

    /**
     * <b>onNavLinkDayClickMethodID</b> when navLinks setting is true, will be called when the user clicks on a day. onDateClickMethodID will not be called in this scenario.
     *
     * @param {Date} date The clicked date.
     * @param {JSEvent} jsEvent The event object associated with the click.
     */
    onNavLinkDayClickMethodID: function() {},

    /**
     * <b>onNavLinkWeekClickMethodID</b> when navLinks setting is true, will be called when the user clicks on a week.
     *
     * @param {Date} date The clicked week date.
     * @param {JSEvent} jsEvent The event object associated with the click.
     */
    onNavLinkWeekClickMethodID: function() {},

    /**
     * <b>onEventClickMethodID</b> will be called when the user clicks an event.
     *
     * @param {CustomType<svy-fullcalendar2.EventObject>} event The clicked event.
     * @param {JSEvent} jsEvent The event object associated with the click.
     * @param {CustomType<svy-fullcalendar2.ViewType>} view The current calendar view.
     */
    onEventClickMethodID: function() {},

    /**
     * <b>onEventDblClickMethodID</b> will be called when the user dbl click an event.
     *
     * @param {CustomType<svy-fullcalendar2.EventObject>} event The double-clicked event.
     * @param {JSEvent} jsEvent The event object associated with the double-click.
     * @param {CustomType<svy-fullcalendar2.ViewType>} view The current calendar view.
     */
    onEventDblClickMethodID: function() {},

    /**
     * <b>onEventAddMethodID</b> will be called after an event has been added to the calendar.
     *
     * @param {CustomType<svy-fullcalendar2.EventObject>} event The added event.
     * @param {Array<CustomType<svy-fullcalendar2.EventObject>>} relatedEvents Array of related events.
     *
     * @return {Boolean} if it returns false, the event add action will be reverted, otherwise (true) the action is considered valid
     */
    onEventAddMethodID: function() {},

    /**
     * <b>onEventRemoveMethodID</b> will be called after an event has been removed from the calendar.
     *
     * @param {CustomType<svy-fullcalendar2.EventObject>} event The removed event.
     * @param {Array<CustomType<svy-fullcalendar2.EventObject>>} relatedEvents Array of related events.
     *
     * @return {Boolean} if it returns false, the event remove action will be reverted, otherwise (true) the action is considered valid
     */
    onEventRemoveMethodID: function() {},

    /**
     * <b>onEventChangeMethodID</b> will be called after an event has been modified in some way.
     *
     * @param {CustomType<svy-fullcalendar2.EventObject>} event The modified event.
     * @param {CustomType<svy-fullcalendar2.EventObject>} oldEvent The event state prior to modification.
     * @param {Array<CustomType<svy-fullcalendar2.EventObject>>} relatedEvents Array of related events.
     *
     * @return {Boolean} If it returns false, the event change action will be reverted, otherwise (true) the action is considered valid
     */
    onEventChangeMethodID: function() {},

    /**
     * <b>onEventsSetMethodID</b> will be called after event data is initialized OR changed in any way.
     *
    * @param {Array<CustomType<svy-fullcalendar2.EventObject>>} events Array of current events.
     */
    onEventsSetMethodID: function() {},

    /**
     * <b>onWindowResizeMethodID</b> will be called after the calendar’s dimensions have been changed due to the browser window being resized.
     *
     * @param {CustomType<svy-fullcalendar2.ViewType>} view The current calendar view.
 */
    onWindowResizeMethodID: function() {},

    /**
     * <b>onViewDidMountMethodID</b> will be called right after the view has been added to the DOM.
     *
     * @param {CustomType<svy-fullcalendar2.ViewType>} view The current calendar view.
     */
    onViewDidMountMethodID: function() {},

    /**
     * <b>onViewWillUnmountMethodID</b> will be called right before the view will be removed from the DOM.
     *
     * @param {CustomType<svy-fullcalendar2.ViewType>} view The current calendar view.
     */
    onViewWillUnmountMethodID: function() {},

    /**
     * <b>onEventRightClickMethodID</b> will be called when the user right-clicks an event.
     *
     * @param {CustomType<svy-fullcalendar2.EventObject>} event The event object that was right-clicked.
     * @param {JSEvent} jsEvent The JavaScript event object associated with the right-click.
     * @param {CustomType<svy-fullcalendar2.ViewType>} view The current view object of the calendar.
     */
    onEventRightClickMethodID: function() {},

    /**
     * <b>onEventResizeMethodID</b> will be called when resizing stops and the event has changed in duration.
     *
     * @param {CustomType<svy-fullcalendar2.EventObject>} event The resized event.
     * @param {Array<CustomType<svy-fullcalendar2.EventObject>>} relatedEvents Array of related events.
     * @param {CustomType<svy-fullcalendar2.EventObject>} oldEvent The event state before resizing.
     * @param {Number} endDateDelta The change in the event's end date.
     * @param {Number} startDateDelta The change in the event's start date.
     * @param {JSEvent} jsEvent The event object associated with the resize.
     * @param {CustomType<svy-fullcalendar2.ViewType>} view The current calendar view.
     *
     * @return {Boolean} if it returns false, the event resize action will be reverted, otherwise (true) the action is considered valid
     */
    onEventResizeMethodID: function() {},

    /**
     * <b>onEventDropMethodID</b> will be called when dragging stops and the event has moved to a different day/time.
     *
     * @param {CustomType<svy-fullcalendar2.EventObject>} event The event that was dropped.
     * @param {Array<CustomType<svy-fullcalendar2.EventObject>>} relatedEvents Array of related events.
     * @param {CustomType<svy-fullcalendar2.EventObject>} oldEvent The event state before the drop.
     * @param {CustomType<svy-fullcalendar2.ResourceObject>} oldResource The resource before the drop.
     * @param {CustomType<svy-fullcalendar2.ResourceObject>} newResource The resource after the drop.
     * @param {Number} delta The time change due to the drop.
     * @param {JSEvent} jsEvent The event object associated with the drop.
     * @param {CustomType<svy-fullcalendar2.ViewType>} view The current calendar view.
     *
     * @return {Boolean} if it returns false, the event drop action will be reverted, otherwise (true) the action is considered valid
     */
    onEventDropMethodID: function() {},

    /**
     * <b>onDropMethodID</b> will be called when an external draggable element or an event from another calendar has been dropped onto the calendar.
     *
     * @param {Boolean} allDay Indicates if the drop is for an all-day event.
     * @param {Date} date The date where the drop occurred.
     * @param {String} dateStr The string representation of the drop date.
     * @param {Object} draggedElement The DOM element that was dragged.
     * @param {JSEvent} jsEvent The event object associated with the drop.
     * @param {CustomType<svy-fullcalendar2.ResourceObject>} resource Optional resource associated with the drop.
     * @param {CustomType<svy-fullcalendar2.ViewType>} view The current calendar view.
     */
    onDropMethodID: function() {},

    /**
     * <b>onEventDragStartMethodID</b> will be called when event dragging begins.
     *
     * @param {CustomType<svy-fullcalendar2.EventObject>} event The event being dragged.
     * @param {JSEvent} jsEvent The event object associated with the drag start.
     * @param {CustomType<svy-fullcalendar2.ViewType>} view The current calendar view.
     */
    onEventDragStartMethodID: function() {},

    /**
     * <b>onEventResizeStartMethodID</b> will be called when event resizing begins.
     *
     * @param {CustomType<svy-fullcalendar2.EventObject>} event The event being resized.
     * @param {JSEvent} jsEvent The event object associated with the resize start.
     * @param {CustomType<svy-fullcalendar2.ViewType>} view The current calendar view.
     */
    onEventResizeStartMethodID: function() {},

    /**
     * <b>onEventDragStopMethodID</b> will be called when event dragging stops.
     *
     * @param {CustomType<svy-fullcalendar2.EventObject>} event The event that was dragged.
     * @param {JSEvent} jsEvent The event object associated with the drag stop.
     * @param {CustomType<svy-fullcalendar2.ViewType>} view The current calendar view.
     */
    onEventDragStopMethodID: function() {},

    /**
     * <b>onEventResizeStopMethodID</b> will be called when event resizing stops.
     *
     * @param {CustomType<svy-fullcalendar2.EventObject>} event The event that was resized.
     * @param {JSEvent} jsEvent The event object associated with the resize stop.
     * @param {CustomType<svy-fullcalendar2.ViewType>} view The current calendar view.
     */
    onEventResizeStopMethodID: function() {},

    /**
     * <b>onMouseEnter</b> will be called when the user mouses over an event. Similar to the native mouseenter.
     *
     * @param {CustomType<svy-fullcalendar2.EventObject>} eventObject The event object being hovered.
     * @param {JSEvent} jsEvent The event object associated with the hover.
     * @param {CustomType<svy-fullcalendar2.ViewType>} view The current calendar view.
     */
    onMouseEnter: function() {},

    /**
     * <b>onMouseLeave</b> will be called when the user mouses out of an event. Similar to the native mouseleave.
     *
     * @param {CustomType<svy-fullcalendar2.EventObject>} eventObject The event object being hovered.
     * @param {JSEvent} jsEvent The event object associated with the hover.
     * @param {CustomType<svy-fullcalendar2.ViewType>} view The current calendar view.
     */
    onMouseLeave: function() {},

    /**
     * <b>onLoadingMethodID</b> will be called when event or resource fetching starts/stops.
     *
     * @param {Boolean} isLoading Indicates if the calendar is currently loading data.
     */
    onLoadingMethodID: function() {},

    /**
     * <b>onDatesSetMethodID</b> will be called after the calendar’s date range has been initially set or changed in some way and the DOM has been updated.
     *
     * @param {Date} start The start date of the current view.
     * @param {Date} end The end date of the current view.
     * @param {String} startStr The string representation of the start date.
     * @param {String} endStr The string representation of the end date.
     * @param {String} timeZone The time zone used by the calendar.
     * @param {CustomType<svy-fullcalendar2.ViewType>} view The current calendar view.
     */
    onDatesSetMethodID: function() {},

    /**
     * <b>onEventReceiveMethodID</b> will be called when an external draggable element with associated event data was dropped onto the calendar. Or an event from another calendar.
     *
     * @param {CustomType<svy-fullcalendar2.EventObject>} event The dropped event.
     * @param {Array<CustomType<svy-fullcalendar2.EventObject>>} relatedEvents Array of related events.
     * @param {Object} draggedElement The DOM element that was dragged.
     * @param {CustomType<svy-fullcalendar2.ViewType>} view The current calendar view.
     *
     * @return {Boolean} if it returns false, the event receive action will be reverted, otherwise (true) the action is considered valid
     */
    onEventReceiveMethodID: function() {},

    /**
     * <b>onEventLeaveMethodID</b> will be called when on a calendar when one if its events is about to be dropped onto another calendar.
     *
     * @param {CustomType<svy-fullcalendar2.EventObject>} event The event that is leaving.
     * @param {Array<CustomType<svy-fullcalendar2.EventObject>>} relatedEvents Array of related events.
     * @param {Object} draggedElement The DOM element being dragged.
     * @param {CustomType<svy-fullcalendar2.ViewType>} view The current calendar view.
     *
     * @return {Boolean} if it returns false, the event leave action will be reverted, otherwise (true) the action is considered valid
     */
    onEventLeaveMethodID: function() {},

    /**
     * <b>onResourceAddMethodID</b> will be called after a resource has been added to the calendar.
     *
     * @param {CustomType<svy-fullcalendar2.ResourceObject>} resource The added resource.
     *
     * @return {Boolean} if it returns false, the resource add action will be reverted, otherwise (true) the action is considered valid
     */
    onResourceAddMethodID: function() {},

    /**
     * <b>onResourceChangeMethodID</b> will be called after a resource has been modified in some way.
     *
     * @param {CustomType<svy-fullcalendar2.ResourceObject>} oldResource The resource before modification.
     * @param {Object} newResource The new resource data.
     *
     * @return {Boolean} if it returns false, the resource change action will be reverted, otherwise (true) the action is considered valid
     */
    onResourceChangeMethodID: function() {},

    /**
     * <b>onResourceRemoveMethodID</b> will be called after a resource has been removed from the calendar.
     *
     * @param {CustomType<svy-fullcalendar2.ResourceObject>} resource The removed resource.
     *
     * @return {Boolean} if it returns false, the resource remove action will be reverted, otherwise (true) the action is considered valid
     */
    onResourceRemoveMethodID: function() {},

    /**
     * <b>onResourcesSetMethodID</b> will be called after resource data is initialized OR changed in any way.
     *
     * @param {Array<CustomType<svy-fullcalendar2.ResourceObject>>} resources Array of current resources.
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
 */
function updateFullCalendar(option, value) {
}

var svy_types = {

   /**
     * Represents an event parsed for addition to the calendar.
     */
   EventParsing: {
    /**
     * Unique identifier of the event.
     */
    id: null,
    /**
     * The title of the event.
     */
    title: null,
    /**
     * The start date/time of the event.
     */
    start: null,
    /**
     * The end date/time of the event.
     */
    end: null,
    /**
     * Indicates if the event is an all-day event.
     */
    allDay: null,
    /**
     * CSS class name(s) to be applied to the event.
     */
    className: null,
    /**
     * Array of CSS class names for the event.
     */
    classNames: null,
    /**
     * Indicates if the event is editable.
     */
    editable: null,
    /**
     * Indicates if the event's start time is editable.
     */
    startEditable: null,
    /**
     * Indicates if the event's duration is editable.
     */
    durationEditable: null,
    /**
     * Determines if the event can overlap with others.
     */
    overlap: null,
    /**
     * Constraint for dragging or resizing the event.
     */
    constraint: null,
    /**
     * The color assigned to the event.
     */
    color: null,
    /**
     * The background color of the event.
     */
    backgroundColor: null,
    /**
     * The border color of the event.
     */
    borderColor: null,
    /**
     * The text color of the event.
     */
    textColor: null,
    /**
     * Additional data associated with the event.
     */
    data: null,
    /**
     * Extended properties for the event.
     */
    extendedProps: null,
    /**
     * The event's date (alternative to start).
     */
    date: null,
    /**
     * Display mode for the event.
     */
    display: null,
    /**
     * Flag or value allowing/disallowing specific behaviors.
     */
    allow: null,
    /**
     * URL associated with the event.
     */
    url: null,
    /**
     * Identifier for grouping related events.
     */
    groupId: null,
    /**
     * Array representing the days of the week for recurring events.
     */
    daysOfWeek: null,
    /**
     * The start time for recurring events.
     */
    startTime: null,
    /**
     * The end time for recurring events.
     */
    endTime: null,
    /**
     * Start recurrence date for repeating events.
     */
    startRecur: null,
    /**
     * End recurrence date for repeating events.
     */
    endRecur: null,
    /**
     * Indicates if the event's resource is editable.
     */
    resourceEditable: null,
    /**
     * The resource identifier associated with the event.
     */
    resourceId: null,
    /**
     * Array of resource identifiers if the event is associated with multiple resources.
     */
    resourceIds: null,
    /**
     * Recurrence rule for the event.
     */
    rrule: null,
},

    /**
     * Represents an event object in the calendar.
     */
    EventObject: {
        /**
         * Unique identifier of the event.
         */
        id: null,
        /**
         * Identifier used to group related events.
         */
        groupId: null,
        /**
         * The title of the event.
         */
        title: null,
        /**
         * Indicates if the event is an all-day event.
         */
        allDay: null,
        /**
         * The start date/time of the event.
         */
        start: null,
        /**
         * The end date/time of the event.
         */
        end: null,
        /**
         * String representation of the start date/time.
         */
        startStr: null,
        /**
         * String representation of the end date/time.
         */
        endStr: null,
        /**
         * Array of CSS class names for the event.
         */
        classNames: null,
        /**
         * Indicates if the event is editable.
         */
        editable: null,
        /**
         * Indicates if the event's start time is editable.
         */
        startEditable: null,
        /**
         * Indicates if the event's duration is editable.
         */
        durationEditable: null,
        /**
         * Indicates if the event's resource is editable.
         */
        resourceEditable: null,
        /**
         * Determines if the event can overlap with others.
         */
        overlap: null,
        /**
         * Constraint applied to the event.
         */
        constraint: null,
        /**
         * The background color of the event.
         */
        backgroundColor: null,
        /**
         * The border color of the event.
         */
        borderColor: null,
        /**
         * The text color of the event.
         */
        textColor: null,
        /**
         * Extended properties for the event.
         */
        extendedProps: null,
        /**
         * Display mode for the event.
         */
        display: null,
        /**
         * URL associated with the event.
         */
        url: null,
        /**
         * Source information for the event.
         */
        source: null,
        /**
         * The resource identifier associated with the event.
         */
        resourceId: null,
        /**
         * Array of resource identifiers for the event.
         */
        resourceIds: null,
    },

    /**
     * Represents a resource used in the calendar.
     */
    ResourceObject: {
        /**
         * Unique identifier of the resource.
         */
        id: null,
        /**
         * The display title of the resource.
         */
        title: null,
        /**
         * An array of child resources.
         */
        children: null,
        /**
         * Identifier of the parent resource.
         */
        parentId: null,
        /**
         * Background color for events associated with the resource.
         */
        eventBackgroundColor: null,
        /**
         * Border color for events associated with the resource.
         */
        eventBorderColor: null,
        /**
         * Text color for events associated with the resource.
         */
        eventTextColor: null,
        /**
         * CSS class names applied to events associated with the resource.
         */
        eventClassNames: null,
        /**
         * Additional extended properties for the resource.
         */
        extendedProps: null,
        /**
         * Settings controlling event overlap behavior related to this resource.
         */
        eventOverlap: null,
        /**
         * Constraints applied to events for this resource.
         */
        eventConstraint: null,
        /**
         * Rules determining whether events are allowed for this resource.
         */
        eventAllow: null
    },

   /**
     * Represents an event source for the calendar.
     */
    EventSource: {
        /**
         * Unique identifier for the event source.
         */
        id: null,
        /**
         * The events provided by the source.
         */
        events: null,
        /**
         * CSS class names for events from this source.
         */
        className: null,
        /**
         * Default all-day event setting for events from this source.
         */
        allDayDefault: null,
        /**
         * Indicates if events from this source are editable.
         */
        editable: null,
        /**
         * Indicates if event start times are editable.
         */
        startEditable: null,
        /**
         * Indicates if event durations are editable.
         */
        durationEditable: null,
        /**
         * Determines if events can overlap.
         */
        overlap: null,
        /**
         * Constraint applied to events from this source.
         */
        constraint: null,
        /**
         * The primary color for events.
         */
        color: null,
        /**
         * The background color for events.
         */
        backgroundColor: null,
        /**
         * The border color for events.
         */
        borderColor: null,
        /**
         * The text color for events.
         */
        textColor: null,
        /**
         * Additional data for events from this source.
         */
        data: null,
        /**
         * Default all-day value for events.
         */
        defaultAllDay: null,
        /**
         * URL for fetching events.
         */
        url: null,
        /**
         * Format string used for event dates.
         */
        format: null,
        /**
         * Function to transform event data.
         */
        eventDataTransform: null,
        /**
         * Success callback for event fetching.
         */
        success: null,
        /**
         * Failure callback for event fetching.
         */
        failure: null,
        /**
         * Display mode for events.
         */
        display: null,
        /**
         * Allowance property for events.
         */
        allow: null,
    },

    /**
     * Represents an event source that is an array of events.
     */
    ArrayEventSource: {
        /**
         * Unique identifier for the event source.
         */
        id: null,
        /**
         * Array of event objects provided by the source.
         */
        events: null,
        /**
         * CSS class names for events from this source.
         */
        className: null,
        /**
         * Default all-day event setting for events from this source.
         */
        allDayDefault: null,
        /**
         * Indicates if events from this source are editable.
         */
        editable: null,
        /**
         * Indicates if event start times are editable.
         */
        startEditable: null,
        /**
         * Indicates if event durations are editable.
         */
        durationEditable: null,
        /**
         * Determines if events can overlap.
         */
        overlap: null,
        /**
         * Constraint applied to events from this source.
         */
        constraint: null,
        /**
         * The primary color for events.
         */
        color: null,
        /**
         * The background color for events.
         */
        backgroundColor: null,
        /**
         * The border color for events.
         */
        borderColor: null,
        /**
         * The text color for events.
         */
        textColor: null,
        /**
         * Additional data for events from this source.
         */
        data: null,
        /**
         * Default all-day value for events.
         */
        defaultAllDay: null,
        /**
         * URL for fetching events.
         */
        url: null,
        /**
         * Format string used for event dates.
         */
        format: null,
        /**
         * Function to transform event data.
         */
        eventDataTransform: null,
        /**
         * Success callback for event fetching.
         */
        success: null,
        /**
         * Failure callback for event fetching.
         */
        failure: null,
        /**
         * Display mode for events.
         */
        display: null,
        /**
         * Allowance property for events.
         */
        allow: null,
    },


    /**
     * Represents an event source provided by a function.
     */
    FunctionEventSource: {
        /**
         * Unique identifier for the event source.
         */
        id: null,
        /**
         * Function that returns events for this source.
         */
        events: null,
        /**
         * CSS class names for events from this source.
         */
        className: null,
        /**
         * Default all-day event setting for events from this source.
         */
        allDayDefault: null,
        /**
         * Indicates if events from this source are editable.
         */
        editable: null,
        /**
         * Indicates if event start times are editable.
         */
        startEditable: null,
        /**
         * Indicates if event durations are editable.
         */
        durationEditable: null,
        /**
         * Determines if events can overlap.
         */
        overlap: null,
        /**
         * Constraint applied to events from this source.
         */
        constraint: null,
        /**
         * The primary color for events.
         */
        color: null,
        /**
         * The background color for events.
         */
        backgroundColor: null,
        /**
         * The border color for events.
         */
        borderColor: null,
        /**
         * The text color for events.
         */
        textColor: null,
        /**
         * Additional data for events from this source.
         */
        data: null,
        /**
         * Default all-day value for events.
         */
        defaultAllDay: null,
        /**
         * URL for fetching events.
         */
        url: null,
        /**
         * Format string used for event dates.
         */
        format: null,
        /**
         * Function to transform event data.
         */
        eventDataTransform: null,
        /**
         * Success callback for event fetching.
         */
        success: null,
        /**
         * Failure callback for event fetching.
         */
        failure: null,
        /**
         * Display mode for events.
         */
        display: null,
        /**
         * Allowance property for events.
         */
        allow: null,
    },


    /**
     * Represents an event source provided as a JSON feed.
     */
    JSONEventSource: {
        /**
         * Unique identifier for the event source.
         */
        id: null,
        /**
         * CSS class names for events from this source.
         */
        className: null,
        /**
         * Default all-day event setting for events from this source.
         */
        allDayDefault: null,
        /**
         * Indicates if events from this source are editable.
         */
        editable: null,
        /**
         * Indicates if event start times are editable.
         */
        startEditable: null,
        /**
         * Indicates if event durations are editable.
         */
        durationEditable: null,
        /**
         * Determines if events can overlap.
         */
        overlap: null,
        /**
         * Constraint applied to events from this source.
         */
        constraint: null,
        /**
         * The primary color for events.
         */
        color: null,
        /**
         * The background color for events.
         */
        backgroundColor: null,
        /**
         * The border color for events.
         */
        borderColor: null,
        /**
         * The text color for events.
         */
        textColor: null,
        /**
         * Additional data for events from this source.
         */
        data: null,
        /**
         * Default all-day value for events.
         */
        defaultAllDay: null,
        /**
         * URL for fetching events.
         */
        url: null,
        /**
         * Format string used for event dates.
         */
        format: null,
        /**
         * Function to transform event data.
         */
        eventDataTransform: null,
        /**
         * Success callback for event fetching.
         */
        success: null,
        /**
         * Failure callback for event fetching.
         */
        failure: null,
        /**
         * Display mode for events.
         */
        display: null,
        /**
         * Allowance property for events.
         */
        allow: null,
    },

    /**
     * Represents an event source provided by an iCalendar feed.
     */
    iCalendarEventSource: {
        /**
         * Unique identifier for the event source.
         */
        id: null,
        /**
         * CSS class names for events from this source.
         */
        className: null,
        /**
         * Default all-day event setting for events from this source.
         */
        allDayDefault: null,
        /**
         * Indicates if events from this source are editable.
         */
        editable: null,
        /**
         * Indicates if event start times are editable.
         */
        startEditable: null,
        /**
         * Indicates if event durations are editable.
         */
        durationEditable: null,
        /**
         * Determines if events can overlap.
         */
        overlap: null,
        /**
         * Constraint applied to events from this source.
         */
        constraint: null,
        /**
         * The primary color for events.
         */
        color: null,
        /**
         * The background color for events.
         */
        backgroundColor: null,
        /**
         * The border color for events.
         */
        borderColor: null,
        /**
         * The text color for events.
         */
        textColor: null,
        /**
         * Additional data for events from this source.
         */
        data: null,
        /**
         * Default all-day value for events.
         */
        defaultAllDay: null,
        /**
         * URL for fetching events.
         */
        url: null,
        /**
         * Format string used for event dates.
         */
        format: null,
        /**
         * Function to transform event data.
         */
        eventDataTransform: null,
        /**
         * Success callback for event fetching.
         */
        success: null,
        /**
         * Failure callback for event fetching.
         */
        failure: null,
        /**
         * Display mode for events.
         */
        display: null,
        /**
         * Allowance property for events.
         */
        allow: null,
    },

    /**
     * Represents an event source provided by Google Calendar.
     */
    GoogleCalendarEventSource: {
        /**
         * Unique identifier for the event source.
         */
        id: null,
        /**
         * The Google Calendar ID.
         */
        googleCalendarId: null,
        /**
         * The Google Calendar API key.
         */
        googleCalendarApiKey: null,
        /**
         * CSS class names for events from this source.
         */
        className: null,
        /**
         * Default all-day event setting for events from this source.
         */
        allDayDefault: null,
        /**
         * Indicates if events from this source are editable.
         */
        editable: null,
        /**
         * Indicates if event start times are editable.
         */
        startEditable: null,
        /**
         * Indicates if event durations are editable.
         */
        durationEditable: null,
        /**
         * Determines if events can overlap.
         */
        overlap: null,
        /**
         * Constraint applied to events from this source.
         */
        constraint: null,
        /**
         * The primary color for events.
         */
        color: null,
        /**
         * The background color for events.
         */
        backgroundColor: null,
        /**
         * The border color for events.
         */
        borderColor: null,
        /**
         * The text color for events.
         */
        textColor: null,
        /**
         * Additional data for events from this source.
         */
        data: null,
        /**
         * Default all-day value for events.
         */
        defaultAllDay: null,
        /**
         * URL for fetching events.
         */
        url: null,
        /**
         * Format string used for event dates.
         */
        format: null,
        /**
         * Function to transform event data.
         */
        eventDataTransform: null,
        /**
         * Success callback for event fetching.
         */
        success: null,
        /**
         * Failure callback for event fetching.
         */
        failure: null,
        /**
         * Display mode for events.
         */
        display: null,
        /**
         * Allowance property for events.
         */
        allow: null,
    },

    /**
     * Represents the view type of the calendar.
     */
    ViewType: {
        /**
         * The type of the current view (e.g. 'month', 'week', 'day').
         */
        type: null,
        /**
         * The title of the view.
         */
        title: null,
        /**
         * The start date of the active range.
         */
        activeStart: null,
        /**
         * The end date of the active range.
         */
        activeEnd: null,
        /**
         * The start date of the current view.
         */
        currentStart: null,
        /**
         * The end date of the current view.
         */
        currentEnd: null,
        /**
         * The date environment object containing locale and timezone information.
         */
        dateEnv: null,
    },

    /**
     * Represents the FullCalendar instance.
     */
    FullCalendar: {
        /**
         * The configuration options for the FullCalendar instance.
         */
        options: null,
    },


    FullCalendarOptions: {

        /**
         * The text titling the 'all-day' slot at the top of the calendar.
         */
        allDayText : null,

        /**
         * The width-to-height aspect ratio of the calendar.
         */
        aspectRatio : null,

        /**
         * Text that will be displayed on buttons of the headerToolbar/footerToolbar.
         */
        buttonText : null,

        /**
         * The height of the view area of the calendar. By default, this option is unset and the calendar's height is calculated by aspectRatio.
         */
        contentHeight : null,

        /**
         * A fallback duration for all-day Event Objects without a specified end value.
         */
        defaultAllDayEventDuration : null,

        /**
         * A fallback duration for timed Event Objects without a specified end value.
         */
        defaultTimedEventDuration : null,

        /**
         * Whether or not to display an event's end time.
         */
        displayEventEnd : null,

        /**
         * Whether or not to display the text for an event's date/time.
         */
        displayEventTime : null,

        /**
         * Determines the date format of title of the popover created by the moreLinkClick option.
         */
        dayPopoverFormat : null,

        /**
         * Time it takes for an event to revert to its original position after an unsuccessful drag.
         */
        dragRevertDuration : null,

        /**
         * Whether to automatically scoll the scroll-containers during event drag-and-drop and date selecting.
         */
        dragScroll : null,

        /**
         * Determines whether the events on the calendar can be modified.
         */
        editable : null,

        /**
         * Allow events' durations to be editable through resizing.
         */
        eventDurationEditable : null,

        /**
         * Allow events' start times to be editable through dragging.
         */
        eventStartEditable : null,

        /**
         * Limits event dragging and resizing to certain windows of time.
         */
        eventConstraint : null,

        /**
         * Determines if events being dragged and resized are allowed to overlap each other.
         */
        eventOverlap : null,

        /**
         * A way to specify multiple event sources.
         */
        eventSources : null,

        /**
         * The day that each week begins.
         */
        firstDay : null,

        /**
         * Determines the number of weeks displayed in a month view.
         */
        fixedWeekCount : null,

        /**
         * A flag to force assignment of an event's end if it is unspecified.
         */
        forceEventDuration : null,

        /**
         * Determines when event fetching should occur.
         */
        lazyFetching : null,

        /**
         * Displays the calendar in right-to-left mode.
         */
        isRTL : null,

        /**
         * For touch devices, the amount of time the user must hold down before an event becomes draggable or a date becomes selectable.
         */
        longPressDelay : null,

        /**
         * Whether clicking elsewhere on the page will cause the current selection to be cleared.
         */
        unselectAuto : null,

        /**
         * A way to specify elements that will ignore the unselectAuto option.
         */
        unselectCancel : null,

        /**
         * Determines how far forward the scroll pane is initially scrolled.
         */
        scrollTime : null,

        /**
         * Allows a user to highlight multiple days or timeslots by clicking and dragging.
         */
        selectable : null,

        /**
         * Limits user selection to certain windows of time.
         */
        selectConstraint : null,

        /**
         * Determines whether the user is allowed to select periods of time that are occupied by events.
         */
        selectOverlap : null,

        /**
         * The frequency for displaying time slots.
         */
        slotDuration : null,

        /**
         * Determines the text that will be displayed within a time slot.
         */
        slotLabelFormat : null,

        /**
         * The frequency that the time slots should be labelled with text.
         */
        slotLabelInterval : null,

        /**
         * Determines if timed events in TimeGrid view should visually overlap.
         */
        slotEventOverlap : null,

        /**
         * The time interval at which a dragged event will snap to the time axis. Also affects the granularity at which selections can be made.
         */
        snapDuration : null,

        /**
         * Determines the text that will be displayed in the headerToolbar's title.
         */
        titleFormat : null,

        /**
         * Whether to include Saturday/Sunday columns in any of the calendar views.
         */
        weekends : null,

        /**
         * Determines if week numbers should be displayed on the calendar.
         */
        weekNumbers : null,

        /**
         * The method for calculating week numbers that are displayed with the weekNumbers setting.
         */
        weekNumberCalculation : null,

        /**
         * The available views of this component.
         */
        views : null,

        /**
         * Determines what happens upon a day heading nav-link click.
         */
        navLinkDayClick : null,

        /**
         * Determines what happens upon a week-number nav-link click.
         */
        navLinkWeekClick : null,

        /**
         * Sets the exact duration of a custom view.
         */
        duration : null,

        /**
         * Determines which icons are displayed in buttons of the headerToolbar/footerToolbar when Bootstrap 4 theming is on. This setting does not apply to Bootstrap 5 theming. Use buttonIcons instead.
         */
        bootstrapFontAwesome : null,

        /**
         * Icons that will be displayed in buttons of the headerToolbar/footerToolbar.
         */
        buttonIcons : null,

        /**
         * Defines custom buttons that can be used in the headerToolbar/footerToolbar.
         */
        customButtons : null,

        /**
         * When an event's end time spans into another day, the minimum time it must be in order for it to render as if it were on that day.
         */
        nextDayThreshold : null,

        /**
         * Whether the view should scroll to scrollTime every time the date range changes.
         */
        scrollTimeReset : null,

        /**
         * Determines the first time slot that will be displayed for each day.
         */
        slotMinTime : null,

        /**
         * Determines the last time slot that will be displayed for each day. In line with the discussion about the Event object, it is important to stress that this should be specified as an exclusive end time.
         */
        slotMaxTime : null,

        /**
         * Defines the buttons and title at the top of the calendar.
         */
        headerToolbar : null,

        /**
         * Defines the controls at the bottom of the calendar.
         */
        footerToolbar : null,

        /**
         * The separator text used for date-formatting ranges throughout the API.
         */
        defaultRangeSeparator : null,

        /**
         * Determines the separator text when formatting the date range in the toolbar title.
         */
        titleRangeSeparator : null,

        /**
         * Whether the day headers should appear. For the Month, TimeGrid, and DayGrid views.
         */
        dayHeaders : null,

        /**
         * Determines the text that will be displayed on the calendar's column headings.
         */
        dayHeaderFormat : null,

        /**
         * A ClassName Input for adding classNames to the header &lt;th&gt; cell
         */
        dayHeaderClassNames : null,

        /**
         * A Content Injection Input. Generated content is inserted inside the inner-most wrapper of the header cell. It does not replace the &lt;th&gt; cell.
         */
        dayHeaderContent : null,

        /**
         * Callback called right after the &lt;th&gt; has been added to the DOM.
         */
        dayHeaderDidMount : null,

        /**
         * Callback called right before the &lt;th&gt; will be removed from the DOM.
         */
        dayHeaderWillUnmount : null,

        /**
         * A ClassName Input for adding classNames to the &lt;td&gt; cell
         */
        dayCellClassNames : null,

        /**
         * A Content Injection Input. Generated content is inserted inside the inner-most wrapper of the day cell. It does not replace the &lt;td&gt; cell.
         */
        dayCellContent : null,

        /**
         * Callback called right after the &lt;td&gt; has been added to the DOM
         */
        dayCellDidMount : null,

        /**
         * Callback called right before the &lt;td&gt; will be removed from the DOM
         */
        dayCellWillUnmount : null,

        /**
         * The initial view when the calendar loads. The default value is 'dayGridMonth'
         */
        initialView : null,

        /**
         * A ClassName Input for adding classNames
         */
        weekNumberClassNames : null,

        /**
         * A Content Injection Input.
         */
        weekNumberContent : null,

        /**
         * Callback called right after the week number div has been added to the DOM
         */
        weekNumberDidMount : null,

        /**
         * Callback called right before the week number div will be removed from the DOM
         */
        weekNumberWillUnmount : null,

        /**
         * A ClassName Input for adding classNames to the root view element. called whenever the view changes.
         */
        viewClassNames : null,

        /**
         * Callback called right after the view has been added to the DOM.
         */
        viewDidMount : null,

        /**
         * Callback called right before the view will be removed from the DOM
         */
        viewWillUnmount : null,

        /**
         * Whether or not to display a marker indicating the current time.
         */
        nowIndicator : null,

        /**
         * A ClassName Input for adding classNames.
         */
        nowIndicatorClassNames : null,

        /**
         * A Content Injection Input.
         */
        nowIndicatorContent : null,

        /**
         * Callback called after before the now indicator will be added to the DOM.
         */
        nowIndicatorDidMount : null,

        /**
         * Callback called right before the now indicator will be removed from the DOM.
         */
        nowIndicatorWillUnmount : null,

        /**
         * In month view, whether dates in the previous or next month should be rendered at all.
         */
        showNonCurrentDates : null,

        /**
         * A parameter of this name will be sent to each JSON event feed. It describes the start of the interval being fetched.
         */
        startParam : null,

        /**
         * A parameter of this name will be sent to each JSON event feed. It describes the exclusive end of the interval being fetched.
         */
        endParam : null,

        /**
         * A parameter of this name will be sent to each JSON event feed. It describes the timezone of the startParam and endParam values, as well as the desired timezone of the returned events.
         */
        timeZoneParam : null,

        /**
         * A time zone is a region of the world that serves as a context for displaying dates. It affects a Calendar instance. Default value is browser timezone.
         */
        timeZone : null,

        /**
         * Specify multiple locales with the ability to switch between them after pageload.
         */
        locales : null,

        /**
         * Current component locale (affects texts,formatting and weeknumber/first day of week).
         */
        locale : null,

        /**
         * Renders the calendar with a given theme system. Default: 'standard'
         */
        themeSystem : null,

        /**
         * Determines how an event's duration should be mutated when it is dragged from a timed section to an all-day section and vice versa.
         */
        allDayMaintainDuration : null,

        /**
         * Provides a way to filter which external elements can be dropped onto the calendar.
         */
        dropAccept : null,

        /**
         * Determines the ordering (sort) events within the same day.
         */
        eventOrder : null,

        /**
         * Ensures the eventOrder setting is strictly followed.
         */
        eventOrderStrict : null,

        /**
         * Whether to automatically resize the calendar when the browser window resizes.
         */
        handleWindowResize : null,

        /**
         * How many pixels the user's mouse/touch must move before an event drag activates.
         */
        eventDragMinDistance : null,

        /**
         * If the rows of a given view don't take up the entire height, they will expand to fit.
         */
        expandRows : null,

        /**
         * The time the calendar will wait to adjust its size after a window resize occurs, in milliseconds.
         */
        windowResizeDelay : null,

        /**
         * Sets the height of the entire calendar, including header and footer. By default, this option is unset and the calendar's height is calculated by aspectRatio.
         */
        height : null,

        /**
         * The direction that elements in the calendar are rendered. Either left-to-right or right-to-left.
         */
        direction : null,

        /**
         * If the rows of a given view don't take up the entire height, they will expand to fit.
         */
        weekNumberFormat : null,

        /**
         * Whether the user can resize an event from its starting edge.
         */
        eventResizableFromStart : null,

        /**
         * The heading text for week numbers. Also affects weeks in date formatting.
         */
        weekText : null,

        /**
         * When to render multiple asynchronous event sources in an individual or batched manner.
         */
        progressiveEventRendering : null,

        /**
         * Emphasizes certain time slots on the calendar. By default, Monday-Friday, 9am-5pm.
         */
        businessHours : null,

        /**
         * The initial date displayed when the calendar first loads.
         */
        initialDate : null,

        /**
         * Explicitly sets the 'today' date of the calendar. This is the day that is normally highlighted in yellow.
         */
        now : null,

        /**
         * A hook for transforming custom data into a standard Event object.
         */
        eventDataTransform : null,

        /**
         * Whether to fix the date-headers at the top of the calendar to the viewport while scrolling.
         */
        stickyHeaderDates : null,

        /**
         * Whether to fix the view's horizontal scrollbar to the bottom of the viewport while scrolling.
         */
        stickyFooterScrollbar : null,

        /**
         * View height.
         */
        viewHeight : null,

        /**
         * Determines the default value for each Event Object's allDay property when it is unspecified.
         */
        defaultAllDay : null,

        /**
         * Callback called when any of the event sources fails. Probably because an AJAX request failed.
         */
        eventSourceFailure : null,

        /**
         * A function that gets called when fetching succeeds. It can transform the response. Gets called for any type of Event source.
         */
        eventSourceSuccess : null,

        /**
         * Callback function to have exact programmatic control over where an event can be dropped.
         */
        eventAllow : null,

        /**
         * Controls which preset rendering style events use.
         */
        eventDisplay : null,

        /**
         * Sets the background color for all events on the calendar. Any CSS color format is supported.
         */
        eventBackgroundColor : null,

        /**
         * Sets the border color for all events on the calendar. Any CSS color format is supported.
         */
        eventBorderColor : null,

        /**
         * Sets the text color for all events on the calendar. Any CSS color format is supported.
         */
        eventTextColor : null,

        /**
         * Sets the background and border colors for all events on the calendar. Any CSS color format is supported.
         */
        eventColor : null,

        /**
         * A ClassName Input for adding classNames to the outermost event element. If supplied as a callback function, it is called every time the associated event data changes.
         */
        eventClassNames : null,

        /**
         * A Content Injection Input. Generated content is inserted inside the inner-most wrapper of the event element. If supplied as a callback function, it is called every time the associated event data changes.
         */
        eventContent : null,

        /**
         * Callback called right after the element has been added to the DOM. If the event data changes, this is NOT called again.
         */
        eventDidMount : null,

        /**
         * Callback called right before the element will be removed from the DOM.
         */
        eventWillUnmount : null,

        /**
         * Callback function to have exact programmatic control over where the user can select.
         */
        selectAllow : null,

        /**
         * Determines if external draggable elements or events from other calendars can be dropped onto the calendar.
         */
        droppable : null,

        /**
         * A ClassName Input.
         */
        slotLaneClassNames : null,

        /**
         * A Content Injection Input
         */
        slotLaneContent : null,

        /**
         * Callback called right after the element is added to the DOM.
         */
        slotLaneDidMount : null,

        /**
         * Callback called right before the element will be removed from the DOM.
         */
        slotLaneWillUnmount : null,

        /**
         * Callback called right after the element is added to the DOM.
         */
        slotLabelDidMount : null,

        /**
         * Callback called right before the element will be removed from the DOM.
         */
        slotLabelWillUnmount : null,

        /**
         * In, dayGrid view, the max number of events within a given day, not counting the +more link. The rest will show up in a popover.
         */
        dayMaxEvents : null,

        /**
         * In dayGrid view, the max number of stacked event levels within a given day. This includes the +more link if present. The rest will show up in a popover.
         */
        dayMaxEventRows : null,

        /**
         * If specified, when the calendar gets narrow enough where day cells can no longer meet their dayMinWidth, horizontal scrollbars will appear.
         */
        dayMinWidth : null,

        /**
         * A ClassName Input
         */
        allDayClassNames : null,

        /**
         * A Content Injection Input
         */
        allDayContent : null,

        /**
         * Callback called right after the element was added to the DOM.
         */
        allDayDidMount : null,

        /**
         * Callback called right before the element will be removed from the DOM.
         */
        allDayWillUnmount : null,

        /**
         * Determines how wide each of the time-axis slots will be. Specified as a number of pixels. When not specified, a reasonable value will be automatically computed.
         */
        slotMinWidth : null,

        /**
         * Determines if day names and week names are clickable.
         */
        navLinks : null,

        /**
         * Determines the time-text that will be displayed on each event.
         */
        eventTimeFormat : null,

        /**
         * The amount of milliseconds to wait before rerendering anything on a calendar.
         */
        rerenderDelay : null,

        /**
         * More link text
         */
        moreLinkText : null,

        /**
         * The minimum distance the user's mouse must travel after a mousedown, before a selection is allowed. A non-zero value is useful for differentiating a selection from a dateClick.
         */
        selectMinDistance : null,

        /**
         * For touch devices, the amount of time the user must hold down before a date becomes selectable.
         */
        selectLongPressDelay : null,

        /**
         * For touch devices, the amount of time the user must hold down before an event becomes draggable.
         */
        eventLongPressDelay : null,

        /**
         * Whether to draw a 'placeholder' event while the user is dragging.
         */
        selectMirror : null,

        /**
         * For timeline view, the maximum number of events that stack top-to-bottom. For timeGrid view, the maximum number of events that stack left-to-right.
         */
        eventMaxStack : null,

        /**
         * In timeGrid view, the minimum height an event is allowed to be.
         */
        eventMinHeight : null,

        /**
         * In timeline view, the minimum width an event is allowed to be.
         */
        eventMinWidth : null,

        /**
         * In timeGrid view, the height threshold for when an event has a 'short' style.
         */
        eventShortHeight : null,

        /**
         * Plugins list. Currently this list will be auto filled in Titanium Client.
         */
        plugins : null,

        /**
         * Determines the first visible day of a custom view.
         */
        dateAlignment : null,

        /**
         * How far into the future/past the calendar navigates when prev/next is executed.
         */
        dateIncrement : null,

        /**
         * Exclude certain days-of-the-week from being displayed.
         */
        hiddenDays : null,

        /**
         * Specifies whether the month view should render in a fixed mode.
         * When enabled, the calendar displays a consistent number of weeks in the month view,
         * even if the month starts or ends mid-week.
         */
        monthMode : null,

        /**
         * Limits which dates the user can navigate to and where events can go.
         */
        validRange : null,

        /**
         * Sets the exact date range that is visible in a view.
         */
        visibleRange : null,

        /**
         * No Events Text
         */
        noEventsText : null,

        /**
         * Determines the action taken when the user clicks on a 'more' link created by the dayMaxEventRows or dayMaxEvents options.
         */
        moreLinkClick : null,

        /**
         * A ClassName Input for adding classNames
         */
        moreLinkClassNames : null,

        /**
         * A Content Injection Input
         */
        moreLinkContent : null,

        /**
         * Callback called right after the link has been added to the DOM
         */
        moreLinkDidMount : null,

        /**
         * Callback called right before the link will be removed from the DOM
         */
        moreLinkWillUnmount : null,

        /**
         * Tells the calendar to display resources from an input.
         */
        resources : null,

        /**
         * An array of Event Objects that will be displayed on the calendar.
         */
        events : null,

        /**
         * The license key you must enter to use premium features.
         */
        schedulerLicenseKey : null,

        /**
         * Determines the width of the area that contains the list of resources.Default: 30%.
         */
        resourceAreaWidth : null,

    }
}

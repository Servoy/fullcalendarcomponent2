
/**
 * Getter for all calendar events.
 * 
 * @return {Array<EventObject>}
 */
 function getCalendarEvents() {}

/**
 * Gets a calendar event using a given ID.
 * 
 * @param {String} id 
 * 
 * @return {EventObject}
 */
  function getEventById() {}

 /**
 * Adds an event to calendar.
 * 
 * @param {EventParsing} event 
 * @param {Object} source 
 * 
 * @return {EventObject}
 */
 function addEvent() {}

 /**
 * Modifies any of the non-date-related properties of an event.
 * 
 * @param {String} eventID 
 * @param {String} name 
 * @param {Object} value 
 */
 function setPropEvent() {}

 /**
 * Modifies a single property in an events' extendedProps hash.
 * 
 * @param {String} eventID 
 * @param {String} name 
 * @param {Object} value 
 */
  function setExtendedPropEvent() {}

 /**
 * Sets an event’s start date.
 * 
 * @param {String} eventID 
 * @param {Object} date 
 * @param {Object} [options]
 */
  function setStart() {}

 /**
 * Sets an event’s end date.
 * 
 * @param {String} eventID 
 * @param {Object} date 
 */
  function setEnd() {}

/**
 * Sets an event’s start date, end date, and allDay properties at the same time.
 * 
 * @param {String} eventID 
 * @param {Object} start 
 * @param {Object} end 
 * @param {Object} [options]   
 */
 function setDates() {}

/**
 * Sets whether an event is considered all-day.
 * 
 * @param {String} eventID 
 * @param {Boolean} allDay 
 * @param {Object} [settings] 
 */
 function setAllDay() {}

/**
 * Will move an event’s start date by a specific period of time.
 * 
 * @param {String} eventID 
 * @param {Object} delta 
 */
 function moveStart() {}

/**
 * Will move an event’s end date by a specific period of time.
 * 
 * @param {String} eventID 
 * @param {Object} delta 
 */
 function moveEnd() {}

/**
 * Will move an event’s start and end dates by a specific period of time.
 * 
 * @param {String} eventID 
 * @param {Object} delta 
 */
 function moveDates() {}

/**
 * Formats an event’s dates into a string.
 * 
 * Accepts a date formatter.
 * 
 * If the event doesn’t have an end, then the start will be formatted alone.
 * 
 * @param {String} eventID 
 * @param {Object} formatConfig 
 */
 function formatRangeEvent() {}

/**
 * Removes an event from the calendar.
 * 
 * @param {String} eventID 
 */
 function removeEvent() {}

/**
 * Gets the Resources associated with the given event.
 * 
 * @param {String} eventID 
 * @returns {Array<ResourceObject>}
 */
 function getEventResources() {}

/**
 * Sets the Resources associated with the given event.
 * 
 * @param {String} eventID 
 * @param {Array<ResourceObject>} resources
 */
 function setEventResources() {}

/**
 * Serializes an Event API Object to a plain object.
 * 
 * @param {String} eventID 
 * @param {Object} [settings]
 */
 function toPlainObjectEvent() {}

/**
 * Retrieves all Event Source Objects.
 * 
 * @returns {Array<EventSource>}
 */
 function getEventSources() {}

/**
 * Retrieves a specific Event Source Object.
 * 
 * @param {String} eventID 
 * @returns {EventSource}
 */
 function getEventSourceById() {}

/**
 * Dynamically adds an event source.
 * 
 * @param {EventSource} source 
 */
 function addEventSource() {}

/**
 * Refetches events from all sources and rerenders them on the screen.
 */
 function refetchEvents() {}

/**
 * Refetches events from all sources and rerenders them on the screen.
 * 
 * @param {String} eventSourceID 
 */
 function refetchEventSource() {}

 /**
 * Removes all events associated with this source and prevents it from being fetched again.
 * 
 * @param {String} eventSourceID 
 */
  function removeEventSource() {}

 /**
 * Programatically scroll the current view to the given time.
 * 
 * @param {Object} durationInput 
 */
  function scrollToTime() {}

 /**
 * A method for programmatically selecting a period of time.
 * 
 * @param {Object} dateOrObj 
 * @param {Object} [endDate] 
 */
  function select() {}

 /**
 * A method for programmatically clearing the current selection.
 */
  function unselect() {}

 /**
 * Gets the View Object for the current view.
 * 
 * @returns {ViewType}
 */
  function getView() {}

 /**
 * Gets the View Object for the current view.
 * 
 * @param {String} viewName 
 * @param {Object} [dateOrRange] 
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
 * @returns {Date}
 */
  function getDate() {}

 /**
 * Moves the calendar to an arbitrary date.
 * 
 * @param {Date} date
 */
  function gotoDate() {}

 /**
 * Moves the calendar forward/backward an arbitrary amount of time.
 * 
 * @param {Object} delta
 */
  function incrementDate() {}

 /**
 * Causes the resource data to be fetched and freshly rerendered.
 */
  function refetchResources() {}

 /**
 * A method that retrieves only top-level Resources.
 * 
 * @returns {Array<ResourceObject>}
 */
  function getTopLevelResources() {}

 /**
 * A method that retrieves all Resources, including children, as a single flat list.
 * 
 * @returns {Array<ResourceObject>}
 */
  function getResources() {}

 /**
 * A method that retrieves a specific Resource Object in memory.
 * 
 * @param {Object} resourceId
 * @returns {ResourceObject}
 */
  function getResourceById() {}

 /**
 * Allows programmatic rendering of a new resource on the calendar after the initial set of resources has already been displayed.
 * 
 * @param {ResourceObject} resource
 * @param {Boolean} [scrollTo]
 */
  function addResource() {}

 /**
 * Programmatically removes a resource from the calendar.
 * 
 * @param {String} id
 */
  function removeResource() {}

 /**
 * Returns the parent Resource of a child resource.
 * 
 * @param {String} id
 * @returns {ResourceObject}
 */
  function getParent() {}

 /**
 * Returns a list of a resource’s child resources.
 * 
 * @param {String} id
 * @returns {Array<ResourceObject>}
 */
  function getChildren() {}

 /**
 * Gets the Resources associated with the given event.
 * 
 * @param {String} id
 * @returns {Array<ResourceObject>}
 */
  function getResourceEvents() {}

 /**
 * Modifies any of the properties of a Resource Object.
 * 
 * @param {String} id
 * @param {String} name
 * @param {Object} value
 */
  function setPropResource() {}

 /**
 * Modifies a single property in an Resource Object’s extendedProps hash.
 * 
 * @param {String} id
 * @param {String} name
 * @param {Object} value
 */
  function setExtendedPropResource() {}

 /**
 * Serializes a Resource API Object to a plain object.
 * 
 * @param {String} id
 * @param {Object} [settings]
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
 * @param {Function} func
 */
  function batchRendering() {}

 /**
 * Formats a date into an ISO8601 string. Outputs a UTC offset appropriate to the calendar it’s called on.
 * 
 * @param {Object} date
 * @param {Boolean} [omitTime]
 * @returns {String}
 */
  function formatIso() {}

 /**
 * Formats two dates, a start and an end, into a string. 
 * 
 * settings is an object that holds any of the date format config options. It also accepts the following additional properties:
 * separator — what will be inserted between the two dates. a ' - ' by default
 * isExclusive — if true, the given end date will be considered the exclusive end of the range, meaning date just before the end will be rendered instead. Useful if you need to format an exclusive-end whole-day range.
 * 
 * @param {Object} start
 * @param {Object} end
 * @param {Object} settings
 * @returns {String}
 */
  function formatRangeCalendar() {}

 /**
 * A method that formats a date into a string. It inherits the locale and time zone settings of the calendar it’s called on.
 * 
 * @param {Object} date
 * @param {Object} settings
 * @returns {String}
 */
  function formatDate() {}

 /**
 * Sets an option for the calendar.
 * 
 * @param {String} name 
 * @param {Object} value 
 */
function setOption() {}

 /**
 * Gets the value of an option from the calendar.
 * 
 * @param {String} name 
 * @returns {Object}
 */
function getOption() {}
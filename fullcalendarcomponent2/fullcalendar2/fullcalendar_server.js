/**
 * @enum of event source types
 * */
 var EVENTSOURCE_TYPE = {
	FUNCTION_SOURCE: "FunctionEventSource",
	ARRAY_SOURCE: 'ArrayEventSource',
	GCALENDAR_SOURCE: 'GoogleCalendarEventSource',
    JSON_SOURCE: 'JSONEventSource',
	ICALENDAR_SOURCE: 'iCalendarSource'
}

/**
 * return the type of eventSource
 * @private
 * @return {String}
 *  */
function getEventSourceType(eventSource) {
	// this is a workaround for object issue in 8.0.3
	var events;
	var googleCalendarId;
	if (eventSource instanceof java.util.HashMap) {
		events = eventSource.get("events");
		googleCalendarId = eventSource.get("googleCalendarId");
	} else {
		events = eventSource.events;
		googleCalendarId = eventSource.googleCalendarId;
	}
	if (events instanceof Function) { // remove it from function eventSources
		return EVENTSOURCE_TYPE.FUNCTION_SOURCE;
	} else if (events instanceof Array) {
		return EVENTSOURCE_TYPE.ARRAY_SOURCE
	} else if (googleCalendarId instanceof String) {
		return EVENTSOURCE_TYPE.GCALENDAR_SOURCE
	} else if (eventSource.url) {
		if (eventSource.format == 'ics') {
			return EVENTSOURCE_TYPE.ICALENDAR_SOURCE;
		} else {
			return EVENTSOURCE_TYPE.JSON_SOURCE;
		}
	} else {
		// is not a valid resource
		return null;
	}
}

/**
 * Finds the eventSource with the given id in the list of event sources
 * @param {Array<Object>} eventSources
 * @param {Object} id
 * @private
 *
 * @return {Number}
 * */
function getEventSourceIndexById(eventSources, id) {
	if (eventSources && eventSources.length) {
		for (var i = 0; i < eventSources.length; i++) {
			var source = eventSources[i];
			
			// this is a workaround for object issue in 8.0.3
			if (source instanceof java.util.HashMap) {
				if (source.containsValue && source.containsValue(id)) {
					return i;
				}
			} else if (source.id && source.id === id) {
				return i;
			}
		}
	}
	return null;
}

/**
 * @param {Object} options
 * @param {Boolean} [renderOnCurrentView] when the calendar is already initialized will repaint in the current view; will restore the view to the default value otherwise. Default: false.
 *
 * Initialize the fullcalendar with the config options.
 * If the calendar has been already initialized and any of the config options has been modified, the calendar
 * will be destroyed and repaint again.
 * 
 * @example <pre>  @type {svy-fullcalendar.FullCalendarOptions}
  var options = {
        eventSources: [ {events: [{ title: "lunch event", start: new Date() }]}],
		selectable: true,
		editable: true,
		initialView: 'dayGridMonth',
   }
   elements.fullcalendarElementName.fullCalendar(options);
</pre>
 *
 * */
$scope.api.fullCalendar = function(options, renderOnCurrentView) {

	var functionEventSources = [];
	var arrayEventSources = [];
	var gcalEventSources = [];
    var jsonEventSources = [];
	var iCalendarEventSources = [];

	if ($scope.model.eventSources == null) $scope.model.eventSources = [];

	// parse event sources
	if (options) {
        var eventSources = options["eventSources"];
        if (eventSources instanceof Array) {
            for (var i = 0; i < eventSources.length; i++) {
                var eventSource = eventSources[i];
                var eventSourceCopy = (servoyApi && servoyApi.copyObject) ? servoyApi.copyObject(eventSource): eventSource;
                switch (getEventSourceType(eventSource)) {
                case EVENTSOURCE_TYPE.FUNCTION_SOURCE:
                    functionEventSources.push(eventSourceCopy);
                    break;
                case EVENTSOURCE_TYPE.ARRAY_SOURCE:
                    arrayEventSources.push(eventSourceCopy);
                    break;
                case EVENTSOURCE_TYPE.GCALENDAR_SOURCE:
                    gcalEventSources.push(eventSourceCopy);
                    break;
                case EVENTSOURCE_TYPE.JSON_SOURCE:
                    jsonEventSources.push(eventSourceCopy);
					break;
				case EVENTSOURCE_TYPE.ICALENDAR_SOURCE:
					iCalendarEventSources.push(eventSourceCopy);
					break;
                default:
                    throw "Wrong events " + eventSource.events + " provided in eventSources.\nevents should be of type Function, Array<EventType> or URL feed.";
                }
				$scope.model.eventSources.push(eventSource);
            }
        } else if (eventSources) {
            throw "Wrong eventSources provided\neventSources should be of type Array.";
        }
		var resources = options["resources"];
        if (resources instanceof Function) {
			$scope.model.functionResources = resources;
		}
	}

	// update model properties;
	$scope.model.calendarOptions = options;
	$scope.model.functionEventSources = functionEventSources;
	$scope.model.arrayEventSources = arrayEventSources;
	$scope.model.gcalEventSources = gcalEventSources;
	$scope.model.jsonEventSources = jsonEventSources;
	$scope.model.iCalendarEventSources = iCalendarEventSources;
	$scope.model.hasToDraw = true;
	$scope.model.renderOnCurrentView = renderOnCurrentView;
}

/**
 * Returns the calendar config object
 *
 * @return {svy-fullcalendar.FullCalendarOptions}
 * 
 * */
$scope.api.getFullCalendarOptions = function() {
	if ($scope.model.calendarOptions) {
		return $scope.model.calendarOptions
	} else {
		return null;
	}
}


/**
 * Update the given calendar option to the given value
 * The update will force the calendar to repaint.
 * 
 * @param {String} option a single option to be updated
 * @param {Object} value
 * 
 * @example 
 * <pre>
 * 	elements.fullcalendarElementName.updateFullCalendar('scrollTime','13:00:00');
 * </pre>
 *
 * */
$scope.api.updateFullCalendar = function(option, value) {
	var options = $scope.api.getFullCalendarOptions();

	// delete options[option];	// TODO is this necessary ?
	
	options[option] = value;
	$scope.api.fullCalendar(options, true);
}

/**
 * Set the given calendar option to the given value
 * The set will force the calendar to repaint.
 * 
 * @param {String} option a single option to be setted
 * @param {Object} value
 * 
 * @example 
 * <pre>
 * 	elements.fullcalendarElementName.setOption('scrollTime','13:00:00');
 * </pre>
 *
 * */
$scope.api.setOption = function(option, value) {
	$scope.api.updateFullCalendar(option, value);
}


/**
 * @param {svy-fullcalendar.EventSourceType} eventSource
 * 
 * @example 
 * <pre>
	@type {svy-fullcalendar.EventSourceType}
	var arrayEventSource = {
		events: [{
	    	title: "source event",
			start: new Date(),
			allDay: true
		}],
		color: 'yellow'
	}
	
	elements.fullcalendarElementname.addEventSource(arrayEventSource);
 * </pre>
 * */
$scope.api.addEventSource = function(eventSource) {

	var isFunctionES = false;
	if (!eventSource) {
		throw "Illegal argument eventSource " + eventSource;
	}
	// FIXME requires a refresh if multiple eventSources are added
	// push eventSource into the typed eventSource
	switch (getEventSourceType(eventSource)) {
	case EVENTSOURCE_TYPE.FUNCTION_SOURCE:
		$scope.model.functionEventSources.push(eventSource);
		isFunctionES = true;
		break;
	case EVENTSOURCE_TYPE.ARRAY_SOURCE:
		$scope.model.arrayEventSources.push(eventSource);
		break;
	case EVENTSOURCE_TYPE.GCALENDAR_SOURCE:
		$scope.model.gcalEventSources.push(eventSource);
		break;
	case EVENTSOURCE_TYPE.JSON_SOURCE:
		$scope.model.jsonEventSources.push(eventSource);
		break;
	case EVENTSOURCE_TYPE.ICALENDAR_SOURCE:
		$scope.model.iCalendarEventSources.push(eventSource);
		break;
	default:
		throw "Wrong events " + eventSource.events + " provided in eventSources.\nevents should be of type Function, Array<EventType> or URL feed.";
	}

	if ($scope.model.eventSources == null) $scope.model.eventSources = [];
	$scope.model.eventSources.push(eventSource);

	return isFunctionES ? $scope.api.addFunctionEventSourceToCalendar(eventSource, eventSource.events) : $scope.api.addEventSourceToCalendar(eventSource);
}

/**
 * @param {Object} id
 * */
$scope.removeEventSource = function(id) {
	if (!id && id!= 0) {
		throw "Illegal argument id " + id;
	}
	
	if ($scope.model.eventSources && $scope.model.eventSources.length > 0) {

		/** @type {Array} */
		var eventSources = $scope.model.eventSources;

		// find eventSource index
		var index = getEventSourceIndexById(eventSources, id);
		var indexTyped;
		var eventSource = eventSources[index];
		if (eventSource) {
			
			// remove eventSource from typed objects
			switch (getEventSourceType(eventSource)) {
			case EVENTSOURCE_TYPE.FUNCTION_SOURCE:
				indexTyped = getEventSourceIndexById($scope.model.functionEventSources, id);
				$scope.model.functionEventSources.splice(indexTyped,1)
				break;
			case EVENTSOURCE_TYPE.ARRAY_SOURCE:
				indexTyped = getEventSourceIndexById($scope.model.arrayEventSources, id);
				$scope.model.arrayEventSources.splice(indexTyped,1)
				break;
			case EVENTSOURCE_TYPE.GCALENDAR_SOURCE:
				indexTyped = getEventSourceIndexById($scope.model.gcalEventSources, id);
				$scope.model.gcalEventSources.splice(indexTyped,1)
				break;
			case EVENTSOURCE_TYPE.JSON_SOURCE:
				indexTyped = getEventSourceIndexById($scope.model.jsonEventSources, id);
				$scope.model.jsonEventSources.splice(indexTyped,1)
				break;
			case EVENTSOURCE_TYPE.ICALENDAR_SOURCE:
				indexTyped = getEventSourceIndexById($scope.model.iCalendarEventSources, id);
				$scope.model.iCalendarEventSources.splice(indexTyped,1)
				break;
			default:
				throw "Wrong events " + eventSource.events + " provided in eventSources.\nevents should be of type Function, Array<EventType> or URL feed.";
			}

			// remove eventSource from model
			$scope.model.eventSources.splice(index, 1);
			return true;
		}
	} else {
		console.log('can\'t remove eventSources from options');
	}
	return false;
}

$scope.getEventsFromFunctionEventSource = function(functionEventSourceIndex, start, end, data) 
{
    if ($scope.model.functionEventSources[functionEventSourceIndex].events) {
		return $scope.model.functionEventSources[functionEventSourceIndex].events(start, end, data);
	}
	return [];
}
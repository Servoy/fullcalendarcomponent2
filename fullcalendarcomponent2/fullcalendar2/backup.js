/**
 * @type {scopes.svyLogManager.Logger}
 * @protected 
 *
 * @properties={typeid:35,uuid:"D1E42303-9866-4099-AE76-F5F24315B2E0",variableType:-4}
 */
var log = scopes.svyLogManager.getLogger('com.servoy.ng.components.fullcalendar.demo');

/**
 * @type {plugins.window.Popup}
 * @private 
 *
 * @properties={typeid:35,uuid:"417B9652-C939-42F7-B575-E9B02370288D",variableType:-4}
 */
var configMenu;

/**
 * @type {String}
 * Google API key. Required to use Google Calendar feeds
 * @protected  
 *
 * @properties={typeid:35,uuid:"B9794034-5F69-46C2-B483-B388BB7799C7"}
 */
var GOOGLE_API_KEY;

/**
 * The calendar object
 * @protected 
 * *
 * @properties={typeid:35,uuid:"6C27B580-FCB0-4A1D-BE1E-03D3C105BA3B",variableType:-4}
 */
var calendar;

/**
 * @type {CustomType<svy-fullcalendar2.EventSource>}
 * @protected 
 *
 * @properties={typeid:35,uuid:"78470515-071C-4417-AC4F-D2EBC983EFD4",variableType:-4}
 */
var resourceNullEventSource = {
	id: "0000-0000-0000-0000",
	events: resourceEventSourceCallback,
	textColor: 'black',
	backgroundColor: '#ffffff',
	editable: true,
	startEditable: true,
	durationEditable: true,
	allDayDefault: false
};

/**
 * Use google calendar feeds {@link http://fullcalendar.io/docs1/google_calendar/}
 *
 * Google API key is required. Obtain an API key from the google developer console {@link https://console.developers.google.com/project} and activate the google calendar API
 *
 * How to get the feed URL of a private calendar:
 *
 *  1. In the list of calendars on the left side of the page, find the calendar you want to interact with. You can create a new calendar for this purpose if you want to.
 *  2. Click the arrow button to the right of the calendar. Select "Calendar settings" from the drop-down menu. The Calendar Details page appears.
 *  3. Click "Share this Calendar", check "Make this calendar public" and make sure "Share only my free/busy information" is unchecked; save.
 *  4. In the "Calendar Address" section of the screen, you will see your Calendar ID. It will look something like "your.email@gmail.com"
 *
 * @type {CustomType<svy-fullcalendar2.EventSource>}
 *  @protected 
 *
 * @properties={typeid:35,uuid:"8084D574-8749-4B3D-8F28-6897A78D9F04",variableType:-4}
 */
var googleCalendarFeed = {
	id:'usa__en@holiday.calendar.google.com',
	googleCalendarApiKey: GOOGLE_API_KEY, // Your Google Developer API key
	googleCalendarId: 'usa__en@holiday.calendar.google.com', // Replace with YOUR_CALENDAR_ID you would like to feed
	backgroundColor: '#fff',
	borderColor: 'orange',
	textColor: 'orange',
	className: 'gcal-event'
};

/**
 * @type {Array<CustomType<svy-fullcalendar2.EventObject>>}
 * @protected 
 * @deprecated 
 *
 * @properties={typeid:35,uuid:"F8C4B11C-3C5D-4678-A271-28C0A3C0608E",variableType:-4}
 */
var evnts = [{
		title: "All day event",
		start: scopes.svyDateUtils.addDays(new Date(), -2),
		editable: true,
		rendering : 'background-inverse'

	}, {
		title: "2 day event",
		start: scopes.svyDateUtils.toStartOfDay(new Date()),
		end: new scopes.svyDateUtils.toEndOfDay(scopes.svyDateUtils.addDays(new Date(), 1)),
		allDay: true,
		editable: true
	}, {
		title: "lunch event",
		start: scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.addHours(new Date(), 12)),
		end: scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.addHours(new Date(), 13)),
		allDay: false,
		editable: true,
		rendering : 'background'
	}];

/**
 * @type {Array<CustomType<svy-fullcalendar2.EventObject>>}
 * @protected 
 * 
 * @properties={typeid:35,uuid:"6CC006E9-E23B-4461-8251-15FA6739F37F",variableType:-4}
 */
var evnts1 = {
	id : "array1",
	events: [{
		title: "All day event",
		start: scopes.svyDateUtils.addDays(new Date(), -2),
		editable: true,
		rendering : 'background'
	}, {
		title: "2 day event",
		start: scopes.svyDateUtils.toStartOfDay(new Date()),
		end: new scopes.svyDateUtils.toEndOfDay(scopes.svyDateUtils.addDays(new Date(), 1)),
		allDay: true,
		editable: true
	}, {
		title: "lunch event",
		start: scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.addHours(new Date(), 12)),
		end: scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.addHours(new Date(), 13)),
		allDay: false,
		editable: true,
		rendering : 'background'
	}]
};

/**
 * @type {svy-fullcalendar.EventSourceType}
 * @protected 
 * 
 * @properties={typeid:35,uuid:"5EF3A4B8-A002-4F9D-9971-781623AA2F16",variableType:-4}
 */
var evnts2 = {
	id : "array2",
	events: [{
		title: "lunch event",
		start: scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.addHours(new Date(), 12)),
		end: scopes.svyDateUtils.toStartOfDay(scopes.svyDateUtils.addHours(new Date(), 13)),
		allDay: false,
		editable: true
	}],
	color: 'gray'
};

/** 
 * @type {CustomType<svy-fullcalendar2.FullCalendarOptions>} 
 * 
 * @properties={typeid:35,uuid:"F51442EA-9C31-44C2-9316-FEC676E99F2B",variableType:-4}
 */
//var calendarOptions = {
//	themeSystem: 'bootstrap5',
//	customButtons: {
//		monthView: {
//			text: 'Month view',
//			click: setMonthView()
//		},
//		weekView: {
//			text: 'Week view',
//			click: setWeekView()
//		},
//		dayView: {
//			text: 'Day view',
//			click: setDayView()
//		},
//		morningTime: {
//			text: 'Morning time',
//			click: setMorningTime()
//		},
//		afternoonTime: {
//			text: 'Afternoon time',
//			click: setAfternoonTime()
//		},
//		hiddenDays: {
//			text: 'Hidden days',
//			click: setHiddenDays()
//		},
//		reloadEvents: {
//			text: 'Reload events',
//			click: reloadEvents()
//		}
//	},
//	initialView: 'dayGridMonth',
//	headerToolbar: {
//		right: 'reloadEvents dayGridMonth,timeGridWeek,timeGridDay prevYear,prev,today,next,nextYear morningTime,afternoonTime hiddenDays'
//	},
//	schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives'
//}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E5EBEBD9-290F-4971-B0BC-C9EC3E5FB4AD"}
 */
function onDemoCalendarLoad(event) {
	var fullCalendar = scopes.svyFullCalendar;
	
	/** @type {Array<CustomType<svy-fullcalendar2.EventSource>>} */
	var eventSources = [];
	
	eventSources.push(evnts1);
	eventSources.push(evnts2);
	
	application.output(eventSources);
	
	// init the calendar
	/** @type {CustomType<svy-fullcalendar2.FullCalendarOptions>} */
	var options = {
			allDayText: '',
			locale: 'en',
			businessHours: {
				startTime: '09:00',
				endTime: '20:00',
				daysOfWeek: [1,2,3,4,5,6]
			},
			initialDate : new Date(2016, 3, 27),
			initialView: fullCalendar.CALENDAR_VIEW_TYPE.AGENDAWEEK,
			editable: true,
//			eventSources : eventSources,
			eventSources: [ {events: [{ title: "lunch event", start: new Date(2016, 4, 27) }]}],
			eventConstraint: 'businessHours',
			firstDay: 1,
			handleWindowResize: true,
			headerToolbar: {
				left: 'title',
				center: '',
				right: ''
			},
			slotMinTime: "07:00",
			nowIndicator: true,
			scrollTime: "8:00",
			selectable: true,
			slotLabelFormat : "H",
			selectConstraint: 'businessHours',
			weekends: true
//			views: {
//			    dayGridMonth: { // name of view
//			      titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' }
//			      // other view-specific options here
//			    }
//			  }
//			views: {
//				agenda: {
//					slotLabelFormat: 'H(:mm)'
//				},
//				month: {
//				      columnHeaderFormat : 'dddd'
//				},
//			    week: {
//				      columnHeaderFormat : 'dd M/D'
//			    },
//			    day: {
//				      titleFormat: 'dddd M/D',
//				      columnHeaderFormat : 'dddd M/D'
//			    }
//			}
		};
	elements.fullcalendar2.fullCalendar(options);
}

/**
 * @properties={typeid:24,uuid:"441B8564-18EC-4FE0-AE33-54D08993058B"}
 * 
 * @return {CustomType<svy-fullcalendar2.FullCalendar>}
 */
function createCalendar() {
	return elements.fullcalendar2.fullCalendar(calendarOptions);
}

/**
 * @properties={typeid:24,uuid:"DC9D7D7F-410C-48CD-9A98-337F6C26FECE"}
 */
function setMonthView() {
	application.output('Set month view clicked');
}

/**
 * @properties={typeid:24,uuid:"79B560E9-B1E0-452B-B826-A06804EF46A2"}
 */
function setWeekView() {
	application.output('Set week view clicked');
}

/**
 * @properties={typeid:24,uuid:"35FB41C3-C0A5-4A77-B266-401A60DC964C"}
 */
function setDayView() {
	application.output('Set day view clicked');
}

/**
 * @properties={typeid:24,uuid:"A37E2841-49B6-4EA0-BF0F-3EFF56D3B479"}
 */
function setMorningTime() {
	application.output('Set morning time clicked');
}

/**
 * @properties={typeid:24,uuid:"5D8EE78B-C132-4830-95A2-8444ADC34D5C"}
 */
function setAfternoonTime() {
	application.output('Set afternoon time clicked');
}

/**
 * @properties={typeid:24,uuid:"B2C67CF0-5B19-40BD-9271-72022FF0E7A9"}
 */
function setHiddenDays() {
	application.output('Set hidden days clicked');
}

/**
 * @properties={typeid:24,uuid:"17EC7EC5-E79C-46BA-A7CE-D6E0CDDB30CA"}
 */
function reloadEvents() {
	application.output('Reload events clicked');
}

/**
 * @properties={typeid:24,uuid:"7B6E6D7A-BA0B-4FFA-A866-B4EBCCD01D5F"}
 */
function initConfigMenu() {
	configMenu = plugins.window.createPopupMenu();
	var menu;
	var menuItem;
	
	menu = configMenu.addMenu();
	menu.text = "hiddenDays";
	
	var hiddenDays = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];
	for (var idx = 0; idx < hiddenDays.length; idx++) {
		menuItem = menu.addCheckBox();
		menuItem.text = hiddenDays[idx];
		menuItem.selected = false;
		menuItem.setMethod(toggleHiddenDays);
		menuItem.methodArguments = ["hiddenDays", idx, 0];
		
	}
	
	menuItem = configMenu.addCheckBox();
	menuItem.text = "Weekends";
	menuItem.selected = true;
	menuItem.setMethod(toggleCalendarOption,["weekends", false]);
	menuItem.methodArguments = ["weekends", false];
}

/**
 * TODO generated, please specify type and doc for the params
 * @param itemIndex
 * @param parentIndex
 * @param isSelected
 * @param parentText
 * @param menuText
 * @param option
 * @param hiddenDay
 * @param parentIdx
 *
 * @properties={typeid:24,uuid:"F3C1CC5D-EC7F-4590-96D0-4AF7EFD35471"}
 */
function toggleHiddenDays(itemIndex, parentIndex, isSelected, parentText, menuText, option, hiddenDay, parentIdx) {
	
//	var options = calendar.getFullCalendarOptions();
//	var hiddenDays = options.hiddenDays ? options.hiddenDays : [];
//	
//	if (!isSelected) {	// hide the selected day
//		hiddenDays = hiddenDays.concat([hiddenDay]);
//	} else if (hiddenDays) {  // remove selected day from hidden day list
//		hiddenDays.splice(hiddenDays.indexOf(hiddenDay),1);
//	} else {  
//		throw 'this should not happen'
//	}
//	
//	updateCalendarOption(option, hiddenDays);
//	updateMenuSelection(itemIndex, parentIdx, isSelected, parentText, menuText);
}

/**
 * @param {Number} itemIndex
 * @param {Number} parentIndex
 * @param {Boolean} isSelected
 * @param {String} parentText
 * @param {String} menuText
 * @param {String} option the option to be toggled
 * @param {Object} value the option value
 * 
 * @private 
 *
 * @properties={typeid:24,uuid:"38086F08-0582-4193-9BEE-F8645526152A"}
 */
function toggleCalendarOption(itemIndex, parentIndex, isSelected, parentText, menuText, option, value) {
	
//	 toggle the calendar option if item is now unselected
//	updateCalendarOption(option, !isSelected);
//	updateMenuSelection(itemIndex, parentIndex, isSelected, parentText, menuText);
}

/**
 * create an event source for any resource in database saved in database.
 * Use the result to populate the calendar eventSources
 *
 * @return Array<svy-fullcalendar2.EventSource>
 * 
 * @protected 
 *
 * @properties={typeid:24,uuid:"48B06FA3-4F0A-41FA-9497-9E4F2A649F25"}
 * @AllowToRunInFind
 */
function getActiveEventSources() {
	var activeEventSources = [];
	/** @type {JSFoundSet<mem:resources>} */
	var fs = databaseManager.getFoundSet('mem:resources');
	fs.loadAllRecords();
	
	/* for any resource in foundset create a FunctionEventSourceType object.
	 * store all the sources in a form variable.
	 * is required to keep in memory the created eventSources since is necessary
	 * to provide the same object instance to the calendar ro remove or update the eventSource
	 * */
	var record;
	for (var i = 1; i <= fs.getSize(); i++) {
		record = fs.getRecord(i);
		if (record.render_flag !== 0) {
			record.render_flag = 1;
			var source = getEventSource(record);
			activeEventSources.push(source);
		}
	}
	return activeEventSources;
}

/**
* get the FunctionEventSource object for the given record
*
 * @param {JSRecord<mem:resources>} record
 * 
 * @return {CustomType<svy-fullcalendar2.EventSource>}
 * 
 * @properties={typeid:24,uuid:"EBC500CB-DA5A-42E7-9913-1E7C4822FCD2"}
 */
function getEventSource(record) {
	if (!record) {
		throw new scopes.svyExceptions.IllegalArgumentException('illegal argument foundset NULL')
	}
	
	// className can be 'icon-servoy' or 'icon-microsoft' or 'icon-google' or 'icon-apple'
	var className = 'icon-' + record.name.toLowerCase();
	
	/** @type {CustomType<svy-fullcalendar2.EventSource>} */
	var eventSource = {
		id: record.resource_id.toString(),
		events: resourceEventSourceCallback, // the callback method which is going to populate the calendar
		data: { filter: record.resource_id.toString() }, // provide to the callback method the resource_id; will be used to filter the events by resource
		backgroundColor: record.background_color,
		editable: true,
		startEditable: true,
		durationEditable: true,
		allDayDefault: false,
		className : [className]	// use className to display the event source icon
	}
	
	return eventSource
}

/**
 * @AllowToRunInFind
 * 
 * TODO generated, please specify type and doc for the params
 * @param start
 * @param end
 * @param params
 *
 * @return {Array}
 *
 * @properties={typeid:24,uuid:"13A24BE9-A739-46DE-B75D-1380BB1BA567"}
 */
function resourceEventSourceCallback(start, end, params) {
	/** @type {JSFoundSet<mem:event_object>} */
	var fs = databaseManager.getFoundSet("mem:event_object");

	if (params && params.filter) {

		// search all events with the by resource_id between start and end time
		if (fs.find()) {
			fs.start_date = '>= ' + utils.dateFormat(scopes.svyDateUtils.toStartOfDay(new Date(start)), 'dd/MM/yyyy HH:mm:ss') + '|dd/MM/yyyy HH:mm:ss';
			fs.end_date = '<= ' + utils.dateFormat(scopes.svyDateUtils.toEndOfDay(new Date(end)), 'dd/MM/yyyy HH:mm:ss') + '|dd/MM/yyyy HH:mm:ss';
			fs.event_object_to_event_resources.resource_id = application.getUUID(params.filter);
			fs.search();
		}
	} else {
		// search all events not related to any resource
		var inQuery = databaseManager.createSelect('mem:/event_resources');
		inQuery.result.add(inQuery.getColumn('event_object_id'))

		/** @type {QBSelect<mem:event_object>} */
		var query = databaseManager.createSelect('mem:/event_object');
		query.result.addPk()
		var where = query.where;
		where.add(query.columns.event_object_id.not.isin(inQuery))
		fs.loadRecords(query)
	}

	var record;
	var retval = [];
	// return the EventType objects for each record in foundset
	for (var i = 1; i <= fs.getSize(); i++) {
		record = fs.getRecord(i);
		var event = getEvent(record);
		retval.push(event)
	}
	
	return retval;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param record
 *
 * @return {CustomType<svy-fullcalendar2.EventObject>}
 * @properties={typeid:24,uuid:"4D106907-4754-4304-B678-7198FB9B9FE3"}
 */
function getEvent(record) {
	if (!record) {
		throw new scopes.svyExceptions.IllegalArgumentException('illegal argument record NULL')
	}

	// create the EventType
	/** @type {CustomType<svy-fullcalendar2.EventObject>} */
	var event = {
		id: record.event_id,
		title: record.title_event,
		start: record.start_date,
		data: { description: record.description },
		borderColor: record.border_color,
		color : record.color,
		backgroundColor: record.background_color,
		textColor: record.text_color
	}
	
	if (utils.hasRecords(record, 'event_object_to_event_resources.event_resources_to_resources')) {
		className: ['icon-' + record.event_object_to_event_resources.event_resources_to_resources.name.toLowerCase()];	// use css class to show an icon in the calendar event
	}
	
	if (record.end_date) { // set end time if exist
		event.end = record.end_date;
	}
	if (record.allday) { // set allDay property
		event.allDay = true
	} else {
		event.allDay = false
	}
	
	if (utils.hasRecords(record, "event_object_to_event_resources") && record.event_object_to_event_resources.resource_id) {
		// Used only in Web Client
		event.source = record.event_object_to_event_resources.resource_id.toString();
		// Used only for scheduler calendar
		// eventObject.resourceIds = getResources(record);
	} else { 
		event.source = resourceNullEventSource;
	}
	
	return event;
}


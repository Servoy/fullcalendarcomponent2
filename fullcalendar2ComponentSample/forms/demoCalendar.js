/**
 * @type {String}
 * @properties={typeid:35,uuid:"1CE4ABE1-DEA8-410F-ADDB-065BBF8A3EAB"}
 */
var dlgReturnedValue = '';

/**
 * @type {boolean}
 *
 * @properties={typeid:35,uuid:"2DF866C1-17E8-4368-9F9B-F1B7BA75B24A",variableType:-4}
 */
var isNewEvent;

/**
 * @type {plugins.window.Popup}
 *
 * @properties={typeid:35,uuid:"CD8B4847-D3CC-4A0E-862C-66C52D26EDAC",variableType:-4}
 */
var configMenu;

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"837AD96E-9F01-42BE-8DF0-AF5D1275CF98",variableType:93}
 */
var dateSelector = new Date(2024, 0, 8);

/**
 * The calendar object 
 *
 * @type {CustomType<svy-fullcalendar2.FullCalendar>}
 *
 * @properties={typeid:35,uuid:"82D00C74-E480-4918-AC81-7E66286B3F45",variableType:-4}
 */
var calendar;

/**
 * @type {Array<CustomType<svy-fullcalendar2.EventObject>>}
 * 
* @properties={typeid:35,uuid:"F955EBDC-1308-45ED-A84A-596EF0031173",variableType:-4}
*/
var evnts1 = {
	id: "array1",
	events: [
		{
			title: "All day event",
			start: scopes.svyUtils.addDays(new Date(), -2),
			editable: true,
			allDay: true
		}, 
		{
			title: "2 day event",
			start: formatDateForEvent(new Date()),
			end: formatDateForEvent(scopes.svyUtils.addDays(new Date(), 2)),
			editable: true
		}
	]
};

/**
* @properties={typeid:35,uuid:"57071CB1-D77E-43C4-A181-24E8AE707ACB",variableType:-4}
*/
var evnts2 = {
	id : "array2",
	events: [{
		title: "lunch event",
		start: scopes.svyUtils.addHours(scopes.svyUtils.toStartOfDay(new Date()), 12),
		end: scopes.svyUtils.addHours(scopes.svyUtils.toStartOfDay(new Date()), 13),
		allDay: false,
		editable: true
	}],
	color: 'gray'
};

/**
* @properties={typeid:35,uuid:"7ABD5008-2326-4C91-992C-DB50748C8CDC",variableType:-4}
*/
var resourceNullEventSource = {
	id: "0000-0000-0000-0000",
	events: resourceEventSourceCallback,
	editable: true,
	startEditable: true,
	durationEditable: true,
	allDayDefault: false
};

/**
* @properties={typeid:35,uuid:"949424A1-5ECD-442D-BA59-FF70D446B75A",variableType:-4}
*/
var calendarOptions = {
	height: "100%",
	allDayText: '',
	allDaySlot: true,
	stickyHeaderDates: 'auto',
	locale: 'en',
	businessHours: {
		start: '09:00',
		end: '20:00',
		daysOfWeek: [1,2,3,4,5,6]
	},
	initialView: scopes.svyData.CALENDAR_VIEW_TYPE.AGENDAWEEK,
	initialDate : new Date(2024, 0, 8),
	editable: true,
	eventSources: [],
	eventConstraint: 'businessHours',
	handleWindowResize: true,
	firstDay: 1,
	headerToolbar: {
		left: 'title',
		center: '',
		right: ''
	},
	slotMinTime: "07:00",
	nowIndicator: true,
	scrollTime: "8:00",
	selectable: true,
	selectConstraint: 'businessHours',
	weekends: true,
	views: {
		timeGridWeek: {
			slotLabelFormat: { hour: 'numeric', minute: '2-digit', omitZeroMinute: true, meridiem: false, hour12: false}
		},
		timeGridDay: {
			slotLabelFormat: { hour: 'numeric', minute: '2-digit', omitZeroMinute: true, meridiem: false, hour12: false}
		}
	},
	schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives'
};

/**
 * @param date
 *
 * @return {String}
 * @properties={typeid:24,uuid:"3F9F008F-2338-4CCD-833E-542CB192DC2E"}
 */
function formatDateForEvent(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // getMonth() is zero-based
    var day = date.getDate();

    // Add leading zero to month and day if they are less than 10
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    var retVal = year + '-' + month + '-' + day;
    return retVal;
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"70194452-6EAB-453F-9442-3142DF2DD440"}
 */
function onLoad(event) {
	scopes.svyData.loadDbData();
	calendar = elements.fullcalendar2;
	
	initConfigMenu();
	
	calendarOptions.eventSources = getEventSources();
	
	calendar.fullCalendar(calendarOptions);
}

/**
 * @properties={typeid:24,uuid:"7E945AEB-61B2-484B-9ECC-D678015D6DCE"}
 */
function getEventSources() {
	/** @type {Array<CustomType<svy-fullcalendar2.EventSource>>} */
	var eventSources = [];
	
	eventSources = eventSources.concat(getActiveEventSources());
	eventSources.push(resourceNullEventSource);
	eventSources.push(evnts1);
	eventSources.push(evnts2);
	
	return eventSources;
}

/**
 * @param {Number} itemIndex
 * @param {Number} parentIndex
 * @param {Boolean} isSelected
 * @param {String} parentText
 * @param {String} menuText
 * @param {String} option the option to be toggled
 * @param {Object} hiddenDay the hidden day to be toggled
 * @param {Number} [parentIdx] optional param
 *
 * @properties={typeid:24,uuid:"FECDE26B-0516-46C6-9C26-5ACD29BF797F"}
 */
function toggleHiddenDays(itemIndex, parentIndex, isSelected, parentText, menuText, option, hiddenDay, parentIdx) {
	
	var options = calendar.getFullCalendarOptions();
	var hiddenDays = options.hiddenDays ? options.hiddenDays : [];
	
	if (!isSelected) {	// hide the selected day
		hiddenDays = hiddenDays.concat([hiddenDay]);
	} else if (hiddenDays) {  // remove selected day from hidden day list
		hiddenDays.splice(hiddenDays.indexOf(hiddenDay),1);
	} else {  
		throw 'Error hidden days'; //this shouldn't happen
	}
	
	updateCalendarOption(option, hiddenDays);
	updateMenuSelection(itemIndex, parentIdx, isSelected, parentText, menuText);
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
 * @properties={typeid:24,uuid:"1FB0C7C0-D986-4A27-B3D8-DA7E2145B203"}
 */
function toggleCalendarOption(itemIndex, parentIndex, isSelected, parentText, menuText, option, value) {
	
	// toggle the calendar option if item is now unselected
	updateCalendarOption(option, !isSelected);
	updateMenuSelection(itemIndex, parentIndex, isSelected, parentText, menuText);
}

/**
 * Update the calendar option with the given value
 * 
 * @param {String} option the option of the calendar to be updated
 * @param {Object} value the value to update the option
 * @private 
 *
 * @properties={typeid:24,uuid:"CFDB4EFD-C9F3-40CC-AD42-61F7367A54D5"}
 */
function updateCalendarOption(option, value) {
	calendar.updateFullCalendar(option, value);
}

/**
 * update the menuItem selected property
 * @param {Number} itemIndex
 * @param {Number} parentIndex
 * @param {Boolean} isSelected
 * @param {String} parentText
 * @param {String} menuText
 * @private 
 *
 * @properties={typeid:24,uuid:"CE72A5DC-CF21-4FB1-BBCA-C25939F9D98D"}
 */
function updateMenuSelection(itemIndex, parentIndex, isSelected, parentText, menuText) {
	var menu;
	if (parentIndex === -1) {
		menu = configMenu;
	} else if (parentIndex != -1) {
		menu = configMenu.getItem(parentIndex);
	} 
	
	var menuItem = menu.getItem(itemIndex);
	
	if (menuItem) {
		menuItem.selected = isSelected ? false : true;
	}
	
}

/**
 * @AllowToRunInFind
 * FunctionEventSourceType callback method.
 * Populate the calendar with the returned array of EventType object for any event_object related to the resource
 *
 *
 * @return {Array<CustomType<svy-fullcalendar2.EventParsing>>}
 * @private 
 *
 * @properties={typeid:24,uuid:"2ACE20A8-1921-46A3-BB61-46F6D029892A"}
 * @AllowToRunInFind
 */
function resourceEventSourceCallback(start, end, params) {
	/** @type {JSFoundSet<mem:event_objects>} */
	var fs = databaseManager.getFoundSet("mem:event_objects");

	if (params && params.filter) {

		// search all events with the by resource_id between start and end time
		if (fs.find()) {
			fs.start_date = '>= ' + scopes.svyUtils.dateFormat(scopes.svyUtils.toStartOfDay(new Date(start)), 'dd/MM/yyyy HH:mm:ss') + '|dd/MM/yyyy HH:mm:ss';
			fs.end_date = '<= ' + scopes.svyUtils.dateFormat(scopes.svyUtils.toEndOfDay(new Date(end)), 'dd/MM/yyyy HH:mm:ss') + '|dd/MM/yyyy HH:mm:ss';
			var obj = application.getUUID(params.filter);
			fs.event_object_to_resources.resource_id = obj;
			fs.search();
		}
	} 

	var record;
	var retval = [];
	// return the EventParsing objects for each record in foundset
	for (var i = 1; i <= fs.getSize(); i++) {
		record = fs.getRecord(i);
		var event = getEvent(record);
		retval.push(event)
	}
	
	return retval;
}

/**
 * @AllowToRunInFind
 * 
 * create an event source for any resource in database saved in database.
 * Use the result to populate the calendar eventSources
 *
 * @return Array<svy-fullcalendar.EventSourceType>
 * 
 * @protected 
 * 
 * @properties={typeid:24,uuid:"8E7CEE2F-B19F-4106-871C-2FA715159E45"}
 */
function getActiveEventSources() {
	var activeEventSources = [];
	/** @type {JSFoundSet<mem:resources>} */
	var fs = databaseManager.getFoundSet('mem:resources');
	fs.loadAllRecords();
	
	/* for any resource in foundset create a FunctionEventSource object.
	 * store all the sources in a form variable.
	 * is required to keep in memory the created eventSources since is necessary
	 * to provide the same object instance to the calendar or remove or update the eventSource
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
 * TODO generated, please specify type and doc for the params
 * @param record
 * 
 * @return {CustomType<svy-fullcalendar2.EventParsing>}
 *
 * @properties={typeid:24,uuid:"D515808F-4E32-479A-92FA-8E5D9E3D5237"}
 */
function getEvent(record) {
	if (!record) {
		throw new scopes.svyExceptions.IllegalArgumentException('illegal argument record NULL')
	}
	// create the EventType
	/** @type {CustomType<svy-fullcalendar2.EventParsing>} */
	var event = {
		id: record.event_object_id,
		title: record.title_event,
		start: record.start_date,
		data: { description: record.description },
		color : record.event_object_to_resources.fg_color,
		textColor: record.event_object_to_resources.text_color,
		hour12: false
	}
	
	if (record.end_date) { // set end time if exist
		event.end = record.end_date;
	}
	if (record.allday) { // set allDay property
		event.allDay = true
	} else {
		event.allDay = false
	}
	
	if (utils.hasRecords(record, "event_object_to_resources") && record.event_object_to_resources.resource_id) {
		// Used only in Web Client
		event.source = record.event_object_id.toString();
	} else { 
		event.source = resourceNullEventSource;
	}
	
	return event;
}

/**
* get the FunctionEventSource object for the given record
*
* @param {JSRecord<mem:resources>} record
* @protected 
*
* @return {CustomType<svy-fullcalendar2.EventSource>}
 *
 * @properties={typeid:24,uuid:"005368E4-58A4-477F-AD87-58867EA08FB2"}
 */
function getEventSource(record) {
	if (!record) {
		throw new scopes.svyExceptions.IllegalArgumentException('illegal argument foundset NULL')
	}

	
	/** @type {CustomType<svy-fullcalendar2.EventSource>} */
	var eventSource = {
		id: record.resource_id.toString(),
		events: resourceEventSourceCallback, // the callback method which is going to populate the calendar
		data: { filter: record.resource_id.toString() }, // provide to the callback method the resource_id; will be used to filter the events by resource
		editable: true,
		startEditable: true,
		durationEditable: true,
		defaultAllDay: false
	}
	
	return eventSource;
}

/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
 *
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"3572F11B-EF62-46D3-8739-4D08262C5A0E"}
 */
function onDataChange(oldValue, newValue, event) {
	calendar.gotoDate(newValue)
	return true
}

/**
 * Called when the columns data is changed.
 *
 * @param {Number} foundsetindex
 * @param {Number} [columnindex]
 * @param [oldvalue]
 * @param [newvalue]
 * @param {JSEvent} [event]
 * @param {JSRecord} [record]
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"818C2F1D-CBDA-48EF-BC5B-839A2D33987A"}
 */
function onColumnDataChange(foundsetindex, columnindex, oldvalue, newvalue, event, record) {
	if (newvalue == 1) {
		eventResourceAdd(record);
	} else if (newvalue == 0) {
		eventResourceRemove(record);
	}
	return true;
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"080A6588-01E8-463E-89D6-B07346BB721F"}
 */
function today(event) {
	calendar.today();

}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"139E85D7-7E70-4F31-8E1D-0DB1A5634367"}
 */
function refetchEvents(event) {
	calendar.refetchEvents();
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"C7F665F6-4D1A-412F-8D1B-ECBBAE774785"}
 */
function monthView(event) {
	calendar.changeView(scopes.svyData.CALENDAR_VIEW_TYPE.MONTH);
	
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"D8A9629D-ACC5-4A5E-994D-2E76AED3581C"}
 */
function weekView(event) {
	calendar.changeView(scopes.svyData.CALENDAR_VIEW_TYPE.AGENDAWEEK);
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"A34BD8F7-F4A5-404B-9BB2-28ED27347B2D"}
 */
function dayView(event) {
	calendar.changeView(scopes.svyData.CALENDAR_VIEW_TYPE.AGENDADAY);
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"CAE96EC9-57B8-4583-922F-AA5A4CF52B79"}
 */
function prevYear(event) {
	calendar.prevYear()
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"37DD6185-60D2-42D7-B6DD-24DE3E0FC46F"}
 */
function prev(event) {
	calendar.prev()
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"5DA751B1-AE46-4679-AA2F-F525C4CBF2CF"}
 */
function next(event) {
	calendar.next()
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"E53F08DA-1311-4BCB-B1CE-0DADDF2B3342"}
 */
function nextYear(event) {
	calendar.nextYear()
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"1E04BD08-A5E3-42F8-BB15-5A3C2F68801C"}
 */
function gotoMorningTime(event) {
	calendar.scrollToTime('08:00');
}

/**
 * @properties={typeid:24,uuid:"7661007B-2B72-4BA5-A7EE-2ECFD3FF7AA3"}
 */
function gotoNoonTime() {
	calendar.scrollToTime('14:00');
}

/**
 * @properties={typeid:24,uuid:"75AE89BF-502E-4AF5-AC0D-DB83F6E5B9E2"}
 */
function initConfigMenu() {
	configMenu = plugins.window.createPopupMenu();
	var menu;
	var menuItem;
	
	menu = configMenu.addMenu();
	menu.text = "hiddenDays";
	
	var hiddenDays = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];
	for (var i = 0; i < hiddenDays.length; i++) {
		menuItem = menu.addCheckBox();
		menuItem.text = hiddenDays[i];
		menuItem.selected = false;
		menuItem.setMethod(toggleHiddenDays);
		menuItem.methodArguments = ["hiddenDays", i, 0];
		
	}
	
	menuItem = configMenu.addCheckBox();
	menuItem.text = "Weekends";
	menuItem.selected = true;
	menuItem.setMethod(toggleCalendarOption,["weekends", false]);
	menuItem.methodArguments = ["weekends", false];
}

/**
 * @return {plugins.window.Popup} configMenu
 * @properties={typeid:24,uuid:"7530EB16-4068-45CD-88F0-5A0883D5529D"}
 */
function getConfigMenu() {
	return this.configMenu;
}

/**
 * @param record
 *
 * @properties={typeid:24,uuid:"636CC08E-1EEA-4F96-929D-B9AD8034372D"}
 */
function eventResourceAdd(record) {
	var eventSource = getEventSource(record);
	if (eventSource) {	// TODO eventSources ?
		calendar.addEventSource(eventSource);
	}
}

/**
 * @param record
 *
 * @properties={typeid:24,uuid:"F7B43BB0-831F-4491-9500-F08E5DFDD64A"}
 */
function eventResourceRemove(record) {
	var eventSource = getEventSource(record);
	if (eventSource) {
		calendar.removeEventSource(eventSource.id.toString());
	}
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"9F28010F-7AC6-481A-A941-32FCBCA5C20E"}
 */
function onNewEvent(event) {
	scopes.svyData.setEventObject(null);
	isNewEvent = true;
	plugins.window.showFormPopup(null,forms.eventDialog, this, 'dlgReturnedValue', null, null, null, null, false, true, eventsCallback);
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"40D907E7-8B82-42EB-8205-A11F65249B23"}
 */
function onDeleteEvent(event) {
	elements.eventsGrid.myFoundset.foundset.deleteRecord();
	calendar.refetchEvents();
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"D5EB5B8A-F093-477B-AB7C-588B76632AEF"}
 */
function onEditEvent(event) {
	isNewEvent = false;
	var record = elements.eventsGrid.myFoundset.foundset.getSelectedRecord();
	if (record.editable == 0) {
		plugins.dialogs.showErrorDialog('Read only', 'This event is set to "Read only" mode');
		return;
	}
	scopes.svyData.setEventObject(record);
	plugins.window.showFormPopup(null,forms.eventDialog, this, 'dlgReturnedValue', null, null, null, null, false, true, eventsCallback);
}

/**
 * <b>onEventClickMethodID</b> will be called when the user clicks an event.
 *
 * @param {CustomType<svy-fullcalendar2.EventObject>} event
 * @param {JSEvent} jsEvent
 * @param {CustomType<svy-fullcalendar2.ViewType>} view
 *
 * @properties={typeid:24,uuid:"A5E343E1-FF71-41DC-AD61-795A9CC48510"}
 * @AllowToRunInFind
 */
function onEventClick(event, jsEvent, view) {
	if (event.id != null) {
		elements.eventsGrid.myFoundset.foundset.selectRecord(event.id);
	}
}

/**
 * @properties={typeid:24,uuid:"BDA50114-D1F1-4807-8DB6-80783D2DCB16"}
 */
function eventsCallback() {
	if (dlgReturnedValue == 'Cancel') return;
	if (isNewEvent) {
		elements.eventsGrid.myFoundset.foundset.newRecord();
	}
	var record = elements.eventsGrid.myFoundset.foundset.getSelectedRecord();
	record.title_event = scopes.svyData.title;
	record.start_date = scopes.svyData.startDate;
	record.end_date = scopes.svyData.endDate;
	record.allday = scopes.svyData.allDay;
	record.resource_id = getResourceId(scopes.svyData.groupName);
	record.description = scopes.svyData.description;
	if (isNewEvent) {
		record.editable = 0;
		databaseManager.saveData();
	}
	calendar.refetchEvents();
}

/**
 * The number of resources is very small so we may use a regular loop for iteration without having performance issues 
 * @param resourceName
 * 
 * @return {UUID} the resource id or -1;
 *
 * @properties={typeid:24,uuid:"FE667075-C490-470E-AE6F-31A02DF840D6"}
 */
function getResourceId(resourceName) {
	var index = 1; //foundset is 1 index based
	var record = foundset.getRecord(index);
	while (record != null) {
		if (record.name == resourceName) {
			return record.resource_id;
		}
		index++;
		record = foundset.getRecord(index);
	}
	return null;
}

/**
 * Called when the mouse is clicked on a row/cell (foundset and column indexes are given).
 * the foundsetindex is always -1 when there are grouped rows
 *
 * @param {Number} foundsetindex
 * @param {Number} [columnindex]
 * @param {JSRecord} [record]
 * @param {JSEvent} [event]
 *
 * @properties={typeid:24,uuid:"A4A13AF2-52D5-4447-97D0-F4AEDA1164B4"}
 */
function onCellDoubleClick(foundsetindex, columnindex, record, event) {
	onEditEvent(event);
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"064B4F89-1FA9-4F84-9D09-5657306C792A"}
 */
function onEditResource(event) {
	var record = foundset.getSelectedRecord();
	scopes.svyData.setResourceObject(record);
	plugins.window.showFormPopup(null,forms.resourcesDialog, this, 'dlgReturnedValue', null, null, null, null, false, true, resourcesCallback);

}

/**
 * @properties={typeid:24,uuid:"5567C704-11F8-4262-A19D-8253726A76B3"}
 */
function resourcesCallback() {
	if (dlgReturnedValue == 'Cancel') return;
	var record = foundset.getSelectedRecord();
	record.fg_color = scopes.svyData.resourceColor;
	record.text_color = scopes.svyData.resourceTxtColor;
	calendar.refetchEvents();
}

/**
 * Called when the mouse is clicked on a row/cell (foundset and column indexes are given).
 * the foundsetindex is always -1 when there are grouped rows
 *
 * @param {Number} foundsetindex
 * @param {Number} [columnindex]
 * @param {JSRecord} [record]
 * @param {JSEvent} [event]
 *
 * @properties={typeid:24,uuid:"6BF29450-B9C7-4C76-87E0-689172723557"}
 */
function onResDoubleClick(foundsetindex, columnindex, record, event) {
	onEditResource(event);
}

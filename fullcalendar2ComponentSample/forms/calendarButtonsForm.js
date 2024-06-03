/**
 * @param event
 *
 * @properties={typeid:24,uuid:"8D819828-3853-4B48-ABB3-DD4FE376C1D6"}
 */
function today(event) {
	forms.demoCalendar.today(event);

}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"14B1E765-9F04-49A4-8D4F-0B7A16A21D4D"}
 */
function refetchEvents(event) {
	forms.demoCalendar.refetchEvents(event);
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"436E45E9-BA22-4D09-B8FB-D6FB9CA0026C"}
 */
function monthView(event) {
	forms.demoCalendar.monthView(event);
	updateUI(event);
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"3D7A6057-B538-44EE-A83F-1F9CD37B1970"}
 */
function weekView(event) {
	forms.demoCalendar.weekView(event);
	updateUI(event);
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"51E783A2-4D34-4D9E-9D92-16931ADC67A4"}
 */
function dayView(event) {
	forms.demoCalendar.dayView(event);
	updateUI(event);
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"DC5027EA-712D-47C5-89D7-B7D629D3437F"}
 */
function updateUI(event) {
	elements.btnDayView.removeStyleClass('btn-primary');
	elements.btnWeekView.removeStyleClass('btn-primary');
	elements.btnMonthView.removeStyleClass('btn-primary');
	var btn = elements[event.getElementName()];
	if (btn) {
		btn.addStyleClass('btn-primary');
	}
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"AF1D0C41-7838-486F-9341-AC29E5869491"}
 */
function prevYear(event) {
	forms.demoCalendar.prevYear(event);
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"1E0C243D-D382-4EAD-A939-00E551CF5D35"}
 */
function prev(event) {
	forms.demoCalendar.prev(event);
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"F43F438D-902F-46E0-B2F6-142BB84CEA5A"}
 */
function next(event) {
	forms.demoCalendar.next(event);
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"79FB978F-EFA4-47EF-929F-8EE36B2BDD36"}
 */
function nextYear(event) {
	forms.demoCalendar.nextYear(event);
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"4D87B96F-54F7-478A-917D-4F684DDB7796"}
 */
function gotoMorningTime(event) {
	forms.demoCalendar.gotoMorningTime(event);
}

/**
 * @properties={typeid:24,uuid:"CC5E36D9-27CA-4A3D-B3C4-06F8CD5A8963"}
 */
function gotoNoonTime() {
	forms.demoCalendar.gotoNoonTime();
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"AC0BBACC-E550-4277-A521-66406F2FDC75"}
 */
function showPopupMenu(event) {
	var element = elements[event.getElementName()];
	/** @type {plugins.window.Popup} */
	var configMenu = forms.demoCalendar.getConfigMenu();
	configMenu.show(element, 1, element.getHeight());
}

/**
 * @param {Number} itemIndex
 * @param {Number} parentIndex
 * @param {Boolean} isSelected
 * @param {String} parentText
 * @param {String} menuText
 * @param {String} option the option to be toggled
 * @param {Object} value the option value
 * @properties={typeid:24,uuid:"F9F3CA93-B36D-4E84-975A-D6986966AD1C"}
 */
function toggleCalendarOption(itemIndex, parentIndex, isSelected, parentText, menuText, option, value) {
	forms.demoCalendar.toggleCalendarOption(itemIndex,parentIndex,isSelected,parentText,menuText,option,value);	
}

/**
 * @param itemIndex
 * @param parentIndex
 * @param isSelected
 * @param parentText
 * @param menuText
 * @param option
 * @param hiddenDay
 * @param parentIdx
 *
 * @properties={typeid:24,uuid:"CED6ADE9-071E-479F-B737-6D0216BD818B"}
 */
function toggleHiddenDays(itemIndex, parentIndex, isSelected, parentText, menuText, option, hiddenDay, parentIdx) {
	forms.demoCalendar.toggleHiddenDays(itemIndex,parentIndex,isSelected,parentText,menuText,option,hiddenDay);
}

/**
 * @properties={typeid:24,uuid:"0C6370DC-0EBA-497F-97D4-425EE89CD626"}
 */
function onShow() {
	elements.title.requestFocus();
	elements.group.valuelist.name = scopes.svyData.groupName;
	plugins.window.createShortcut('ENTER',onEnter, controller.getName());
	plugins.window.createShortcut('ESC',dismiss, controller.getName());
}

/**
 * @properties={typeid:24,uuid:"4E4B8639-8865-45E1-98EF-C47F65FCD315"}
 */
function onEnter() {
	plugins.window.closeFormPopup('Ok');
	
}

/**
 * @properties={typeid:24,uuid:"79F6009B-A9C2-4E42-A51F-71405440759A"}
 */
function dismiss() {
	plugins.window.closeFormPopup('Cancel');	
}

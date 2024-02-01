/**
 * @properties={typeid:24,uuid:"92AA2D32-F704-4E7D-8089-4B3385015A7B"}
 */
function onShow() {
	elements.cb_resColor.requestFocus();
	elements.cb_resColor.valuelist.name = scopes.svyData.resourceName;
	plugins.window.createShortcut('ENTER',onEnter, controller.getName());
	plugins.window.createShortcut('ESC',dismiss, controller.getName());
}

/**
 * @properties={typeid:24,uuid:"3D8FA4E7-B710-4F49-B0D9-A8E1B8F3FFAF"}
 */
function onEnter() {
	plugins.window.closeFormPopup('Ok');
	
}

/**
 * @properties={typeid:24,uuid:"5B9CBEE9-81A7-4B44-B9BF-3A63CBEE2A28"}
 */
function dismiss() {
	plugins.window.closeFormPopup('Cancel');	
}

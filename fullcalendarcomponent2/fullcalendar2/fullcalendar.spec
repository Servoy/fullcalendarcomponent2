{
	"name": "svy-fullcalendar2",
	"displayName": "FullCalendar2",
	"categoryName": "Visualization",
	"doc": "fullcalendarcomponent2/fullcalendar2/fullcalendar_doc.js",
	"icon" : "fullcalendarcomponent2/fullcalendar2/fullcalendar.png",
	"definition": "fullcalendarcomponent2/fullcalendar2/fullcalendar.js",
	"serverscript": "fullcalendarcomponent2/fullcalendar2/fullcalendar_server.js",
	"version": 1,
	"model":
	{
		"hasToDraw": {"type":"boolean", "pushToServer" : "shallow", "tags": {"scope": "private"}},
		"renderOnCurrentView": {"type":"boolean", "pushToServer" : "allow", "tags": {"scope": "private"}},
		"calendarOptions" : {"type":"FullCalendarOptions", "pushToServer" : "allow", "tags": {"scope": "private"}},
		"view" : {"type" : "object", "pushToServer": "allow", "tags" : {"scope" : "private"}},
		"events": {"type": "EventObject[]", "tags" : {"scope" : "private"}},
		"eventSources" : {"type": "EventSource[]", "tags" : {"scope" : "private"}},
		"arrayEventSources" : {"type": "ArrayEventSource[]", "tags" : {"scope" : "private"}},
		"functionEventSources" : {"type": "FunctionEventSource[]", "tags" : {"scope" : "private"}},
		"jsonEventSources" : {"type": "JSONEventSource[]", "tags" : {"scope" : "private"}},
		"iCalendarEventSources" : {"type": "iCalendarEventSource[]", "tags" : {"scope" : "private"}},
		"gcalEventSources" : {"type": "GoogleCalendarEventSource[]", "tags" : {"scope" : "private"}},
		"functionResources" : {"type": "function", "tags" : {"scope" : "private"}},
		"styleClass" : {"type": "styleclass"},
		"themeSystem" : { "type" :"string", "tags": { "scope" :"design" }, "default": "standard", "values" :["standard", "bootstrap5"]},
		"tooltipExpression" : {"type": "tagstring"}
	},
	"handlers": {
		"onSelectMethodID": {
			"parameters" : [{
					"type": "date",
				 	"name": "start"
				 }, {
					"type": "date",
					"name": "end"
				 }, {
					"type": "string",
				 	"name": "startStr"
				 }, {
					"type": "string",
					"name": "endStr"
				 }, {
				    "type": "boolean",
				    "name": "allDay"
				 }, {
				 	"type": "JSEvent",
				 	"name": "jsEvent"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				 }, {
				 	"type": "ResourceObject",
				 	"name": "resource",
				 	"optional" : true
				}],
			"doc" : "<b>onSelectMethodID</b> will be called when a date/time selection is made."
		},
		"onUnselectMethodID": {
			"parameters" : [{
				 	"type": "JSEvent",
				 	"name": "jsEvent"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				 }],
			"doc" : "<b>onUnselectMethodID</b> will be called when the current selection is cleared."
		},
		"onDateClickMethodID": {
			"parameters" : [{
					"type": "date",
				 	"name": "date"
				 }, {
					"type": "string",
				 	"name": "dateStr"
				 },{
					"type": "object",
				 	"name": "dayEl"
				 },{
				 	"type": "JSEvent",
				 	"name": "jsEvent"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				 }, {
				 	"type": "ResourceObject",
				 	"name": "resource",
				 	"optional" : true
				}],
			"doc" : "<b>onDateClickMethodID</b> will be called when the user clicks on a date or a time."
		},
		"onNavLinkDayClickMethodID": {
            "parameters" : [{
                    "type": "date",
                    "name": "date"
                 }, {
                    "type": "JSEvent",
                    "name": "jsEvent"
                 }],
            "doc" : "<b>onNavLinkDayClickMethodID</b> when navLinks setting is true, will be called when the user clicks on a day. onDateClickMethodID will not be called in this scenario."
        },
        "onNavLinkWeekClickMethodID": {
            "parameters" : [{
                    "type": "date",
                    "name": "date"
                 }, {
                    "type": "JSEvent",
                    "name": "jsEvent"
                 }],
            "doc" : "<b>onNavLinkWeekClickMethodID</b> when navLinks setting is true, will be called when the user clicks on a week."
        },
		"onEventClickMethodID": {
			"parameters" : [{
					"type": "EventObject",
				 	"name": "event"
				 }, {
				 	"type": "JSEvent",
				 	"name": "jsEvent"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				}],
			"doc" : "<b>onEventClickMethodID</b> will be called when the user clicks an event."
		},
		"onEventAddMethodID": {
			"parameters" : [{
					"type": "EventObject",
				 	"name": "event"
				 }, {
					"type": "EventObject[]",
				 	"name": "relatedEvents"
				}],
			 "returns":  { "type": "boolean", "doc": "if it returns false, the event add action will be reverted, otherwise (true) the action is considered valid", "default": true },
			 "doc" : "<b>onEventAddMethodID</b> will be called after an event has been added to the calendar."
		},
		"onEventRemoveMethodID": {
			"parameters" : [{
					"type": "EventObject",
				 	"name": "event"
				 }, {
					"type": "EventObject[]",
				 	"name": "relatedEvents"
				}],
			"returns":  { "type": "boolean", "doc": "if it returns false, the event remove action will be reverted, otherwise (true) the action is considered valid", "default": true },
			"doc" : "<b>onEventRemoveMethodID</b> will be called after an event has been removed from the calendar."
		},
		"onEventChangeMethodID": {
			"parameters" : [{
					"type": "EventObject",
				 	"name": "event"
				 }, {
					"type": "EventObject",
				 	"name": "oldEvent"
				 }, {
					"type": "EventObject[]",
				 	"name": "relatedEvents"
				}],
			"returns":  { "type": "boolean", "doc": "if it returns false, the event change action will be reverted, otherwise (true) the action is considered valid", "default": true },
			"doc" : "<b>onEventChangeMethodID</b> will be called after an event has been modified in some way."
		},
		"onEventsSetMethodID": {
			"parameters" : [{
					"type": "EventObject[]",
				 	"name": "events"
				 }],
			"doc" : "<b>onEventsSetMethodID</b> will be called after event data is initialized OR changed in any way."
		},
		"onWindowResizeMethodID": {
			"parameters" : [{
					"type": "ViewType",
				 	"name": "view"
				 }],
			"doc" : "<b>onWindowResizeMethodID</b> will be called after the calendar’s dimensions have been changed due to the browser window being resized."
		},
		"onViewDidMountMethodID": {
			"parameters" : [{
					"type": "ViewType",
				 	"name": "view"
				 }],
			"doc" : "<b>onViewDidMountMethodID</b> will be called right after the view has been added to the DOM."
		},
		"onViewWillUnmountMethodID": {
			"parameters" : [{
					"type": "ViewType",
				 	"name": "view"
				 }],
			"doc" : "<b>onViewWillUnmountMethodID</b> will be called right before the view will be removed from the DOM."
		},
		"onEventResizeMethodID": {
			"parameters" : [{
					"type": "EventObject",
				 	"name": "event"
				 }, {
					"type": "EventObject[]",
				 	"name": "relatedEvents"
				 }, {
					"type": "int",
					"name": "delta"
				 }, {
				 	"type": "JSEvent",
				 	"name": "jsEvent"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				}],
			"returns":  { "type": "boolean", "doc": "if it returns false, the event resize action will be reverted, otherwise (true) the action is considered valid", "default": true },
			"doc" : "<b>onEventResizeMethodID</b> will be called when resizing stops and the event has changed in duration."
		},
		"onEventDropMethodID": {
			"parameters" : [{
					"type": "EventObject",
				 	"name": "event"
				 }, {
					"type": "EventObject[]",
				 	"name": "relatedEvents"
				 }, {
					"type": "EventObject",
				 	"name": "oldEvent"
				 }, {
					"type": "ResourceObject",
				 	"name": "oldResource"
				 }, {
					"type": "ResourceObject",
				 	"name": "newResource"
				 }, {
					"type": "object",
					"name": "delta"
				 }, {
					"type": "object",
					"name": "element"
				 }, {
				 	"type": "JSEvent",
				 	"name": "jsEvent"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				}],
			"returns":  { "type": "boolean", "doc": "if it returns false, the event drop action will be reverted, otherwise (true) the action is considered valid", "default": true },
			"doc" : "<b>onEventDropMethodID</b> will be called when dragging stops and the event has moved to a different day/time."
		},
		"onDropMethodID": {
			"parameters" : [{
					"type": "boolean",
				 	"name": "allDay"
				 }, {
					"type": "date",
					"name": "date"
				 }, {
					"type": "string",
					"name": "dateStr"
				 }, {
					"type": "object",
					"name": "draggedElement"
				 }, {
				 	"type": "JSEvent",
				 	"name": "jsEvent"
				 }, {
				 	"type": "ResourceObject",
				 	"name": "resource"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				}],
			"doc" : "<b>onDropMethodID</b> will be called when an external draggable element or an event from another calendar has been dropped onto the calendar."
		},
		"onEventDragStartMethodID": {
			"parameters" : [{
					"type": "EventObject",
				 	"name": "event"
				 }, {
				 	"type": "JSEvent",
				 	"name": "jsEvent"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				}],
			"doc" : "<b>onEventDragStartMethodID</b> will be called when event dragging begins."
		},
		"onEventResizeStartMethodID": {
			"parameters" : [{
					"type": "EventObject",
				 	"name": "event"
				 }, {
				 	"type": "JSEvent",
				 	"name": "jsEvent"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				}],
			"doc" : "<b>onEventResizeStartMethodID</b> will be called when event resizing begins."
		},
		"onEventDragStopMethodID": {
			"parameters" : [{
					"type": "EventObject",
				 	"name": "event"
				 }, {
				 	"type": "JSEvent",
				 	"name": "jsEvent"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				}],
			"doc" : "<b>onEventDragStopMethodID</b> will be called when event dragging stops."
		},
		"onEventResizeStopMethodID": {
			"parameters" : [{
					"type": "EventObject",
				 	"name": "event"
				 }, {
				 	"type": "JSEvent",
				 	"name": "jsEvent"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				}],
			"doc" : "<b>onEventResizeStopMethodID</b> will be called when event resizing stops."
		},
		"onEventMouseEnterMethodID": {
			"parameters" : [{
					"type": "object",
				 	"name": "element"
				 }, {
					"type": "EventObject",
					"name": "eventObject"
				 }, {
				 	"type": "JSEvent",
				 	"name": "jsEvent"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				}],
			"doc" : "<b>onEventMouseEnterMethodID</b> will be called when the user mouses over an event. Similar to the native mouseenter."
		},
		"onEventMouseLeaveMethodID": {
			"parameters" : [{
					"type": "object",
				 	"name": "element"
				 }, {
					"type": "EventObject",
					"name": "eventObject"
				 }, {
				 	"type": "JSEvent",
				 	"name": "event"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				}],
			"doc" : "<b>onEventMouseLeaveMethodID</b> will be called when the user mouses out of an event. Similar to the native mouseleave."
		},
		"onLoadingMethodID": {
			"parameters" : [{
					"type": "boolean",
				 	"name": "isLoading"
				 }],
			"doc" : "<b>onLoadingMethodID</b> will be called when event or resource fetching starts/stops."
		},
		"onDatesSetMethodID": {
			"parameters" : [{
					"type": "date",
				 	"name": "start"
				 }, {
					"type": "date",
					"name": "end"
				 }, {
					"type": "string",
				 	"name": "startStr"
				 }, {
					"type": "string",
					"name": "endStr"
				 }, {
				 	"type": "string",
				 	"name": "timeZone"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				}],
			"doc" : "<b>onDatesSetMethodID</b> will be called after the calendar’s date range has been initially set or changed in some way and the DOM has been updated."
		},
		"onEventReceiveMethodID": {
			"parameters" : [{
					"type": "EventObject",
				 	"name": "event"
				 }, {
					"type": "EventObject[]",
				 	"name": "relatedEvents"
				 }, {
				 	"type": "object",
					"name": "draggedElement"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				}], 
			"returns":  { "type": "boolean", "doc": "if it returns false, the event receive action will be reverted, otherwise (true) the action is considered valid", "default": true },
			"doc" : "<b>onEventReceiveMethodID</b> will be called when an external draggable element with associated event data was dropped onto the calendar. Or an event from another calendar."
		},
		"onEventLeaveMethodID": {
			"parameters" : [{
					"type": "EventObject",
				 	"name": "event"
				 }, {
					"type": "EventObject[]",
				 	"name": "relatedEvents"
				 }, {
				 	"type": "object",
					"name": "draggedElement"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				}],
			"returns":  { "type": "boolean", "doc": "if it returns false, the event leave action will be reverted, otherwise (true) the action is considered valid", "default": true },
			"doc" : "<b>onEventLeaveMethodID</b> will be called when on a calendar when one if its events is about to be dropped onto another calendar."
		},
		"onResourceAddMethodID": {
			"parameters" : [{
					"type": "ResourceObject",
				 	"name": "resource"
				}],
			"returns":  { "type": "boolean", "doc": "if it returns false, the resource add action will be reverted, otherwise (true) the action is considered valid", "default": true },
			"doc" : "<b>onResourceAddMethodID</b> will be called after a resource has been added to the calendar."
		},
		"onResourceChangeMethodID": {
			"parameters" : [{
					"type": "ResourceObject",
				 	"name": "oldResource"
				},
				{
					"type": "object",
				 	"name": "newResource"
				}],
			"returns":  { "type": "boolean", "doc": "if it returns false, the resource change action will be reverted, otherwise (true) the action is considered valid", "default": true },
			"doc" : "<b>onResourceChangeMethodID</b> will be called after a resource has been modified in some way."
		},
		"onResourceRemoveMethodID": {
			"parameters" : [{
					"type": "ResourceObject",
				 	"name": "resource"
				}],
			"returns":  { "type": "boolean", "doc": "if it returns false, the resource remove action will be reverted, otherwise (true) the action is considered valid", "default": true },
			"doc" : "<b>onResourceRemoveMethodID</b> will be called after a resource has been removed from the calendar."
		},
		"onResourcesSetMethodID": {
			"parameters" : [{
					"type": "ResourceObject[]",
				 	"name": "resources"
				}],
			"doc" : "<b>onResourcesSetMethodID</b> will be called after resource data is initialized OR changed in any way."
		}
	},
	"api": {
		"fullCalendar" : {
			"parameters" : [{
				"name": "calendarOptions",
				"type": "FullCalendarOptions"
				}, {
				"name": "renderOnCurrentView",
				"type": "boolean",
				"optional" : true
				}]
		},
		"getFullCalendarOptions" : {
			"returns": "FullCalendarOptions"
		},
		"updateFullCalendar" : {
			"parameters" : [{
								"name":"option",
                                "type":"string"
                                }, {                                                                
                                "name":"value",
                                "type":"object"
                                }
			]
		},
		"getCalendarEvents": {
			"returns": "EventObject[]"
		},
		"getEventById": {
			"parameters" : [{                                                                
							"name":"id",
							"type":"string"
							}
			],
			"returns": "EventObject"
		}, 
		"addEvent": {
			"parameters" : [{                                                                
							"name":"event",
							"type":"EventParsing"
							},
							{                                                                
							"name":"source",
							"type":"object",
							"optional" : true
							}
			],
			"returns": "EventObject"
		}, 
		"setPropEvent": {
			"parameters" : [{                                                                
							"name":"eventID",
							"type":"string"
							},
							{                                                                
							"name":"name",
							"type":"string"
							},
							{
							"name":"value",
							"type":"object"
							}
			]
		}, 
		"setExtendedPropEvent": {
			"parameters" : [{                                                                
							"name":"eventID",
							"type":"string"
							},
							{                                                                
							"name":"name",
							"type":"string"
							},
							{
							"name":"value",
							"type":"object"
							}
			]
		}, 
		"setStart": {
			"parameters" : [{                                                                
							"name":"eventID",
							"type":"string"
							},
							{                                                                
							"name":"date",
							"type":"object"
							},
							{                                                                
							"name":"options",
							"type":"object",
							"optional" : true
							}
			]
		},
		"setEnd": {
			"parameters" : [{                                                                
							"name":"eventID",
							"type":"string"
							},
							{                                                                
							"name":"date",
							"type":"object"
							}
			]
		},
		"setDates": {
			"parameters" : [{                                                                
							"name":"eventID",
							"type":"string"
							},
							{                                                                
							"name":"start",
							"type":"object"
							},
							{                                                                
							"name":"end",
							"type":"object"
							},
							{                                                                
							"name":"options",
							"type":"object",
							"optional" : true
							}
			]
		},
		"setAllDay": {
			"parameters" : [{                                                                
							"name":"eventID",
							"type":"string"
							},
							{                                                                
							"name":"allDay",
							"type":"boolean"
							},
							{                                                                
							"name":"settings",
							"type":"object",
							"optional" : true
							}
			]
		}, 
		"moveStart": {
			"parameters" : [{                                                                
							"name":"eventID",
							"type":"string"
							},
							{                                                                
							"name":"delta",
							"type":"object"
							}
			]
		},
		"moveEnd": {
			"parameters" : [{                                                                
							"name":"eventID",
							"type":"string"
							},
							{                                                                
							"name":"delta",
							"type":"object"
							}
			]
		}, 
		"moveDates": {
			"parameters" : [{                                                                
							"name":"eventID",
							"type":"string"
							},
							{                                                                
							"name":"delta",
							"type":"object"
							}
			]
		}, 
		"formatRangeEvent": {
			"parameters" : [{                                                                
							"name":"eventID",
							"type":"string"
							},
							{                                                                
							"name":"formatConfig",
							"type":"object"
							}
			]
		}, 
		"removeEvent": {
			"parameters" : [{                                                                
							"name":"eventID",
							"type":"string"
							}
			],
			"delayUntilFormLoads": true
		},
		"getEventResources": {
			"parameters" : [{                                                                
							"name":"eventID",
							"type":"string"
							}
			],
			"returns" : "ResourceObject[]"
		},
		"setEventResources": {
			"parameters" : [{                                                                
							"name":"eventID",
							"type":"string"
							},
							{                                                                
							"name":"resources",
							"type":"ResourceObject[]"
							}
			]
		},
		"toPlainObjectEvent": {
			"parameters" : [{                                                                
							"name":"eventID",
							"type":"string"
							},
							{                                                                
							"name":"settings",
							"type":"object",
							"optional": true
							}
			]
		},
		"getEventSources": {
			"returns" : "EventSource[]"
		}, 
		"getEventSourceById": {
			"parameters" : [{                                                                
							"name":"id",
							"type":"string"
							}
			],
			"returns": "EventSource"
		}, 
		"addEventSource": {
			"parameters" : [{                                                                
							"name":"source",
							"type":"FunctionEventSource"
							}
			]
		},
		"refetchEvents": {
			"delayUntilFormLoads": true
		},
		"refetchEventSource": {
			"parameters" : [{                                                                
							"name":"eventSourceID",
							"type":"string"
							}
			],
			"delayUntilFormLoads": true
		},
		"removeEventSource": {
			"parameters" : [{                                                                
							"name":"eventSourceID",
							"type":"string"
							}
			],
			"delayUntilFormLoad": true
		},
		"scrollToTime": {
			"parameters" : [{                                                                
							"name":"durationInput",
							"type":"object"
							}
			]
		},

        "select": {
            	"parameters": [{
                                "name":"dateOrObj",
                                "type":"object"
                                }, {                                                                
                                "name":"endDate",
                                "type":"object",
                                "optional" : true
                                }]
        },
		"unselect": {
			"delayUntilFormLoads": true
		},

		"getView": {
			"returns": "ViewType",
			"delayUntilFormLoads": true
		},
		"changeView": {
			"parameters":[{                                                                
							"name":"viewName",
							"type":"string"
							},
							{"name":"dateOrRange",
							"type":"object",
							"optional" : true
							}
							],
			"delayUntilFormLoads": true
		},
		
		"option": {
			"parameters":[{                                                                
							"name":"option",
							"type":"string"
							}, {                                                                
							"name":"value",
							"type":"object"
							}],
			"delayUntilFormLoads": true
		},
		
		"next": {
		},
		"prev": {
			"delayUntilFormLoads": true
		},
		"prevYear": {
			"delayUntilFormLoads": true
		},
		"nextYear": {
			"delayUntilFormLoads": true
		},
		"today": {
			"delayUntilFormLoads": true
		},
		"getDate": {
			"returns": "date",
			"delayUntilFormLoads": true
		},
		"gotoDate": {
			"parameters":[{
							"name":"date",
							"type":"date"
							}],
			"delayUntilFormLoads": true 
		},
		"incrementDate": {
			"parameters":[{                                                                
							"name":"delta",
							"type":"object"
							}],
			"delayUntilFormLoads": true
		},

		"refetchResources": {
				"delayUntilFormLoads": true
		},
		"getTopLevelResources": {
				"returns" : "ResourceObject[]",
				"delayUntilFormLoads": true
		},
		"getResources": {
				"returns" : "ResourceObject[]",
				"delayUntilFormLoads": true
		},
		"getResourceById": {
				"parameters":[{                                                                
							"name":"resourceId",
							"type":"object"
							}],
				"returns" : "ResourceObject",
				"delayUntilFormLoads": true
		},
		"addResource": {
					"parameters":[{                                                                
								"name":"resource",
								"type":"ResourceObject"
							},
							{
								"name":"scrollTo",
								"type":"boolean",
								"optional" : true
							}]
		},
		"removeResource": {
				"parameters":[{                                                                
							"name":"id",
							"type":"string"
							}],
				"delayUntilFormLoad": true
		},
		"getParent": {
				"parameters":[{                                                                
					"name":"id",
					"type":"string"
				}],
				"returns" : "ResourceObject",
				"delayUntilFormLoads": true
		},
		"getChildren": {
				"parameters":[{                                                                
					"name":"id",
					"type":"string"
				}],
				"returns" : "ResourceObject[]",
				"delayUntilFormLoads": true
		},
		"getResourceEvents": {
				"parameters":[{                                                                
					"name":"id",
					"type":"string"
				}],
				"returns" : "ResourceObject[]",
				"delayUntilFormLoads": true
		},
		"setPropResource": {
			"parameters" : [{                                                                
							"name":"id",
							"type":"string"
							},
							{                                                                
							"name":"name",
							"type":"string"
							},
							{"name":"value",
							"type":"object"
							}
			]
		},
		"setExtendedPropResource": {
			"parameters" : [{                                                                
							"name":"id",
							"type":"string"
							},
							{                                                                
							"name":"name",
							"type":"string"
							},
							{
							"name":"value",
							"type":"object"
							}
			]
		},
		"toPlainObjectResource": {
			"parameters" : [{                                                                
							"name":"id",
							"type":"string"
							},{                                                                
							"name":"settings",
							"type":"object",
							"optional": true
							}
			]
		},
		"render" : {
			"delayUntilFormLoad": true
		},
		"destroy" : {
			"delayUntilFormLoad": true
		},
		"batchRendering" : {
			"parameters" : [{                                                                
							"name":"func",
							"type":"function"
							}
			],
			"delayUntilFormLoad": true
		},
		"formatIso": {
			"parameters" : [{                                                                
							"name":"date",
							"type":"object"
							},
							{                                                                
							"name":"omitTime",
							"type":"boolean",
							"optional": true
							}
			],
			"returns" : "string"
		}, 
		"formatRangeCalendar": {
			"parameters" : [{                                                                
							"name":"start",
							"type":"object"
							},
							{                                                                
							"name":"end",
							"type":"object"
							},
							{                                                                
							"name":"settings",
							"type":"object"
							}
			],
			"returns" : "string"
		},
		"formatDate": {
			"parameters" : [{                                                                
							"name":"date",
							"type":"object"
							},
							{                                                                
							"name":"settings",
							"type":"object"
							}
			],
			"returns" : "string"
		},
		"setOption": {
			"parameters" : [{                                                                
							"name":"name",
							"type":"string"
							},
							{                                                                
							"name":"value",
							"type":"object"
							}
			]
		},
		"getOption": {
			"parameters" : [{                                                                
							"name":"name",
							"type":"string"
							}
			],
			"returns" : "object"
		}
	},
	"internalApi": {
		"addEventSourceToCalendar" : {
				"parameters" : [{"name": "eventSource", "type": "object"}]
		},
		"addFunctionEventSourceToCalendar" : {
				"parameters" : [{"name": "eventSource", "type": "object"}, {"name": "callback", "type": "function"}]
		}
	},
	"types": {
		"EventParsing": {
			"id" : "object", 
			"title": "tagstring", 
			"start": "object", 
			"end": "object", 
			"allDay" : "boolean", 
			"className" : "object", 
			"classNames" : "object", 
			"editable" : "boolean", 
			"startEditable" : "boolean",
			"durationEditable" : "boolean",
			"overlap" : "boolean", 
			"constraint" : "object", 
			"color": "color", 
			"backgroundColor": "color", 
			"borderColor": "color", 
			"textColor" : "color", 
			"data" : "object", 
			"extendedProps" : "object",
			"date" : "object",
			"display" : "string",
			"allow" : "boolean",
			"url" : "string",

			"groupId" : "object",
			"daysOfWeek" : "int[]",
			"startTime" : "object",
			"endTime" : "object",
			"startRecur" : "object",
			"endRecur" : "object",
			"resourceEditable" : "boolean",
			"resourceId" : "string",
			"resourceIds" : "string[]",
			"rrule" : "object"
	 	},
		"EventObject": {
			"id" : "object", 
			"groupId" : "object",
			"title": "tagstring", 
			"allDay" : "boolean", 
			"start": "object", 
			"end": "object", 
			"startStr": "string", 
			"endStr": "string", 
			"classNames" : "object", 
			"editable" : "boolean", 
			"startEditable" : "boolean",
			"durationEditable" : "boolean",
			"resourceEditable" : "boolean",
			"overlap" : "boolean", 
			"constraint" : "object", 
			"backgroundColor": "color", 
			"borderColor": "color", 
			"textColor" : "color", 
			"extendedProps" : "object",
			"display" : "string",
			"url" : "string",
			"source" : "EventSource"
	 	},
	 	"ResourceObject": {
			"id" : "object",
			"title" : "tagstring",
			"children" : "ResourceObject[]",
			"parentId": "object",
			"eventBackgroundColor": "color",
			"eventBorderColor": "color",
			"eventTextColor" : "color",
			"eventClassName" : "styleclass",
			"extendedProps" : "object",
			"eventOverlap" : "object",
			"eventConstraint" : "object",
			"eventAllow" : "object"
	 	},
	 	"EventSource" : {
	 	    "id"  : "object",        
	 	    "events" : "object",
            "className" : "string[]",
            "allDayDefault" : "boolean",
			"editable" : "boolean",
			"startEditable" : "boolean",
			"durationEditable" : "boolean",
			"overlap" : "boolean",
			"constraint" : "object",
			"color": "color",
			"backgroundColor": "color",
			"borderColor": "color",
			"textColor" : "color",
			"data" : "object",
			"defaultAllDay" : "boolean", 
			"url" : "string", 
			"format" : "string", 
			"eventDataTransform" : "object", 
			"success" : "object", 
			"failure" : "object", 
			"display" : "string",
			"allow" : "object"
	 	}, 	
      	"ArrayEventSource": {
	 	    "id" : "object",        
	 	    "events" : "EventObject[]",
            "className" : "string[]",
            "allDayDefault" : "boolean",
			"editable" : "boolean",
			"startEditable" : "boolean",
			"durationEditable" : "boolean",
			"overlap" : "boolean",
			"constraint" : "object",
			"color": "color",
			"backgroundColor": "color",
			"borderColor": "color",
			"textColor" : "color",
			"data" : "object",
			"defaultAllDay" : "boolean", 
			"url" : "string", 
			"format" : "string", 
			"eventDataTransform" : "object", 
			"success" : "object", 
			"failure" : "object", 
			"display" : "string",
			"allow" : "object"
      	},
      	"FunctionEventSource": {
	 	    "id"  : "object",        
	 	    "events" : "function",
            "className" : "string[]",
            "allDayDefault" : "boolean",
			"editable" : "boolean",
			"startEditable" : "boolean",
			"durationEditable" : "boolean",
			"overlap" : "boolean",
			"constraint" : "object",
			"color": "color",
			"backgroundColor": "color",
			"borderColor": "color",
			"textColor" : "color",
			"data" : "object",
			"defaultAllDay" : "boolean", 
			"url" : "string", 
			"format" : "string", 
			"eventDataTransform" : "object", 
			"success" : "object", 
			"failure" : "object", 
			"display" : "string",
			"allow" : "object"
        },
		"JSONEventSource": {
	 	    "id"  : "object",        
            "className" : "string[]",
            "allDayDefault" : "boolean",
			"editable" : "boolean",
			"startEditable" : "boolean",
			"durationEditable" : "boolean",
			"overlap" : "boolean",
			"constraint" : "object",
			"color": "color",
			"backgroundColor": "color",
			"borderColor": "color",
			"textColor" : "color",
			"data" : "object",
			"defaultAllDay" : "boolean", 
			"url" : "string", 
			"format" : "string", 
			"eventDataTransform" : "object", 
			"success" : "object", 
			"failure" : "object", 
			"display" : "string",
			"allow" : "object"
        },
		"iCalendarEventSource": {
	 	    "id"  : "object",        
            "className" : "string[]",
            "allDayDefault" : "boolean",
			"editable" : "boolean",
			"startEditable" : "boolean",
			"durationEditable" : "boolean",
			"overlap" : "boolean",
			"constraint" : "object",
			"color": "color",
			"backgroundColor": "color",
			"borderColor": "color",
			"textColor" : "color",
			"data" : "object",
			"defaultAllDay" : "boolean", 
			"url" : "string", 
			"format" : "string", 
			"eventDataTransform" : "object", 
			"success" : "object", 
			"failure" : "object", 
			"display" : "string",
			"allow" : "object"
        },
        "GoogleCalendarEventSource": {
			"id"  : "object",        
	 	    "googleCalendarId": "string",
            "googleCalendarApiKey": "string",
            "className" : "string[]",
            "allDayDefault" : "boolean",
			"editable" : "boolean",
			"startEditable" : "boolean",
			"durationEditable" : "boolean",
			"overlap" : "boolean",
			"constraint" : "object",
			"color": "color",
			"backgroundColor": "color",
			"borderColor": "color",
			"textColor" : "color",
			"data" : "object",
			"defaultAllDay" : "boolean", 
			"url" : "string", 
			"format" : "string", 
			"eventDataTransform" : "object", 
			"success" : "object", 
			"failure" : "object", 
			"display" : "string",
			"allow" : "object"
        },
        "ViewType": {
            "type": "string",
	  		"title": "string",
	  		"activeStart": "date",
	  		"activeEnd": "date",
	  		"currentStart": "date",
	 		"currentEnd": "date"
        },
        "FullCalendar": {
        	"options" : "FullCalendarOptions"
        },
        "FullCalendarOptions" : {
        	"allDayText": {"type" :"tagstring"},
        	"aspectRatio": {"type" :"double"},
        	"buttonText": {"type" :"object"},
        	"contentHeight": {"type" :"object"},
        	"defaultAllDayEventDuration": {"type" :"object"},
        	"defaultTimedEventDuration": {"type" :"object"},
        	"displayEventEnd": {"type" :"boolean"},
        	"displayEventTime": {"type" :"boolean"},
        	"dayPopoverFormat": {"type" :"object"},
        	"dragRevertDuration": {"type" :"int"},
        	"dragScroll": {"type" :"boolean"},
			"editable": {"type" :"boolean"},   
			"eventDurationEditable": {"type" :"boolean"}, 
			"eventStartEditable": {"type" :"boolean"},
			"eventConstraint": {"type" :"object"}, 		 	
        	"eventOverlap": {"type" :"boolean"},  
        	"eventSources" : {"type" :"EventSource[]"},
			"firstDay": {"type" :"int"},
			"fixedWeekCount": {"type" :"boolean"},
			"forceEventDuration": {"type" :"boolean"},
        	"lazyFetching": {"type" :"boolean"},
        	"isRTL": {"type" :"boolean"},
        	"longPressDelay" : {"type" : "int"},
			"unselectAuto": {"type" :"boolean"},
			"unselectCancel": {"type" :"string"},
			"scrollTime": {"type" :"object"},
			"selectable": {"type" :"boolean"},
			"selectConstraint": {"type" :"object"},
			"selectOverlap": {"type" :"boolean"},
			"slotDuration": {"type" :"object"},
			"slotLabelFormat": {"type" :"string"},
			"slotLabelInterval": {"type" :"object"},
			"slotEventOverlap": {"type" :"boolean"},
			"snapDuration": {"type" :"object"},
			"titleFormat": {"type" :"object"},
			"weekends": {"type" :"boolean"},
			"weekNumbers": {"type" :"boolean"},
			"weekNumberCalculation": {"type" :"object"},
			"views": { "type" : "object"},
			"navLinkDayClick": {"type": "object"},
			"navLinkWeekClick": {"type": "object"},
			"duration": {"type": "object"},
			"bootstrapFontAwesome": {"type": "object"},
			"buttonIcons": {"type": "object"},
			"customButtons": {"type": "object"},
			"nextDayThreshold": {"type": "object"},
			"scrollTimeReset": {"type": "boolean"},
			"slotMinTime": {"type": "object"},
			"slotMaxTime": {"type": "object"},
			"headerToolbar": {"type": "object"},
			"footerToolbar": {"type": "object"},
			"defaultRangeSeparator": {"type": "string"},
			"titleRangeSeparator": {"type": "string"},
			"dayHeaders": {"type": "boolean"},
			"dayHeaderFormat": {"type": "object"},
			"dayHeaderClassNames": {"type": "object"},
			"dayHeaderContent": {"type": "object"},
			"dayHeaderDidMount": {"type": "object"},
			"dayHeaderWillUnmount": {"type": "object"},
			"dayCellClassNames": {"type": "object"},
			"dayCellContent": {"type": "object"},
			"dayCellDidMount": {"type": "object"},
			"dayCellWillUnmount": {"type": "object"},
			"initialView": {"type": "string"},
			"weekNumberClassNames": {"type": "object"},
			"weekNumberContent": {"type": "object"},
			"weekNumberDidMount": {"type": "object"},
			"weekNumberWillUnmount": {"type": "object"},
			"viewClassNames": {"type": "object"},
			"viewDidMount": {"type": "object"},
			"viewWillUnmount": {"type": "object"},
			"nowIndicator": {"type": "boolean"},
			"nowIndicatorClassNames": {"type": "object"},
			"nowIndicatorContent": {"type": "object"},
			"nowIndicatorDidMount": {"type": "object"},
			"nowIndicatorWillUnmount": {"type": "object"},
			"showNonCurrentDates": {"type": "boolean"},
			"startParam": {"type": "string"},
			"endParam": {"type": "string"},
			"timeZoneParam": {"type": "string"},
			"timeZone": {"type": "string"},
			"locales": {"type": "object"},
			"locale": {"type": "object"},
			"themeSystem": {"type": "string"},
			"allDayMaintainDuration": {"type": "boolean"},
			"dropAccept": {"type": "object"},
			"eventOrder": {"type": "object"},
			"eventOrderStrict": {"type": "boolean"},
			"handleWindowResize": {"type": "boolean"},
			"eventDragMinDistance": {"type": "int"},
			"expandRows": {"type": "int"},
			"windowResizeDelay": {"type": "int"},
			"height": {"type": "object"},
			"direction": {"type": "object"},
			"weekNumberFormat": {"type": "object"},
			"eventResizableFromStart": {"type": "boolean"},
			"weekText": {"type": "string"},
			"progressiveEventRendering": {"type": "boolean"},
			"businessHours" : "object",
			"initialDate": {"type": "object"},
			"now": {"type": "object"},
			"eventDataTransform": {"type": "object"},
			"stickyHeaderDates": {"type": "object"},
			"stickyFooterScrollbar": {"type": "object"},
			"viewHeight": {"type": "object"},
			"defaultAllDay": {"type": "boolean"},
			"eventSourceFailure": {"type": "object"},
			"eventSourceSuccess": {"type": "object"},
			"eventAllow": {"type": "object"},
			"eventDisplay": {"type": "string"},
			"eventBackgroundColor": {"type": "string"},
			"eventBorderColor": {"type": "string"},
			"eventTextColor": {"type": "string"},
			"eventColor": {"type": "string"},
			"eventClassNames": {"type": "object"},
			"eventContent": {"type": "object"},
			"eventDidMount": {"type": "object"},
			"eventWillUnmount": {"type": "object"},
			"selectAllow": {"type": "object"},
			"droppable": {"type": "boolean"},
			"slotLaneClassNames": {"type": "object"},
			"slotLaneContent": {"type": "object"},
			"slotLaneDidMount": {"type": "object"},
			"slotLaneWillUnmount": {"type": "object"},
			"slotLabelDidMount": {"type": "object"},
			"slotLabelWillUnmount": {"type": "object"},
			"dayMaxEvents": {"type": "object"},
			"dayMaxEventRows": {"type": "object"},
			"dayMinWidth": {"type": "object"},
			"allDayClassNames": {"type": "object"},
			"allDayContent": {"type": "object"},
			"allDayDidMount": {"type": "object"},
			"allDayWillUnmount": {"type": "object"},
			"slotMinWidth": {"type": "int"},
			"navLinks": {"type": "boolean"},
			"eventTimeFormat": {"type": "object"},
			"rerenderDelay": {"type": "int"},
			"moreLinkText": {"type": "object"},
			"selectMinDistance": {"type": "int"},
			"selectLongPressDelay": {"type": "int"},
			"eventLongPressDelay": {"type": "int"},
			"selectMirror": {"type": "boolean"},
			"eventMaxStack": {"type": "int"},
			"eventMinHeight": {"type": "int"},
			"eventMinWidth": {"type": "int"},
			"eventShortHeight": {"type": "int"},
			"plugins": {"type": "object"},
			"dateAlignment": {"type": "string"},
			"dateIncrement": {"type": "object"},
			"hiddenDays": {"type": "int[]"},
			"monthMode": {"type": "boolean"},
			"validRange": {"type": "object"},
			"visibleRange": {"type": "object"},
			"noEventsText": {"type": "string"},
			"moreLinkClick": {"type": "object"},
			"moreLinkClassNames": {"type": "object"},
			"moreLinkContent": {"type": "object"},
			"moreLinkDidMount": {"type": "object"},
			"moreLinkWillUnmount": {"type": "object"}
        }
	}
}
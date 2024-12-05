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
		"tooltipExpression" : {"type": "tagstring", "tags" : { "doc": "The text expression to be shown as tooltip when hovering over the calendar events.<br/>Use double curly brackets to evaluate {{propertyName}} the event's properties.<br/>For non-standard properties, use {{extendedProps.yourPropertyName}}.<br/><b>Example</b><br/><pre text>\nThis is the event title:{{title}}. The event starts at: {{start}}. Description: {{extendedPropsdata.data.description}}\n</pre>" }}
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
        "onDateDblClickMethodID": {
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
			"doc" : "<b>onDateClickMethodID</b> will be called when the user double clicks on a date or a time."
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
        "onEventDblClickMethodID": {
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
			"doc" : "<b>onEventDblClickMethodID</b> will be called when the user dbl click an event."
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
		"onEventRightClickMethodID": {
            "parameters" : [{
                    "type": "EventObject",
                    "name": "event"
                 }, {
                    "type": "JSEvent",
                    "name": "jsEvent"
                 }, {
                    "type": "ViewType",
                    "name": "view"
                }]
        },
		"onEventResizeMethodID": {
			"parameters" : [{
					"type": "EventObject",
				 	"name": "event"
				 },{
					"type": "EventObject[]",
				 	"name": "relatedEvents"
				 },{
                    "type": "EventObject",
                    "name": "oldEvent"
                 },{
                    "type": "int",
                    "name": "endDateDelta"
                 },{
					"type": "int",
					"name": "startDateDelta"
				 },{
				 	"type": "JSEvent",
				 	"name": "jsEvent"
				 },{
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
					"type": "int",
					"name": "delta"
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
			"deprecated": "Should use <b>onMouseEnter</b> instead.",
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
			"deprecated": "Should use <b>onMouseLeave</b> instead.",
			"parameters" : [{
					"type": "object",
				 	"name": "element"
				 }, {
					"type": "EventObject",
					"name": "event"
				 }, {
				 	"type": "JSEvent",
				 	"name": "jsEvent"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				}],
			"doc" : "<b>onEventMouseLeaveMethodID</b> will be called when the user mouses out of an event. Similar to the native mouseleave."
		},
		"onMouseEnter": {
			"parameters" : [{
					"type": "EventObject",
					"name": "eventObject"
				 }, {
				 	"type": "JSEvent",
				 	"name": "jsEvent"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				}],
			"doc" : "<b>onMouseEnter</b> will be called when the user mouses over an event. Similar to the native mouseenter."
		},
		"onMouseLeave": {
			"parameters" : [{
					"type": "EventObject",
					"name": "eventObject"
				 }, {
				 	"type": "JSEvent",
				 	"name": "jsEvent"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				}],
			"doc" : "<b>onMouseLeave</b> will be called when the user mouses out of an event. Similar to the native mouseleave."
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
		},
		"removeEventSource": {
            "parameters" : [{                                                                
                            "name":"eventSourceID",
                            "type":"string"
                            }]
        },
        "getEventsFromFunctionEventSource": {
        		"parameters" : [{
        			"name": "functionEventSourceIndex",
        			"type": "int"
        		}],
        		"returns" : "EventParsing[]"
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
			"eventClassNames" : "styleclass",
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
	 		"currentEnd": "date",
	 		"dateEnv": "object"
        },
        "FullCalendar": {
        	"options" : "FullCalendarOptions"
        },
        "FullCalendarOptions" : {
        	"allDayText": {"type" :"tagstring", "tags": {"doc": "The text titling the 'all-day' slot at the top of the calendar."}},
        	"aspectRatio": {"type" :"double", "tags": {"doc": "The width-to-height aspect ratio of the calendar."}},
        	"buttonText": {"type" :"object", "tags": {"doc": "Text that will be displayed on buttons of the headerToolbar/footerToolbar."}},
        	"contentHeight": {"type" :"object", "tags": {"doc": "The height of the view area of the calendar. By default, this option is unset and the calendar's height is calculated by aspectRatio."}},
        	"defaultAllDayEventDuration": {"type" :"object", "tags": {"doc": "A fallback duration for all-day Event Objects without a specified end value."}},
        	"defaultTimedEventDuration": {"type" :"object", "tags": {"doc": "A fallback duration for timed Event Objects without a specified end value."}},
        	"displayEventEnd": {"type" :"boolean", "tags": {"doc": "Whether or not to display an event's end time."}},
        	"displayEventTime": {"type" :"boolean", "tags": {"doc": "Whether or not to display the text for an event's date/time."}},
        	"dayPopoverFormat": {"type" :"object", "tags": {"doc": "Determines the date format of title of the popover created by the moreLinkClick option."}},
        	"dragRevertDuration": {"type" :"int", "tags": {"doc" : "Time it takes for an event to revert to its original position after an unsuccessful drag."}},
        	"dragScroll": {"type" :"boolean", "tags": {"doc" : "Whether to automatically scoll the scroll-containers during event drag-and-drop and date selecting."}},
			"editable": {"type" :"boolean", "tags": {"doc" : "Determines whether the events on the calendar can be modified."}},   
			"eventDurationEditable": {"type" :"boolean", "tags": {"doc" : "Allow events' durations to be editable through resizing."}}, 
			"eventStartEditable": {"type" :"boolean", "tags": {"doc" : "Allow events' start times to be editable through dragging."}},
			"eventConstraint": {"type" :"object", "tags": {"doc" : "Limits event dragging and resizing to certain windows of time."}}, 		 	
        	"eventOverlap": {"type" :"boolean", "tags": {"doc" : "Determines if events being dragged and resized are allowed to overlap each other."}},  
        	"eventSources" : {"type" :"EventSource[]", "tags": {"doc" : "A way to specify multiple event sources."}},
			"firstDay": {"type" :"int", "tags": {"doc" : "The day that each week begins."}},
			"fixedWeekCount": {"type" :"boolean", "tags": {"doc" : "Determines the number of weeks displayed in a month view."}},
			"forceEventDuration": {"type" :"boolean", "tags": {"doc" : "A flag to force assignment of an event's end if it is unspecified."}},
        	"lazyFetching": {"type" :"boolean", "tags": {"doc" : "Determines when event fetching should occur."}},
        	"isRTL": {"type" :"boolean", "tags": {"doc" : "Displays the calendar in right-to-left mode."}},
        	"longPressDelay" : {"type" : "int", "tags": {"doc" : "For touch devices, the amount of time the user must hold down before an event becomes draggable or a date becomes selectable."}},
			"unselectAuto": {"type" :"boolean", "tags": {"doc" : "Whether clicking elsewhere on the page will cause the current selection to be cleared."}},
			"unselectCancel": {"type" :"string", "tags": {"doc" : "A way to specify elements that will ignore the unselectAuto option."}},
			"scrollTime": {"type" :"object", "tags": {"doc" : "Determines how far forward the scroll pane is initially scrolled."}},
			"selectable": {"type" :"boolean", "tags": {"doc" : "Allows a user to highlight multiple days or timeslots by clicking and dragging."}},
			"selectConstraint": {"type" :"object", "tags": {"doc" : "Limits user selection to certain windows of time."}},
			"selectOverlap": {"type" :"boolean", "tags": {"doc" : "Determines whether the user is allowed to select periods of time that are occupied by events."}},
			"slotDuration": {"type" :"object", "tags": {"doc" : "The frequency for displaying time slots."}},
			"slotLabelFormat": {"type" :"string", "tags": {"doc" : "Determines the text that will be displayed within a time slot."}},
			"slotLabelInterval": {"type" :"object", "tags": {"doc" : "The frequency that the time slots should be labelled with text."}},
			"slotEventOverlap": {"type" :"boolean", "tags": {"doc" : "Determines if timed events in TimeGrid view should visually overlap."}},
			"snapDuration": {"type" :"object", "tags": {"doc" : "The time interval at which a dragged event will snap to the time axis. Also affects the granularity at which selections can be made."}},
			"titleFormat": {"type" :"object", "tags": {"doc" : "Determines the text that will be displayed in the headerToolbar's title."}},
			"weekends": {"type" :"boolean", "tags": {"doc" : "Whether to include Saturday/Sunday columns in any of the calendar views."}},
			"weekNumbers": {"type" :"boolean", "tags": {"doc" : "Determines if week numbers should be displayed on the calendar."}},
			"weekNumberCalculation": {"type" :"object", "tags": {"doc" : "The method for calculating week numbers that are displayed with the weekNumbers setting."}},
			"views": { "type" : "object", "tags": {"doc" : "The available views of this component."}},
			"navLinkDayClick": {"type": "object", "tags": {"doc" : "Determines what happens upon a day heading nav-link click."}},
			"navLinkWeekClick": {"type": "object", "tags": {"doc" : "Determines what happens upon a week-number nav-link click."}},
			"duration": {"type": "object", "tags": {"doc" : "Sets the exact duration of a custom view."}},
			"bootstrapFontAwesome": {"type": "object", "tags": {"doc" : "Determines which icons are displayed in buttons of the headerToolbar/footerToolbar when Bootstrap 4 theming is on. This setting does not apply to Bootstrap 5 theming. Use buttonIcons instead."}},
			"buttonIcons": {"type": "object", "tags": {"doc" : "Icons that will be displayed in buttons of the headerToolbar/footerToolbar."}},
			"customButtons": {"type": "object", "tags": {"doc" : "Defines custom buttons that can be used in the headerToolbar/footerToolbar."}},
			"nextDayThreshold": {"type": "object", "tags": {"doc" : "When an event's end time spans into another day, the minimum time it must be in order for it to render as if it were on that day."}},
			"scrollTimeReset": {"type": "boolean", "tags": {"doc" : "Whether the view should scroll to scrollTime every time the date range changes."}},
			"slotMinTime": {"type": "object", "tags": {"doc" : "Determines the first time slot that will be displayed for each day."}},
			"slotMaxTime": {"type": "object", "tags": {"doc" : "Determines the last time slot that will be displayed for each day. In line with the discussion about the Event object, it is important to stress that this should be specified as an exclusive end time."}},
			"headerToolbar": {"type": "object", "tags": {"doc" : "Defines the buttons and title at the top of the calendar."}},
			"footerToolbar": {"type": "object", "tags": {"doc" : "Defines the controls at the bottom of the calendar."}},
			"defaultRangeSeparator": {"type": "string", "tags": {"doc" : "The separator text used for date-formatting ranges throughout the API."}},
			"titleRangeSeparator": {"type": "string", "tags": {"doc" : "Determines the separator text when formatting the date range in the toolbar title."}},
			"dayHeaders": {"type": "boolean", "tags": {"doc" : "Whether the day headers should appear. For the Month, TimeGrid, and DayGrid views."}},
			"dayHeaderFormat": {"type": "object", "tags": {"doc" : "Determines the text that will be displayed on the calendar's column headings."}},
			"dayHeaderClassNames": {"type": "object", "tags": {"doc" : "A ClassName Input for adding classNames to the header &lt;th&gt; cell"}},
			"dayHeaderContent": {"type": "object", "tags": {"doc" : "A Content Injection Input. Generated content is inserted inside the inner-most wrapper of the header cell. It does not replace the &lt;th&gt; cell."}},
			"dayHeaderDidMount": {"type": "object", "tags": {"doc" : "Callback called right after the &lt;th&gt; has been added to the DOM."}},
			"dayHeaderWillUnmount": {"type": "object", "tags": {"doc" : "Callback called right before the &lt;th&gt; will be removed from the DOM."}},
			"dayCellClassNames": {"type": "object", "tags": {"doc" : "A ClassName Input for adding classNames to the &lt;td&gt; cell"}},
			"dayCellContent": {"type": "object", "tags": {"doc" : "A Content Injection Input. Generated content is inserted inside the inner-most wrapper of the day cell. It does not replace the &lt;td&gt; cell."}},
			"dayCellDidMount": {"type": "object", "tags": {"doc" : "Callback called right after the &lt;td&gt; has been added to the DOM"}},
			"dayCellWillUnmount": {"type": "object", "tags": {"doc" : "Callback called right before the &lt;td&gt; will be removed from the DOM"}},
			"initialView": {"type": "string", "tags": {"doc" : "The initial view when the calendar loads. The default value is 'dayGridMonth'"}},
			"weekNumberClassNames": {"type": "object", "tags": {"doc" : "A ClassName Input for adding classNames"}},
			"weekNumberContent": {"type": "object", "tags": {"doc" : "A Content Injection Input."}},
			"weekNumberDidMount": {"type": "object", "tags": {"doc" : "Callback called right after the week number div has been added to the DOM"}},
			"weekNumberWillUnmount": {"type": "object", "tags": {"doc" : "Callback called right before the week number div will be removed from the DOM"}},
			"viewClassNames": {"type": "object", "tags": {"doc" : "A ClassName Input for adding classNames to the root view element. called whenever the view changes."}},
			"viewDidMount": {"type": "object", "tags": {"doc" : "Callback called right after the view has been added to the DOM."}},
			"viewWillUnmount": {"type": "object", "tags": {"doc" : "Callback called right before the view will be removed from the DOM"}},
			"nowIndicator": {"type": "boolean", "tags": {"doc" : "Whether or not to display a marker indicating the current time."}},
			"nowIndicatorClassNames": {"type": "object", "tags": {"doc" : "A ClassName Input for adding classNames."}},
			"nowIndicatorContent": {"type": "object", "tags": {"doc" : "A Content Injection Input."}},
			"nowIndicatorDidMount": {"type": "object", "tags": {"doc" : "Callback called after before the now indicator will be added to the DOM."}},
			"nowIndicatorWillUnmount": {"type": "object", "tags": {"doc" : "Callback called right before the now indicator will be removed from the DOM."}},
			"showNonCurrentDates": {"type": "boolean", "tags": {"doc" : "In month view, whether dates in the previous or next month should be rendered at all."}},
			"startParam": {"type": "string", "tags": {"doc" : "A parameter of this name will be sent to each JSON event feed. It describes the start of the interval being fetched."}},
			"endParam": {"type": "string", "tags": {"doc" : "A parameter of this name will be sent to each JSON event feed. It describes the exclusive end of the interval being fetched."}},
			"timeZoneParam": {"type": "string", "tags": {"doc" : "A parameter of this name will be sent to each JSON event feed. It describes the timezone of the startParam and endParam values, as well as the desired timezone of the returned events."}},
			"timeZone": {"type": "string", "tags": {"doc" : "A time zone is a region of the world that serves as a context for displaying dates. It affects a Calendar instance. Default value is browser timezone."}},
			"locales": {"type": "object", "tags": {"doc" : "Specify multiple locales with the ability to switch between them after pageload."}},
			"locale": {"type": "object", "tags": {"doc" : "Current component locale (affects texts,formatting and weeknumber/first day of week)."}},
			"themeSystem": {"type": "string", "tags": {"doc" : "Renders the calendar with a given theme system. Default: 'standard'"}},
			"allDayMaintainDuration": {"type": "boolean", "tags": {"doc" : "Determines how an event's duration should be mutated when it is dragged from a timed section to an all-day section and vice versa."}},
			"dropAccept": {"type": "object", "tags": {"doc" : "Provides a way to filter which external elements can be dropped onto the calendar."}},
			"eventOrder": {"type": "object", "tags": {"doc" : "Determines the ordering (sort) events within the same day."}},
			"eventOrderStrict": {"type": "boolean", "tags": {"doc" : "Ensures the eventOrder setting is strictly followed."}},
			"handleWindowResize": {"type": "boolean", "tags": {"doc" : "Whether to automatically resize the calendar when the browser window resizes."}},
			"eventDragMinDistance": {"type": "int", "tags": {"doc" : "How many pixels the user's mouse/touch must move before an event drag activates."}},
			"expandRows": {"type": "int", "tags": {"doc" : "If the rows of a given view don't take up the entire height, they will expand to fit."}},
			"windowResizeDelay": {"type": "int", "tags": {"doc" : "The time the calendar will wait to adjust its size after a window resize occurs, in milliseconds."}},
			"height": {"type": "object", "tags": {"doc" : "Sets the height of the entire calendar, including header and footer. By default, this option is unset and the calendar's height is calculated by aspectRatio."}},
			"direction": {"type": "object", "tags": {"doc" : "The direction that elements in the calendar are rendered. Either left-to-right or right-to-left."}},
			"weekNumberFormat": {"type": "object", "tags": {"doc" : "If the rows of a given view don't take up the entire height, they will expand to fit."}},
			"eventResizableFromStart": {"type": "boolean", "tags": {"doc" : "Whether the user can resize an event from its starting edge."}},
			"weekText": {"type": "string", "tags": {"doc" : "The heading text for week numbers. Also affects weeks in date formatting."}},
			"progressiveEventRendering": {"type": "boolean", "tags": {"doc" : "When to render multiple asynchronous event sources in an individual or batched manner."}},
			"businessHours" : {"type": "object", "tags": {"doc" : "Emphasizes certain time slots on the calendar. By default, Monday-Friday, 9am-5pm."}},
			"initialDate": {"type": "object", "tags": {"doc" : "The initial date displayed when the calendar first loads."}},
			"now": {"type": "object", "tags": {"doc" : "Explicitly sets the 'today' date of the calendar. This is the day that is normally highlighted in yellow."}},
			"eventDataTransform": {"type": "object", "tags": {"doc" : "A hook for transforming custom data into a standard Event object."}},
			"stickyHeaderDates": {"type": "object", "tags": {"doc" : "Whether to fix the date-headers at the top of the calendar to the viewport while scrolling."}},
			"stickyFooterScrollbar": {"type": "object", "tags": {"doc" : "Whether to fix the view's horizontal scrollbar to the bottom of the viewport while scrolling."}},
			"viewHeight": {"type": "object", "tags": {"doc" : "View height."}},
			"defaultAllDay": {"type": "boolean", "tags": {"doc" : "Determines the default value for each Event Object's allDay property when it is unspecified."}},
			"eventSourceFailure": {"type": "object", "tags": {"doc" : "Callback called when any of the event sources fails. Probably because an AJAX request failed."}},
			"eventSourceSuccess": {"type": "object", "tags": {"doc" : "A function that gets called when fetching succeeds. It can transform the response. Gets called for any type of Event source."}},
			"eventAllow": {"type": "object", "tags": {"doc" : "Callback function to have exact programmatic control over where an event can be dropped."}},
			"eventDisplay": {"type": "string", "tags": {"doc" : "Controls which preset rendering style events use."}},
			"eventBackgroundColor": {"type": "string", "tags": {"doc" : "Sets the background color for all events on the calendar. Any CSS color format is supported."}},
			"eventBorderColor": {"type": "string", "tags": {"doc" : "Sets the border color for all events on the calendar. Any CSS color format is supported."}},
			"eventTextColor": {"type": "string", "tags": {"doc" : "Sets the text color for all events on the calendar. Any CSS color format is supported."}},
			"eventColor": {"type": "string", "tags": {"doc" : "Sets the background and border colors for all events on the calendar. Any CSS color format is supported."}},
			"eventClassNames": {"type": "object", "tags": {"doc" : "A ClassName Input for adding classNames to the outermost event element. If supplied as a callback function, it is called every time the associated event data changes."}},
			"eventContent": {"type": "object", "tags": {"doc" : " A Content Injection Input. Generated content is inserted inside the inner-most wrapper of the event element. If supplied as a callback function, it is called every time the associated event data changes."}},
			"eventDidMount": {"type": "object", "tags": {"doc" : "Callback called right after the element has been added to the DOM. If the event data changes, this is NOT called again."}},
			"eventWillUnmount": {"type": "object", "tags": {"doc" : "Callback called right before the element will be removed from the DOM."}},
			"selectAllow": {"type": "object", "tags": {"doc" : "Callback function to have exact programmatic control over where the user can select."}},
			"droppable": {"type": "boolean", "tags": {"doc" : "Determines if external draggable elements or events from other calendars can be dropped onto the calendar."}},
			"slotLaneClassNames": {"type": "object", "tags": {"doc" : "A ClassName Input."}},
			"slotLaneContent": {"type": "object", "tags": {"doc" : "A Content Injection Input"}},
			"slotLaneDidMount": {"type": "object", "tags": {"doc" : "Callback called right after the element is added to the DOM."}},
			"slotLaneWillUnmount": {"type": "object", "tags": {"doc" : "Callback called right before the element will be removed from the DOM."}},
			"slotLabelDidMount": {"type": "object", "tags": {"doc" : "Callback called right after the element is added to the DOM."}},
			"slotLabelWillUnmount": {"type": "object", "tags": {"doc" : "Callback called right before the element will be removed from the DOM."}},
			"dayMaxEvents": {"type": "object", "tags": {"doc" : "In, dayGrid view, the max number of events within a given day, not counting the +more link. The rest will show up in a popover."}},
			"dayMaxEventRows": {"type": "object", "tags": {"doc" : "In dayGrid view, the max number of stacked event levels within a given day. This includes the +more link if present. The rest will show up in a popover."}},
			"dayMinWidth": {"type": "object", "tags": {"doc" : "If specified, when the calendar gets narrow enough where day cells can no longer meet their dayMinWidth, horizontal scrollbars will appear."}},
			"allDayClassNames": {"type": "object", "tags": {"doc" : "A ClassName Input"}},
			"allDayContent": {"type": "object", "tags": {"doc" : "A Content Injection Input"}},
			"allDayDidMount": {"type": "object", "tags": {"doc" : "Callback called right after the element was added to the DOM."}},
			"allDayWillUnmount": {"type": "object", "tags": {"doc" : "Callback called right before the element will be removed from the DOM."}},
			"slotMinWidth": {"type": "int", "tags": {"doc" : "Determines how wide each of the time-axis slots will be. Specified as a number of pixels. When not specified, a reasonable value will be automatically computed."}},
			"navLinks": {"type": "boolean", "tags": {"doc" : "Determines if day names and week names are clickable."}},
			"eventTimeFormat": {"type": "object", "tags": {"doc" : "Determines the time-text that will be displayed on each event."}},
			"rerenderDelay": {"type": "int", "tags": {"doc" : "The amount of milliseconds to wait before rerendering anything on a calendar."}},
			"moreLinkText": {"type": "object", "tags": {"doc" : "More link text"}},
			"selectMinDistance": {"type": "int", "tags": {"doc" : "The minimum distance the user's mouse must travel after a mousedown, before a selection is allowed. A non-zero value is useful for differentiating a selection from a dateClick."}},
			"selectLongPressDelay": {"type": "int", "tags": {"doc" : "For touch devices, the amount of time the user must hold down before a date becomes selectable."}},
			"eventLongPressDelay": {"type": "int", "tags": {"doc" : "For touch devices, the amount of time the user must hold down before an event becomes draggable."}},
			"selectMirror": {"type": "boolean", "tags": {"doc" : "Whether to draw a 'placeholder' event while the user is dragging."}},
			"eventMaxStack": {"type": "int", "tags": {"doc" : "For timeline view, the maximum number of events that stack top-to-bottom. For timeGrid view, the maximum number of events that stack left-to-right."}},
			"eventMinHeight": {"type": "int", "tags": {"doc" : "In timeGrid view, the minimum height an event is allowed to be."}},
			"eventMinWidth": {"type": "int", "tags": {"doc" : "In timeline view, the minimum width an event is allowed to be."}},
			"eventShortHeight": {"type": "int", "tags": {"doc" : "In timeGrid view, the height threshold for when an event has a 'short' style."}},
			"plugins": {"type": "object", "tags": {"doc" : "Plugins list. Currently this list will be auto filled in Titanium Client."}},
			"dateAlignment": {"type": "string", "tags": {"doc" : "Determines the first visible day of a custom view."}},
			"dateIncrement": {"type": "object", "tags": {"doc" : "How far into the future/past the calendar navigates when prev/next is executed."}},
			"hiddenDays": {"type": "int[]", "tags": {"doc" : "Exclude certain days-of-the-week from being displayed."}},
			"monthMode": {"type": "boolean"},
			"validRange": {"type": "object", "tags": {"doc" : "Limits which dates the user can navigate to and where events can go."}},
			"visibleRange": {"type": "object", "tags": {"doc" : "Sets the exact date range that is visible in a view."}},
			"noEventsText": {"type": "string", "tags": {"doc" : "No Events Text"}},
			"moreLinkClick": {"type": "object", "tags": {"doc" : "Determines the action taken when the user clicks on a 'more' link created by the dayMaxEventRows or dayMaxEvents options."}},
			"moreLinkClassNames": {"type": "object", "tags": {"doc" : "A ClassName Input for adding classNames"}},
			"moreLinkContent": {"type": "object", "tags": {"doc" : "A Content Injection Input"}},
			"moreLinkDidMount": {"type": "object", "tags": {"doc" : "Callback called right after the link has been added to the DOM"}},
			"moreLinkWillUnmount": {"type": "object", "tags": {"doc" : "Callback called right before the link will be removed from the DOM"}},
			"resources": {"type": "object", "tags": {"doc" : "Tells the calendar to display resources from an input."}},
			"events": {"type": "object", "tags": {"doc" : "An array of Event Objects that will be displayed on the calendar."}},
			"schedulerLicenseKey": {"type": "string", "tags": {"doc" : "The license key you must enter to use premium features."}},
			"resourceAreaWidth" : {"type" :"string", "tags": {"doc" : "Determines the width of the area that contains the list of resources.Default: 30%."}}
        }
	}
}

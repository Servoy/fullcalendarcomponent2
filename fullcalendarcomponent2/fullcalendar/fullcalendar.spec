{
	"name": "svy-fullcalendar",
	"displayName": "FullCalendar",
	"categoryName": "Visualization",
	"icon" : "fullcalendarcomponent2/fullcalendar/fullcalendar.png",
	"definition": "fullcalendarcomponent2/fullcalendar/fullcalendar.js",
	"serverscript": "fullcalendarcomponent2/fullcalendar/fullcalendar_server.js",
	"ng2Config": {
       "packageName": "@servoy/fullcalendarcomponent",
       "moduleName": "FullCalendarComponentModule",
       "entryPoint": "projects/fullcalendarcomponent",
    },
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
		"gcalEventSources" : {"type": "GoogleCalendarEventSource[]", "tags" : {"scope" : "private"}},
		"styleClass" : {"type": "styleclass"},
		"tooltipExpression" : {"type": "tagstring"},
	    "location" : {"type" :"point", "pushToServer": "deep"}, 
		"size": {
			"type": "dimension",
			"default": {
				"width": 600,
				"height": 400
			}
		}
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
				 	"type": "JSEvent",
				 	"name": "jsEvent"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				 }, {
				 	"type": "ResourceType",
				 	"name": "resource",
				 	"optional" : true
				}]
		},
		"onUnselectMethodID": {
			"parameters" : [{
				 	"type": "JSEvent",
				 	"name": "jsEvent"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				 }]
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
				 	"type": "ResourceType",
				 	"name": "resource",
				 	"optional" : true
				}]
		},
		"onDayClickMethodID": {
			"parameters" : [{
					"type": "date",
				 	"name": "date"
				 }, {
				 	"type": "JSEvent",
				 	"name": "jsEvent"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				 }, {
				 	"type": "ResourceType",
				 	"name": "resource",
				 	"optional" : true
				}]
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
				}]
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
		"onEventAddMethodID": {
			"parameters" : [{
					"type": "EventObject",
				 	"name": "event"
				 }, {
					"type": "EventObject[]",
				 	"name": "relatedEvents"
				 }, {
				 	"type": "Function",
				 	"name": "revert"
				}]
		},
		"onEventRemoveMethodID": {
			"parameters" : [{
					"type": "EventObject",
				 	"name": "event"
				 }, {
					"type": "EventObject[]",
				 	"name": "relatedEvents"
				 }, {
				 	"type": "Function",
				 	"name": "revert"
				}]
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
				 }, {
				 	"type": "Function",
				 	"name": "revert"
				}]
		},
		"onEventsSetMethodID": {
			"parameters" : [{
					"type": "EventObject[]",
				 	"name": "events"
				 }]
		},
		"onWindowResizeMethodID": {
			"parameters" : [{
					"type": "ViewType",
				 	"name": "view"
				 }]
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
				}]
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
					"type": "ResourceType",
				 	"name": "oldResource"
				 }, {
					"type": "ResourceType",
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
				}]
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
				 	"type": "ResourceType",
				 	"name": "resource"
				 }, {
				 	"type": "ViewType",
				 	"name": "view"
				}]
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
				}]
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
				}]
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
				}]
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
				}]
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
				}]
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
				}]
		},
		"onLoadingMethodID": {
			"parameters" : [{
					"type": "boolean",
				 	"name": "isLoading"
				 }]
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
				}]
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
				}]
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
				}]
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
							"type":"object",
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
							"type":"object",
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
							},
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
			"returns" : "ResourceType[]"
		},
		"setEventResources": {
			"parameters" : [{                                                                
							"name":"eventID",
							"type":"string"
							},
							{                                                                
							"name":"resources",
							"type":"ResourceType[]"
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
							"type":"object"
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
							"type":"object"
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
							"name":"dateOrRange",
							"type":"object",
							"optional" : "true"
							},
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
			"delayUntilFormLoads": true
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
							"type":"object",
							}],
			"delayUntilFormLoads": true
		},

		"refetchResources": {
				"delayUntilFormLoads": true
		},
		"getTopLevelResources": {
				"returns" : "ResourceType[]",
				"delayUntilFormLoads": true
		},
		"getResources": {
				"returns" : "ResourceType[]",
				"delayUntilFormLoads": true
		},
		"getResourceById": {
				"parameters":[{                                                                
							"name":"resourceId",
							"type":"object"
							}],
				"returns" : "ResourceType",
				"delayUntilFormLoads": true
		},
		"addResource": {
					"parameters":[{                                                                
								"name":"resource",
								"type":"ResourceType"
							},
							{
								"name":"scrollTo",
								"type":"boolean",
								"optional" : "true"
							}]
		},
		"removeResource": {
				"parameters":[{                                                                
							"name":"id",
							"type":"object"
							}],
				"delayUntilFormLoad": true
		},
		"getParent": {
				"returns" : "ResourceType",
				"delayUntilFormLoads": true
		},
		"getChildren": {
				"returns" : "ResourceType[]",
				"delayUntilFormLoads": true
		},
		"getResourceEvents": {
				"returns" : "EventObject[]",
				"delayUntilFormLoads": true
		},
		"setPropResource": {
			"parameters" : [{                                                                
							"name":"name",
							"type":"string"
							},
							"name":"value",
							"type":"object",
							}
			]
		},
		"setExtendedProp": {
			"parameters" : [{                                                                
							"name":"name",
							"type":"string"
							},
							{
							"name":"value",
							"type":"object",
							}
			]
		},
		"toPlainObjectResource": {
			"parameters" : [{                                                                
							"name":"settings",
							"type":"object"
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
							"type":"boolean"
							}
			]
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
			]
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
			]
		},
	},
	"types": {
		"DateSelectedArg" : {
			"start" : "date",
			"end" : "date",
			"startStr" : "string",
			"endStr" : "string",
			"event" : "JSEvent",
			"view" : "ViewType",
			"resource" : "ResourceType"
		}
		"EventParsing": {
			"id" : "object", 
			"title": "tagstring", 
			"start": "date", 
			"end": "date", 
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
			"date" : "date",
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
			"start": "date", 
			"end": "date", 
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
	 	"ResourceType": {
			"id" : "object",
			"title" : "tagstring",
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
	 	    "events" : "EventSource[]",
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
	 	    "events" : "string",
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
            "name": "string",
	  		"title": "string",
	  		"start": "date",
	  		"end": "date",
	  		"intervalStart": "date",
	 		"intervalEnd": "date",
	 		"initialDate": {"type": "date", "tags": {"scope" : "private"}}
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
        	"eventSources" : {"type" :"EventSourceType[]"},
			"firstDay": {"type" :"int"},
			"fixedWeekCount": {"type" :"boolean"},
			"forceEventDuration": {"type" :"boolean"},
        	"handleWindowResize": {"type" :"boolean"},       	
        	"hiddenDays" : {"type" : "int[]"},
        	"lazyFetching": {"type" :"boolean"},
        	"isRTL": {"type" :"boolean"},
        	"longPressDelay" : {"type" : "int"},
			"nowIndicator": {"type" :"boolean"},
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
			"forceEventDuration": {"type": "boolean"},
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
			"windowResizeDelay": {"type": "int"},
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
			"initialDate": {"type": "date"},
			"now": {"type": "object"},
			"eventDataTransform": {"type": "object"},
			"stickyHeaderDates": {"type": "object"},
			"stickyFooterScrollbar": {"type": "object"},
			"viewHeight": {"type": "object"},
			"defaultAllDay": {"type": "boolean"},
			"eventSourceFailure": {"type": "object"},
			"eventSourceSuccess": {"type": "object"},
			"eventDisplay": {"type": "string"},
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
			"eventClassNames": {"type": "object"},
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
			"slotEventOverlap": {"type": "boolean"},
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
			"moreLinkWillUnmount": {"type": "object"},
        }
	}
}
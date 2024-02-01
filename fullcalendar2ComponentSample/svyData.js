/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0B347C8E-2775-4164-B663-EA8295FE9C3F"}
 */
var resourceTxtColor = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"5AAE4D57-585A-4D80-856D-133C1492882F"}
 */
var resourceColor = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0F028038-C2A3-437E-87EB-47A5D04B4146"}
 */
var resourceName = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"3CD35120-0CA0-4706-A52F-6FB995A0B9B3"}
 */
var title = '';

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"B1BD8CB3-801A-4B75-8311-E2F646D02AAA",variableType:93}
 */
var startDate;

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"E50B0194-8FA3-4C3D-91FA-3426AF80C8C7",variableType:93}
 */
var endDate;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"96D2F872-44AC-45A8-B9A7-647034A08DAD"}
 */
var allDay = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"DF13C90B-7B9A-4D1C-AAB0-AC35AFB46E02"}
 */
var groupName = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B96C97E6-CFA5-4046-8904-0457091B58B0"}
 */
var description = '';

/**
 * @enum
 * @public 
 *
 * @properties={typeid:35,uuid:"27440845-1C3A-41B2-B8A6-C00C783CEDDA",variableType:-4}
 */
var CALENDAR_VIEW_TYPE = {
	MONTH: 'dayGridMonth',
	BASICWEEK: 'dayGridWeek',
	BASICDAY: 'dayGridDay',
	AGENDAWEEK: 'timeGridWeek',
	AGENDADAY: 'timeGridDay',
	TIMELINE_DAY: 'timelineDay',
	TIMELINE_WEEK : 'timelineWeek',
	TIMELINE_MONTH: 'timelineMonth',
	TIMELINE_YEAR: 'timelineYear',
	LIST_DAY: 'listDay',
	LIST_WEEK : 'listWeek',
	LIST_MONTH: 'listMonth',
	LIST_YEAR: 'listYear'
};

/**
 * @properties={typeid:24,uuid:"F2748C3B-B3CB-425F-AF1A-E8FAE7198650"}
 */
function loadDbData() {
	 for (var tableName in tableData) {
        if (tableData.hasOwnProperty(tableName)) {
            var dataSourceName = 'mem:' + tableName;
            var foundset = databaseManager.getFoundSet(dataSourceName);
            foundset.clear();
            var tableInfo = tableData[tableName]; // Retrieve the table information
            var columnNames = tableInfo.columnNames; // Access column names
            var rows = tableInfo.rows; // Access rows
            for (var i = 0; i < rows.length; i++) {
                var newRow = foundset.getRecord(foundset.newRecord());
                var rowData = rows[i];
                for (var j = 0; j < rowData.length; j++) {
                    newRow[columnNames[j]] = rowData[j]; // Use column names from the tableInfo
                }
                if (!databaseManager.saveData(newRow)) {
                	application.output('ERROR saving data');
                }
            }
        }
    }
}

/**
 * @properties={typeid:35,uuid:"1BF09547-69A6-4AF2-ADE0-17A7DBD757B9",variableType:-4}
 */
var tableData = {
    event_objects: {
        columnNames: ["event_object_id", "resource_id", "allday", "description", "editable", "end_date", "start_date", "title_event"],
        rows: [
            ["55555555-5555-5555-5555-555555555555", "44444444-4444-4444-4444-444444444444", 0, null, 1, "1900-01-09T14:00:00.000Z", "1900-01-09T07:30:00.000Z", "The beginning of time"],
	        ["23C28FA8-3BAE-4ED3-9867-08344B760E9A", "2A595C21-C4E7-4DC0-A4F9-53F5A1C94D8C", 0, null, 1, "2024-01-09T14:00:00.000Z", "2024-01-09T07:30:00.000Z", "Apple Event"],
			["5E55FDAF-5C21-47EF-96B1-ABC0AD6AF902", "2A81D00C-22F3-4EF0-9B9B-799024A0679A", 1, null, 1, "2024-01-14T17:30:00.000Z", "2024-01-08T07:30:00.000Z", "Servoy World"],
			["67FAC62C-D12B-4ECF-A0C3-2A3EE652421C", "18486893-983F-4F95-8F9E-93B56F667910", 0, "Presentation", 1, "2024-01-12T14:00:00.000Z", "2024-01-12T07:30:00.000Z", "Office 365"],
			["87E79D27-2843-425F-B216-F624399627C5", "2A81D00C-22F3-4EF0-9B9B-799024A0679A", 0, null, 1, "2024-01-08T14:00:00.000Z", "2024-01-08T09:00:00.000Z", "Servoy Release"],
			["CA450CB0-7F03-4B09-A9DF-3034C824C21D", "FCB86F68-630D-4A37-841F-248AFB6A71C3", 0, null, 1, "2024-01-10T14:00:00.000Z", "2024-01-10T07:30:00.000Z", "Android training"],
			["CE405812-23C5-4847-A1EA-80B107F2DE24", "2A81D00C-22F3-4EF0-9B9B-799024A0679A", 0, null, 1, "2024-01-13T11:00:00.000Z", "2024-01-13T07:30:00.000Z", "Servoy AI Camp"],
			["E1E138DD-4C9D-4042-A834-371577173033", "2A595C21-C4E7-4DC0-A4F9-53F5A1C94D8C", 0, null,0, "2024-01-11T14:00:00.000Z", "2024-01-11T07:30:00.000Z", "Apple Core ML"],
			["E9B2918E-620C-4E83-9541-4EA2DF3ECD1E", "2A81D00C-22F3-4EF0-9B9B-799024A0679A", 0, "This is a kickoff event", 1, "2024-01-08T09:00:00.000Z", "2024-01-08T07:30:00.000Z", "Servoy Camp Kickoff"] 
        ]
    },
    resources: {
    	columnNames: [
	        "resource_id", "bg_color", "border_color", "fg_color", "text_color", "name", "render_flag"
	    ],
	    rows: [
		    ["18486893-983F-4F95-8F9E-93B56F667910", null, null, "blue", "white", "Microsoft", 1],
		    ["2A595C21-C4E7-4DC0-A4F9-53F5A1C94D8C", null, null, "purple", "white", "Apple", 1],
		    ["2A81D00C-22F3-4EF0-9B9B-799024A0679A", null, null, "orange", "black", "Servoy", 1],
		    ["FCB86F68-630D-4A37-841F-248AFB6A71C3", null, null, "green", "white", "Android", 1]
		]

    }
};

/**
 * @param {JSRecord} record
 * 
 * @properties={typeid:24,uuid:"22D66BFA-63FF-4D44-AC56-6E656DECE35E"}
 */
function setEventObject(record) {
	title = null;
	startDate = new Date();
	endDate = new Date();
	allDay = 0;
	groupName = 'Servoy';
	description = null;
	if (record != null) {
		title = record.title_event;
		startDate = record.start_date;
		endDate = record.end_date;
		allDay = record.allday;
		groupName = record.event_object_to_resources.name;
		description = record.description;
	} 
}

/**
 * 
 * @param {JSRecord} record
 *
 * @properties={typeid:24,uuid:"D66C5130-E12B-4DC2-A6F9-9D04921F3C9F"}
 */
function setResourceObject(record) {
	resourceName = record.name;
	resourceColor = record.fg_color;
	resourceTxtColor = record.text_color;
}

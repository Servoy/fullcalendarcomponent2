items:[
{
background:"#ffffff",
height:270,
partType:5,
typeid:19,
uuid:"25823797-B496-41C8-9A14-60E9C8AA614B"
},
{
anchors:3,
formIndex:5,
location:"398,18",
onActionMethodID:"F72CF128-063C-4208-A982-BE0A3420D5FD",
size:"32,26",
text:"<span class=\"glyphicon glyphicon-repeat\"/>",
toolTipText:"Reload events",
typeid:7,
uuid:"274699C9-F56B-4478-B778-C19993E7C87E"
},
{
anchors:3,
formIndex:7,
location:"444,18",
name:"btnMonthView",
onActionMethodID:"3ADDF19B-1251-43C1-8073-BAF083CEBDCF",
size:"32,26",
styleClass:"btn",
text:"<span class=\"glyphicon glyphicon-th\"/>",
toolTipText:"Month view",
typeid:7,
uuid:"2AECF278-F8A3-4319-9263-D4E4CE5E0F02"
},
{
anchors:3,
formIndex:8,
location:"675,18",
onActionMethodID:"9C1A1D8C-8804-420F-96CE-E21690104148",
size:"32,26",
styleClass:"btn-calendar",
text:"<span class=\"glyphicon glyphicon-forward\"/>",
toolTipText:"Next year",
typeid:7,
uuid:"2F940F52-9DEA-4487-A069-B30E35870641"
},
{
anchors:3,
formIndex:6,
location:"582,18",
onActionMethodID:"21FA66F7-5884-4A81-A31C-8D6805B21558",
size:"32,26",
styleClass:"btn-calendar",
text:"<span class=\"glyphicon glyphicon-chevron-left\"/>",
toolTipText:"Previous",
typeid:7,
uuid:"5FF096D3-F0CE-42D3-818B-AFE4EB8E3AA3"
},
{
anchors:3,
formIndex:11,
location:"476,18",
name:"btnAgendaWeekView",
onActionMethodID:"347FC8A1-7327-4E49-B6D6-CDF1B3927A5F",
size:"32,26",
styleClass:"btn-primary",
text:"<span class=\"glyphicon glyphicon-th-list\"/>",
toolTipText:"Week view",
typeid:7,
uuid:"723675D0-50CF-4D8C-8E03-EB18265465B8"
},
{
anchors:7,
items:[
{
containsFormID:"6A8869CB-1D43-4D8B-AEC8-9DD1DF5C6172",
location:"856,47",
text:"eventSources",
typeid:15,
uuid:"35C309A7-ED75-4404-A02F-4B2CBF809F6A"
}
],
location:"856,17",
name:"tabless",
printable:false,
size:"181,247",
tabOrientation:-1,
transparent:true,
typeid:16,
uuid:"73EDEE2F-1989-4B29-875D-DFCDA67CF2A2"
},
{
anchors:15,
json:{
anchors:15,
location:{
x:277,
y:17
},
onDayClickMethodID:"83F0F5F8-12DF-49E4-93F0-0F62EC8F3564",
onEventClickMethodID:"1E6A8C2B-355B-4DED-BAD3-B9EE242DDA17",
onEventDropMethodID:"49EBE503-D8B2-424A-A5ED-3A216B45F4ED",
onEventResizeMethodID:"49EBE503-D8B2-424A-A5ED-3A216B45F4ED",
onEventRightClickMethodID:"6B974361-0BA4-474C-A034-9FDA00471E4A",
onSelectMethodID:"974C9D60-E061-4BA7-9FCE-83E43D8E9990",
onViewRenderMethodID:"CCC5CC24-907D-4256-8F0A-4CE877FDDEC5",
size:{
height:247,
width:543
},
tooltipExpression:"This is an expression <i>{{title}}<\/i>\r\
<br>\r\
{{data.description}}"
},
location:"277,17",
name:"fullcalendar_1",
size:"543,247",
typeName:"svy-fullcalendar",
typeid:47,
uuid:"7D3B0980-5EE2-403F-ACA8-B1CBF109D7FB"
},
{
anchors:9,
json:{
anchors:9,
location:{
x:28,
y:44
},
onDayClickMethodID:"AF4DE5E0-A45B-4A9A-AABD-053DB2CA13CB",
size:{
height:218,
width:232
},
styleClass:"fc-dateselector"
},
location:"28,44",
name:"fullcalendarSelector",
size:"232,218",
typeName:"svy-fullcalendar",
typeid:47,
uuid:"7E882E31-13CF-449D-BEA1-A0ACB0CDC629"
},
{
anchors:3,
formIndex:9,
location:"508,18",
name:"btnAgendaDayView",
onActionMethodID:"660DB3BD-8EBD-4270-A9C6-335B2A5A333E",
size:"32,26",
text:"<span class=\"glyphicon glyphicon-align-justify\">",
toolTipText:"Day view",
typeid:7,
uuid:"8954C815-5DC1-40FF-A345-4ACB3103D8BC"
},
{
anchors:3,
formIndex:1,
location:"717,18",
onActionMethodID:"E46FC259-DCCD-413A-BF8C-4B07AD7749ED",
size:"32,26",
text:"<span class=\"glyphicon glyphicon-time\"/>",
toolTipText:"Morning time",
typeid:7,
uuid:"A11A1841-CEDE-4F97-8955-F00943327F04"
},
{
anchors:3,
formIndex:2,
location:"746,18",
onActionMethodID:"6232C540-C2F0-4392-9994-FAA6C468B0C7",
size:"32,26",
styleClass:"btn-warning",
text:"<span class=\"glyphicon glyphicon-time\"/>",
toolTipText:"Afternoon time",
typeid:7,
uuid:"AB985413-C40E-44B8-91AD-E88EB7F3605C"
},
{
anchors:3,
formIndex:2,
location:"788,18",
name:"btnConfig",
onActionMethodID:"DCAF2BCD-E7DB-423E-BF36-CEA37F4FE70D",
size:"32,26",
text:"<span class=\"glyphicon glyphicon-cog\"/>",
toolTipText:"Afternoon time",
typeid:7,
uuid:"CE0353AB-7647-4F97-BC47-E959045A7668"
},
{
anchors:3,
formIndex:4,
location:"613,18",
onActionMethodID:"709C050D-3D22-4207-A6CD-F26C424DE285",
size:"32,26",
styleClass:"btn-calendar",
text:"<span class=\"glyphicon glyphicon-screenshot\"/>",
toolTipText:"Today",
typeid:7,
uuid:"DE52C2AD-4E09-454E-BC4B-7D7113D70B8A"
},
{
anchors:3,
formIndex:3,
location:"552,18",
onActionMethodID:"27F5E477-7982-424C-A9CB-746F274A8C2C",
size:"32,26",
styleClass:"btn-calendar",
text:"<span class=\"glyphicon glyphicon-backward\"/>",
toolTipText:"Previous year",
typeid:7,
uuid:"EDB4136C-B392-4EDE-A627-29A827BB779A"
},
{
anchors:3,
formIndex:10,
location:"644,18",
onActionMethodID:"4D921E5B-AD25-4392-A625-48295CD9DADC",
size:"32,26",
styleClass:"btn-calendar",
text:"<span class=\"glyphicon glyphicon-chevron-right\"/>",
toolTipText:"Next",
typeid:7,
uuid:"F4DEEC35-8429-4567-BFB2-D1D1DA274248"
}
],
name:"demoCalendar",
navigatorID:"-1",
onHideMethodID:"E9AFF989-703D-4D0D-91CF-407C86F2D727",
onLoadMethodID:"249A635F-D679-4136-B390-91D197B71089",
onShowMethodID:"74FF3A10-81F5-4C1C-9133-7869928463E6",
showInMenu:true,
size:"1056,306",
typeid:3,
uuid:"1AC7FAF9-3ECB-4DB3-B758-D81AA14C4A56"
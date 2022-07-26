var AdmZip = require('adm-zip');

// creating archives
var zip = new AdmZip();

zip.addLocalFolder("./fullcalendar2/", "/fullcalendar2/");
zip.addLocalFolder("./META-INF/", "/META-INF/");
zip.addLocalFolder("./dist/servoy/fullcalendarcomponent2/", "/dist/servoy/fullcalendarcomponent2/");

zip.writeZip("fullcalendarcomponent2.zip")
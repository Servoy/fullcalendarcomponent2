/**
 * @private
 * @type {java.time.ZoneId}
 *
 * @properties={typeid:35,uuid:"0639679C-6C78-4117-9710-BC8BFDD2D445",variableType:-4}
 */
var zoneId = java.time.ZoneId.of(i18n.getCurrentTimeZone());

/**
 * TODO generated, please specify type and doc for the params
 * @param date
 * @param days
 *
 * @properties={typeid:24,uuid:"0048673D-30F7-4C58-86BF-A18518B12037"}
 */
function addDays(date, days) {
	return getDateFromLocalDateTime(
		getLocalDateTimeFromDate(date).plusDays(days)
	);
}

/**
 * Returns a Date from a LocalDateTime object
 *
 * @param {java.time.LocalDateTime|java.time.temporal.Temporal} [localDateTime]
 *
 * @return {Date}
 *
 * @private
 * 
 * @properties={typeid:24,uuid:"BC29BCA4-AEFF-4DDB-8D16-C81D0B395269"}
 */
function getDateFromLocalDateTime(localDateTime) {
	if (!localDateTime) {
		localDateTime = java.time.LocalDateTime.now(zoneId);
	}
	if (localDateTime instanceof java.time.LocalDate) {
		/** @type {java.time.LocalDate} */
		var localDate = localDateTime;
		localDateTime = localDate.atStartOfDay();
	}
	return new Date(localDateTime.atZone(zoneId).toInstant().toEpochMilli());
}

/**
 * TODO generated, please specify type and doc for the params
 * @param date
 *
 * @properties={typeid:24,uuid:"FE2D5590-9E5D-42D5-9B23-CAD87A427B40"}
 */
function getLocalDateTimeFromDate(date) {
	if (!date) {
		return java.time.LocalDateTime.now(zoneId);
	}
	/** @type {java.time.LocalDateTime} */
	var result = java.time.Instant.ofEpochMilli(date.getTime()).atZone(zoneId).toLocalDateTime();
	return result;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param date
 *
 * @properties={typeid:24,uuid:"75C4340F-DA37-49A8-9B57-2ECDD60DF894"}
 */
function toStartOfDay(date) {
	date.setHours(0, 0, 0, 0);
	return date;
}

/**
 * Adds the given number of hours to the given date and returns a new dat<br>
 * Negative number of hours will be substracted
 *
 * @public
 *
 * @param {Date} date - the date to add to
 * @param {Number} hours - number of hours to add
 *
 * @return {Date} result
 *
 * @properties={typeid:24,uuid:"5F96805C-9C33-4648-A6B3-5D67108EDDE4"}
 */
function addHours(date, hours) {
	var zonedDateTime = getLocalDateTimeFromDate(date).atZone(zoneId);
	
	/** @type {java.time.temporal.TemporalUnit} */
	var unit = java.time.temporal.ChronoUnit.HOURS
	var instant = zonedDateTime.toInstant();
	instant = instant.plus(hours, unit);
	return new Date(instant.toEpochMilli());
}

/**
 * Sets the time of the given date to 00:00:00
 *
 * @public
 *
 * @param {Date} date
 *
 * @return {Date} result
 *
 * @properties={typeid:24,uuid:"722B311E-FB9C-4486-8B20-09F33325500F"}
 */
function toEndOfDay(date) {
	date.setHours(23, 59, 59, 999);
	return date;
}

/**
 * Formats a date object into a string according to the specified format.
 * This simplified version assumes the date object is already adjusted to the correct time zone.
 *
 * @param {Date} date - The date to format.
 * @param {String} format - The format string.
 * @returns {String} The formatted date string.
 *
 * @properties={typeid:24,uuid:"8CA4434B-AA42-4165-AE53-F96DC4428CC8"}
 */
function dateFormat(date, format) {
	// Helper function to pad numbers and convert them to string
    function pad(n) { return n < 10 ? '0' + n : n.toString(); }

    // Replace format tokens
    var formattedDate = format.replace(/yyyy/g, date.getFullYear().toString())
                              .replace(/yy/g, String(date.getFullYear()).substring(2))
                              .replace(/MM/g, pad(date.getMonth() + 1)) // Months are 0-based
                              .replace(/dd/g, pad(date.getDate()))
                              .replace(/HH/g, pad(date.getHours()))
                              .replace(/mm/g, pad(date.getMinutes()))
                              .replace(/ss/g, pad(date.getSeconds()));

    return formattedDate;
}

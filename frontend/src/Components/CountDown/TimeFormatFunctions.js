export function eventDateFormat(time) {

    let year = parseInt(time.substring(0, 4));
    let month = parseInt(time.substring(5, 7));
    let processedMonth = month - 1;
    let day = parseInt(time.substring(8, 10));
    let hour = parseInt(time.substring(11, 13));
    let minute = parseInt(time.substring(14, 16));
    let finalDate = new Date(year, processedMonth, day, hour, minute);

    return finalDate.toLocaleDateString('en-US', {weekday: 'long', month: 'short', day: 'numeric', year: 'numeric'});
}

export function eventTimeFormat(time) {

    const localDate = new Date(time);
    const timezoneOffset = localDate.getTimezoneOffset() / 60;

    let hour = parseInt(time.substring(11, 13)) - timezoneOffset;

    let minute = time.substring(14, 16);

    let hours = ((hour + 11) % 12) + 1;

    if (hour > 11) {
        return hours.toString() + ":" + minute + "PM";
    } else {
        return hours.toString() + ":" + minute + "AM";
    }
}
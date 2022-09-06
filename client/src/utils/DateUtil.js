export function formatDate(dateStr) {
    let displayDate = "";
    let date = new Date(dateStr);
    let today = new Date();
    if (date.toString() === 'Invalid Date')
        date = today;


    const isThisWeek = Math.abs(today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24) <= 7;

    if (isThisWeek) {
        const month = Intl.DateTimeFormat('en-US', {month: 'long'}).format(date);
        displayDate = `${month} ${date.getDate()}`
    } else {
        displayDate = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(date);
    }

    let hours = date.getHours();
    let min = date.getMinutes();
    const AMPM = hours >= 12 ? "PM" : "AM";
    hours = (hours % 12);
    hours = hours === 0 ? 12 : hours;

    return `${displayDate} at ${hours}:${min}${AMPM}`;
}

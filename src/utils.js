
// date formatter
export var formatDate = (date) => {
    var hours = date.getHours();
    var mins  = date.getMinutes();

    hours = (hours < 10 ? "0" : "") + hours;
    mins = (mins < 10 ? "0" : "") + mins;

    return `${hours}:${mins}`;
};

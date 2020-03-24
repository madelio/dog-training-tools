function convertSecsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h +"h" : "";
    var mDisplay = m > 0 ? m + "m" : "";
    var sDisplay = s > 0 ? s + "s": "";
    return hDisplay + mDisplay + sDisplay; 
}

function convertMinToSecs(min) {
    return min * 60;
}

function convertHrToSecs(hour) {
    return hour * 3600;
}

function convertTextToTime(text) {
    const timeUnits = text.match(/\d*(h|m|s)/g);
    var seconds = 0;

    for(var timeUnit of timeUnits) {
        const timeFormat = timeUnit.slice(-1);
        const time = timeUnit.slice(0, -1);
        switch(timeFormat) {
            case "h": 
                seconds += convertHrToSecs(time);
                break;
            case "m":
                seconds += convertMinToSecs(time);
                break;
            default:
                seconds += parseInt(time);
        }
    }

    return seconds;
}

export {convertTextToTime, convertSecsToHms};
function convertTimeToHMS(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h +"h" : "";
    var mDisplay = m > 0 ? m + "m" : "";
    var sDisplay = s > 0 ? s + "s": "";
    return hDisplay + mDisplay + sDisplay; 
}

function convertTimeToClockFormat(timer) {
  var time = Number(timer);
  var hours = Math.floor(time / 3600);
  var minutes = Math.floor(time % 3600 / 60);
  var seconds = Math.floor(time % 3600 % 60);

  var hourDisplay = hours < 10 ? "0" + hours : hours;
  var minuteDisplay = minutes < 10 ? "0" + minutes : minutes;
  var secondsDisplay = seconds < 10 ? "0" + seconds : seconds;

  return hourDisplay + ":" + minuteDisplay + ":" + secondsDisplay;

    // d = Number(d);
    // var h = Math.floor(d / 3600);
    // var m = Math.floor(d % 3600 / 60);
    // var s = Math.floor(d % 3600 % 60);

    // var hDisplay = h > 0 ? h +"h" : "";
    // var mDisplay = m > 0 ? m + "m" : "";
    // var sDisplay = s > 0 ? s + "s": "";
    // return hDisplay + mDisplay + sDisplay; 

}

function convertTimeToText(time, type = null) {
  // if (type == "hms") return convertSecsToHms(time);
  if (type == "clock") 
    return convertTimeToClockFormat(time);

  return convertTimeToHMS(time);
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

export {convertTextToTime, convertTimeToText};
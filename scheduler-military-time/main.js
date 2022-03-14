const dayStart = "07:30"
const dayEnd = "17:45"

function scheduleMeeting (startTime, meetingDuration) {
    // convert work day parameters to fit to 24 hours
    workStart = Number(dayStart.substring(0,2)) + (Number(dayStart.substring(3))/60)
    workEnd = Number(dayEnd.substring(0,2)) + (Number(dayEnd.substring(3))/60)
    // convert 12 hour clock to 24 hours 
    if (startTime.length < 5) {
        startTime = "0" + startTime
    }
    // error 
    if (startTime.length > 5) {
        return false
    }
    // convert meeting time to simple numbers
    meeting = Number(startTime.substring(0,2)) + (Number(startTime.substring(3))/60)
    meetingBlock = meetingDuration / 60

    // set scheduling rules 
    if (meeting < workStart) {
        return false
    }
    if (meeting + meetingBlock > workEnd) {
        return false
    }
    else { 
        return true
    }
}

scheduleMeeting("7:00",15);     // false
scheduleMeeting("07:15",30);    // false
scheduleMeeting("7:30",30);     // true
scheduleMeeting("11:30",60);    // true
scheduleMeeting("17:00",45);    // true
scheduleMeeting("17:30",30);    // false
scheduleMeeting("18:00",15);    // false
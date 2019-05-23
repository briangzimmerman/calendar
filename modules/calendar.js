const {google} = require('googleapis');
const config = require('../config.json');
const key = require(config.service_creds);
const scopes = 'https://www.googleapis.com/auth/calendar.readonly';
const jwt = new google.auth.JWT(key.client_email, null, key.private_key, scopes);

process.env.GOOGLE_APPLICATION_CREDENTIALS = config.service_creds;

function getEvents(calendarIds) {
    var promises = [];

    calendarIds.forEach((id) => {
        promises.push(getCalendarEvents(id));
    }); 

    var events = [];

    return Promise.all(promises)
    .then((all_events) => {
        all_events.forEach((cal_events) => {
            events = events.concat(cal_events);
        });
        return events;
    });
}

function getCalendarEvents(calendarId) {
    return new Promise((resolve, reject) => {
        jwt.authorize((err, res) => {
            if(err) { reject(err); return; }

            google.calendar('v3').events.list({
                auth: jwt,
                calendarId,
                timeMax: '2019-06-01T00:00:00z',
                timeMin: '2019-05-01T00:00:00z'
            }, (err, res) => {
                if(err) { reject(err); return; }
                resolve(res.data.items);                
            });
        });
    });
}

module.exports = {
    getEvents,
    getCalendarEvents
};
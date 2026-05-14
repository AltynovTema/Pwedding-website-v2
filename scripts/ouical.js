;(function(exports) {
    var MS_IN_MINUTES = 60 * 1000;

    var formatTime = function(date) {
        return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    var calculateEndTime = function(event) {
        return event.end ?
            formatTime(event.end) :
            formatTime(new Date(event.start.getTime() + (event.duration * MS_IN_MINUTES)));
    };

    var calendarGenerators = {
        google: function(event) {
            var startTime = formatTime(event.start);
            var endTime = calculateEndTime(event);

            var href = encodeURI([
                'https://www.google.com/calendar/render',
                '?action=TEMPLATE',
                '&text=' + (event.title || ''),
                '&dates=' + (startTime || ''),
                '/' + (endTime || ''),
                '&details=' + (event.description || ''),
                '&location=' + (event.address || ''),
                '&sprop=&sprop=name:'
            ].join(''));
            return '<a class="calendar-btn icon-google" target="_blank" href="' +
                href + '">Google Calendar</a>';
        },

        yahoo: function(event) {
            var eventDuration = event.end ?
                ((event.end.getTime() - event.start.getTime())/ MS_IN_MINUTES) :
                event.duration;

            // Yahoo dates are crazy, we need to convert the duration from minutes to hh:mm
            var yahooHourDuration = eventDuration < 600 ?
                '0' + Math.floor((eventDuration / 60)) :
                Math.floor((eventDuration / 60)) + '';

            var yahooMinuteDuration = eventDuration % 60 < 10 ?
                '0' + eventDuration % 60 :
                eventDuration % 60 + '';

            var yahooEventDuration = yahooHourDuration + yahooMinuteDuration;

            // Remove timezone from event time
            var st = formatTime(new Date(event.start - (event.start.getTimezoneOffset() *
                MS_IN_MINUTES))) || '';

            var href = encodeURI([
                'http://calendar.yahoo.com/?v=60&view=d&type=20',
                '&title=' + (event.title || ''),
                '&st=' + st,
                '&dur=' + (yahooEventDuration || ''),
                '&desc=' + (event.description || ''),
                '&in_loc=' + (event.address || '')
            ].join(''));

            return '<a class="calendar-btn icon-yahoo" target="_blank" href="' +
                href + '">Yahoo! Calendar</a>';
        },

        ics: function(event, eClass, calendarName) {
            var startTime = formatTime(event.start);
            var endTime = calculateEndTime(event);

            var icsContent = [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'PRODID:-//Wedding Invitation//RU',
                'CALSCALE:GREGORIAN',
                'METHOD:PUBLISH',
                'BEGIN:VEVENT',
                'UID:' + Date.now() + '@wedding-invitation',
                'DTSTAMP:' + formatTime(new Date()),
                'DTSTART:' + (startTime || ''),
                'DTEND:' + (endTime || ''),
                'SUMMARY:' + (event.title || ''),
                'DESCRIPTION:' + (event.description || ''),
                'LOCATION:' + (event.address || ''),
                'END:VEVENT',
                'END:VCALENDAR'
            ].join('\r\n');

            var href = 'data:text/calendar;charset=utf8,' + encodeURIComponent(icsContent);

            return '<a class="calendar-btn ' + eClass + '" href="' +
                href + '" download="wedding-artem-alena.ics">' + calendarName + '</a>';
        },

        ical: function(event) {
            return this.ics(event, 'icon-ical', 'Apple Calendar');
        },

        outlook: function(event) {
            return this.ics(event, 'icon-outlook', 'Outlook');
        }
    };

    var generateCalendars = function(event) {
        return {
            google: calendarGenerators.google(event),
            ical: calendarGenerators.ical(event)
        };
    };

    // Create CSS
    var addCSS = function() {
        if (!document.getElementById('ouical-css')) {
            document.getElementsByTagName('head')[0].appendChild(generateCSS());
        }
    };

    var generateCSS = function() {
        var styles = document.createElement('style');
        styles.id = 'ouical-css';

        styles.innerHTML = ".add-to-calendar-container{margin-top:1rem;display:flex;flex-wrap:wrap;gap:0.5rem}.calendar-btn{display:inline-block;padding:0.5rem 1rem;border-radius:0.375rem;font-weight:600;text-decoration:none;color:white;transition:all 0.3s ease;font-size:0.875rem}.calendar-btn:hover{transform:translateY(-2px);box-shadow:0 4px 8px rgba(0,0,0,0.2)}.icon-google{background-color:#4285F4}.icon-google:hover{background-color:#3367D6}.icon-ical{background-color:#000000}.icon-ical:hover{background-color:#333333}";

        return styles;
    };

    // Make sure we have the necessary event data, such as start time and event duration
    var validParams = function(params) {
        return params.data !== undefined && params.data.start !== undefined &&
            (params.data.end !== undefined || params.data.duration !== undefined);
    };

    var generateMarkup = function(calendars, clazz, calendarId) {
        var result = document.createElement('div');
        result.className = 'add-to-calendar-container';
        
        if (clazz !== undefined) {
            result.className += (' ' + clazz);
        }

        Object.keys(calendars).forEach(function(services) {
            result.innerHTML += calendars[services];
        });

        addCSS();

        result.id = calendarId;
        return result;
    };

    var getClass = function(params) {
        if (params.options && params.options.class) {
            return params.options.class;
        }
    };

    var getOrGenerateCalendarId = function(params) {
        return params.options && params.options.id ?
            params.options.id :
            Math.floor(Math.random() * 1000000); // Generate a 6-digit random ID
    };

    exports.createCalendar = function(params) {
        if (!validParams(params)) {
            console.log('Event details missing.');
            return;
        }

        return generateMarkup(generateCalendars(params.data),
            getClass(params),
            getOrGenerateCalendarId(params));
    };
})(this);

var cal = new Calendar();
var $cal_container = $('#calendar');
var $weeks_container = $('#weeks-container', $cal_container);
var day_template = $('#day_template').html();
var socket = io();

$('#month-bar', $cal_container).text(cal.getMonth()+' '+cal.getYear());

var weeks_position = $weeks_container.position()
$weeks_container.css({'height': 'calc(100vh - '+weeks_position.top+'px)'});

var days = [];
var num_weeks = 0;
var first_dow = cal.getDOW(1);
for(var dow = 0; dow < first_dow; dow++) {
    days.push(Mustache.render(day_template, {
        status_class: 'day-past',
    }));
}

var num_days = cal.getNumDays();
for(var date = 1; date <= num_days; date++) {
    days.push(Mustache.render(day_template, {
        status_class: date < cal.getDate() ? 'day-past' : '',
        date: date,
        date_class: date == cal.getDate() ? 'today' : ''
    }));

    if(cal.getDOW(date) == 6) {
        $weeks_container.append('<div class="week">'+days.join('')+'</div>');
        days = [];
        num_weeks++
    }
}

for(dow = cal.getDOW(num_days) + 1; dow <= 6; dow++) {
    days.push(Mustache.render(day_template, {
        status_class: 'day-next-month',
    }));
}

if(cal.getDOW(num_days) != 6) { num_weeks++; }

$weeks_container.append('<div class="week">'+days.join('')+'</div>');

$('.week', $weeks_container).css({'height': 'calc(100% / '+num_weeks+')'});

socket.on('events', function(events) {
    events.forEach(function(event) {
        if(event.recurrence.length) {
            var rule_parts = event.recurrence[0].substr(6).split(';');
            var freq = rule_parts[0].substr(5);
            var interval = rule_parts[2].substr(-1);
            var dates = cal.getRecurringDates(event.start.date, freq, interval);
        } else {
            var dates = [event.start.date.substr(-2)];
        }

        dates.forEach(function(date) {
            $('#day-'+date+' .events-container').append('<p>'+event.summary+'</p>');
        });
    });
});
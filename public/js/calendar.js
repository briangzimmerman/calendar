function Calendar() {
    this.now = new Date();
    
    this.getMonth = function() {
        return [
            'January',
            'Febuary',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ][this.now.getMonth()];
    };

    this.getYear = function() {
        return this.now.getFullYear();
    };

    this.getNumDays = function() {
        return new Date(this.now.getFullYear(), this.now.getMonth()+1, 0).getDate();
    };

    this.getDOW = function(date) {
        return new Date(this.now.getFullYear(), this.now.getMonth(), date).getDay();
    };

    this.getDays = function() {
        return [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
    };

    this.getDate = function() {
        return this.now.getDate();
    }

    this.getRecurringDates = function(start_date, frequency, interval) {
        var frequencies = {'WEEKLY': 7};
        var days_between = frequencies[frequency] * interval;
        var next_month = (new Date(this.now.getFullYear(), this.now.getMonth()+1, 1)).getTime();
        var this_month = (new Date(this.now.getFullYear(), this.now.getMonth(), 1)).getTime();
        var dates = [];

        for(var date = Date.parse(start_date); date < next_month; date += (days_between * 86400000)) {
            if(date < this_month) { continue; }
            dates.push((new Date(date)).getDate() + 1);
        }

        return dates;
    }
}
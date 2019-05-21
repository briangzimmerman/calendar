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
}
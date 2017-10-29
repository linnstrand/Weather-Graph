define(["require", "exports", "d3"], function (require, exports, d3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class weatherGraphService {
        constructor() {
            this.formatMillisecond = d3.timeFormat('.%L');
            this.formatSecond = d3.timeFormat(':%S');
            this.formatMinute = d3.timeFormat('%H:%M');
            this.formatHour = d3.timeFormat('%H:%M');
            this.formatDay = d3.timeFormat('%a %d');
            this.formatWeek = d3.timeFormat('%b %d');
            this.formatMonth = d3.timeFormat('%B');
            this.formatYear = d3.timeFormat('%Y');
        }
        //we have 60 temperatures (-30 to 30)
        generateColorData(data) {
            return data.map((d, i) => {
                let hue = Math.floor(280 * (1 - (d.temp + 25) / 50));
                let hsl = "hsl(" + hue + " ,100%, 50%)";
                let percentage = Math.floor((i + 1) / data.length * 100) + "%";
                return {
                    offset: percentage,
                    color: hsl
                };
            });
        }
        setTopLow(data) {
            var temps = data.map(d => d.temp);
            var winds = data.map(d => d.wind_speed);
            var minDate = this.firstDate(data);
            var maxDate = this.lastDate(data);
            return {
                highTemp: d3.max(temps) || 0,
                lowTemp: d3.min(temps) || 0,
                highWind: d3.max(winds) || 0,
                lowWind: d3.min(winds) || 0,
                minDate: minDate,
                maxDate: maxDate,
            };
        }
        firstDate(data) {
            return new Date(data[0].time);
        }
        lastDate(data) {
            return new Date(data[data.length - 1].time);
        }
        multiFormat(date) {
            return (d3.timeHour(date) < date ? this.formatMinute :
                d3.timeDay(date) < date ? this.formatHour :
                    d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? this.formatDay : this.formatWeek) :
                        d3.timeYear(date) < date ? this.formatMonth :
                            this.formatYear)(date);
        }
    }
    exports.weatherGraphService = weatherGraphService;
});
//# sourceMappingURL=weather-graph-service.js.map
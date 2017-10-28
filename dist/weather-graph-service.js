define(["require", "exports", "d3"], function (require, exports, d3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var weatherGraphService = /** @class */ (function () {
        function weatherGraphService() {
            this.formatMillisecond = d3.timeFormat('.%L');
            this.formatSecond = d3.timeFormat(':%S');
            this.formatMinute = d3.timeFormat('%H:%M');
            this.formatHour = d3.timeFormat('%H:%M');
            this.formatDay = d3.timeFormat('%a %d');
            this.formatWeek = d3.timeFormat('%b %d');
            this.formatMonth = d3.timeFormat('%B');
            this.formatYear = d3.timeFormat('%Y');
        }
        weatherGraphService.prototype.getNextRainMessage = function (data) {
            var nextRain = data.filter(function (d, i) {
                return d.pcat != 'no_prep';
            })[0];
            if (nextRain && nextRain.time) {
                return 'Expect ' + nextRain.pcat + ' at ' + this.multiFormat(new Date(nextRain.time));
            }
            return '';
        };
        //we have 60 temperatures (-30 to 30)
        weatherGraphService.prototype.generateColorData = function (data) {
            return data.map(function (d, i) {
                var hue = Math.floor(280 * (1 - (d.temp + 25) / 50));
                var hsl = "hsl(" + hue + " ,100%, 50%)";
                var percentage = Math.floor((i + 1) / data.length * 100) + "%";
                return {
                    offset: percentage,
                    color: hsl
                };
            });
        };
        weatherGraphService.prototype.setTopLow = function (data) {
            var temps = data.map(function (d) {
                return d.temp;
            });
            var winds = data.map(function (d) {
                return d.wind_speed;
            });
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
        };
        weatherGraphService.prototype.firstDate = function (data) {
            return new Date(data[0].time);
        };
        weatherGraphService.prototype.lastDate = function (data) {
            return new Date(data[data.length - 1].time);
        };
        weatherGraphService.prototype.multiFormat = function (date) {
            return (d3.timeHour(date) < date ? this.formatMinute :
                d3.timeDay(date) < date ? this.formatHour :
                    d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? this.formatDay : this.formatWeek) :
                        d3.timeYear(date) < date ? this.formatMonth :
                            this.formatYear)(date);
        };
        return weatherGraphService;
    }());
    exports.weatherGraphService = weatherGraphService;
});
//# sourceMappingURL=weather-graph-service.js.map
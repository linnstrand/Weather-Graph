import * as d3 from 'd3';
import { weather } from './weather';

export class weatherGraphService {

    formatMillisecond = d3.timeFormat('.%L');
    formatSecond = d3.timeFormat(':%S');
    formatMinute = d3.timeFormat('%H:%M');
    formatHour = d3.timeFormat('%H:%M');
    formatDay = d3.timeFormat('%a %d');
    formatWeek = d3.timeFormat('%b %d');
    formatMonth = d3.timeFormat('%B');
    formatYear = d3.timeFormat('%Y');

    //we have 60 temperatures (-30 to 30)
    //0 = 170
    generateColorData(data: weather[]) {
        return data.map((d, i) => {
            let hue = Math.floor(280 * (1 - (d.temp + 30) / 60));;
            // if (d.temp > -4 && d.temp < 1) {
            //     hue = Math.floor(280 * (1 - (d.temp + 25) / 60));
            // }
            // if (d.temp > 0 && d.temp < 4) {
            //     hue = Math.floor(280 * (1 - (d.temp + 23) / 60));
            // }
            // if (d.temp > 5 && d.temp < 10) {
            //     hue = Math.floor(280 * (1 - (d.temp + 20) / 60));
            // }
            if (hue > 90 && hue < 115) {
                hue = hue * 0.9;
            }
            if (hue > 115 && hue < 140) {
                hue = hue * 1.3;
            }
            // if (hue < 115) {
            //     hue = 90;
            // }
            // if (hue > 115) {
            //     hue = 140;
            // }
            let hsl = "hsl(" + hue + " ,100%, 50%)";
            let percentage = Math.floor((i + 1) / data.length * 100) + "%";
            return {
                offset: percentage,
                color: hsl
            };
        });
    }

    setTopLow(data: weather[]) {
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

    firstDate(data: weather[]) {
        return new Date(data[0].time);
    }

    lastDate(data: weather[]) {
        return new Date(data[data.length - 1].time);
    }

    multiFormat(date: Date) {
        return (
            d3.timeHour(date) < date ? this.formatMinute :
                d3.timeDay(date) < date ? this.formatHour :
                    d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? this.formatDay : this.formatWeek) :
                        d3.timeYear(date) < date ? this.formatMonth :
                            this.formatYear)(date);
    }
}
import { timeFormat, timeHour, timeDay, timeMonth, timeWeek, timeYear } from 'd3';
import { Injectable } from '@angular/core';

@Injectable()
export class TimeFormatService {
  formatMillisecond = timeFormat(".%L");
  formatSecond = timeFormat(":%S");
  formatMinute = timeFormat("%H:%M");
  formatHour = timeFormat("%H:%M");
  formatDay = timeFormat("%a %d");
  formatWeek = timeFormat("%b %d");
  formatMonth = timeFormat("%B");
  formatYear = timeFormat("%Y");

  multiFormat(date: Date) {
    return (timeHour(date) < date
      ? this.formatMinute
      : timeDay(date) < date
        ? this.formatHour
        : timeMonth(date) < date
          ? timeWeek(date) < date ? this.formatDay : this.formatWeek
          : timeYear(date) < date ? this.formatMonth : this.formatYear)(date);
  }

  longDate(date: Date) {
    let format = timeFormat("%d at %H:%M");
    if (new Date(Date.now()).setHours(0, 0, 0, 0) == date.setHours(0, 0, 0, 0)) {
      format = timeFormat("%H:%M");
    }
    return format(date);
  }

}
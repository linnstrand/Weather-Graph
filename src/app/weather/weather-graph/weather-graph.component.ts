import { Component, OnInit, Input } from '@angular/core';
import { drawGraph } from './weather-graph-drawer';
import { Weather } from '../weather.model';

@Component({
  selector: 'weather-graph',
  template: '<div id="weather-graph"></div>',
})
export class WeatherGraphComponent implements OnInit {
  @Input() weatherData: Weather[];
  constructor() { }

  ngOnInit() {
    drawGraph(this.weatherData);
  }

}

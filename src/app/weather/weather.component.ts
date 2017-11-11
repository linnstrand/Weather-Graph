import { Component, OnInit } from '@angular/core';
import { Weather } from './weather.model';
import { WeatherService } from './weather.service';

@Component({
    selector: 'weather-app',
    templateUrl: 'weather.component.html',
    styles: []
})

export class WeatherComponent implements OnInit {
    weather: Weather[];

    constructor(
        private weatherService: WeatherService
    ) { }

    ngOnInit() {
        this.weatherService.getAll().then(weather => this.weather = weather);
    }
}

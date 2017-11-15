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
    weatherPromise: Promise<Weather[]>;
    rainMessage: string;

    constructor(
        private weatherService: WeatherService
    ) { }

    ngOnInit() {
        this.weatherService.getCoordinates()
            .then((coordinates) =>
                this.weatherPromise = this.weatherService.getAll(coordinates)
                    .then(weather => {
                        this.weather = weather;
                        this.rainMessage = this.weatherService.getNextRainMessage(this.weather);
                        return weather;
                    }
                    ))

    }


    setTemperature = function (temp) {
        var hue = 280 * (1 - (temp + 25) / 50);
        var color = "hsl(" + hue + " ,100%, 50%)";
        return { 'color: ': color };
    };
}

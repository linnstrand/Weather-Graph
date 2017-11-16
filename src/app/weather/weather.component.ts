import { Component, OnInit } from '@angular/core';
import { Weather } from 'app/weather/weather.model';
import { WeatherService } from 'app/weather/weather.service';

@Component({
    selector: 'weather-app',
    templateUrl: 'weather.component.html',
    styles: []
})

export class WeatherComponent implements OnInit {
    weather: Weather[];
    weatherPromise: Promise<Weather[]>;
    rainMessage: string;
    dateTime: Date;

    constructor(
        private weatherService: WeatherService
    ) { }

    ngOnInit() {
        this.dateTime = new Date(Date.now());
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

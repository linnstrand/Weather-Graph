import { Weather } from './weather.model';
import { SampleData } from './sample-data'
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

class weatherResponse {
    public t: number;
    public ws: number;
}

class Coordinates {
    public lat: number;
    public lon: number;
}

@Injectable()
export class WeatherService {

    constructor(private http: Http) { }

    getCoordinates(): Promise<Coordinates> {
        let coordinates: Coordinates = {
            lat: 59.3669,
            lon: 17.9672
        }
        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by this browser.");
            // return Promise.resolve(SampleData.data);
            return Promise.resolve(coordinates);
        };
        return new Promise<Coordinates>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(position => {
                coordinates.lat = position.coords.latitude;
                coordinates.lon = position.coords.longitude;
                resolve(coordinates);

            },
                err => {
                    reject(coordinates);
                });
        });
    }

    getAll(coordinates): Promise<Weather[]> {
        try {
            return this.getWeatherAsync(coordinates);
        } catch (error) {
            return Promise.resolve(SampleData.data);
        }
    }


    private getWeatherAsync(coordinates: Coordinates): Promise<Weather[]> {
        let url = `https://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/${coordinates.lon.toFixed(6)}/lat/${coordinates.lat.toFixed(6)}/data.json`;
        return this.http.get(url).toPromise()
            .then((response) => {
                let weather = this.getWeatherData(response.json());
                return weather;
            })
            .catch(this.handleError);
    }

    private getWeatherData(response: any): Weather[] {
        {
            let ts = response.timeSeries;
            let weatherData: Weather[] = ts.map(t => {
                let params = new weatherResponse;
                t.parameters.forEach(p => params[p.name] = (p.values || [0])[0]);
                return {
                    time: t.validTime,
                    temp: params.t,
                    wind_speed: params.ws,
                };
            });
            return weatherData.slice(0, 30);
        }
    };

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

}



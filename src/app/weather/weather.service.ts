import { Weather } from './weather.model';
import { SampleData } from './sample-data'
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

class weatherResponse {
    public t: number;
    public ws: number;
}

@Injectable()
export class WeatherService {

    constructor(private http: Http) { }

    getAll(): Promise<Weather[]> {
        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by this browser.");
            return Promise.resolve(SampleData.data);
        };

        let lat = 59.3669;
        let lon = 17.9672;

        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            try {
                return this.getWeatherAsync(lat, lon);
            } catch (error) {
                return Promise.resolve(SampleData.data);
            }
        });
    }

    private getWeatherAsync(lat: number, lon: number): Promise<Weather[]> {
        let url = `https://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/${lon.toFixed(6)}/lat/${lat.toFixed(6)}/data.json`;
        return this.http.get(url).toPromise()
            .then(this.getWeatherData)
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



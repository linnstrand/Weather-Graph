var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class weatherResponse {
    }
    class WeatherData {
        static getAll() {
            return __awaiter(this, void 0, void 0, function* () {
                if (!navigator.geolocation) {
                    console.log("Geolocation is not supported by this browser.");
                    return Promise.resolve(SampleData.data);
                }
                ;
                var position;
                let lat = 59.3669;
                let lon = 17.9672;
                navigator.geolocation.getCurrentPosition(_position => { position = _position; });
                if (position) {
                    lat = position.coords.latitude;
                    lon = position.coords.longitude;
                }
                try {
                    return yield WeatherData.getWeatherAsync(lat, lon);
                }
                catch (error) {
                    return SampleData.data;
                }
            });
        }
        static getWeatherAsync(lat, lon) {
            return __awaiter(this, void 0, void 0, function* () {
                let url = `https://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;
                return new Promise((resolve, reject) => {
                    let request = new XMLHttpRequest();
                    request.onload = () => {
                        if (request.readyState === 4) {
                            if (request.status === 200) {
                                let response = JSON.parse(request.responseText);
                                resolve(WeatherData.getWeatherData(response));
                            }
                            else {
                                reject(new Error(request.statusText));
                            }
                        }
                    };
                    request.onerror = () => {
                        reject(new Error(request.statusText));
                    };
                    request.open("GET", url, true);
                    request.send();
                });
            });
        }
        static getWeatherData(response) {
            {
                let ts = response.timeSeries;
                let weatherData = ts.map(t => {
                    let params = new weatherResponse;
                    t.parameters.forEach(p => params[p.name] = (p.values || [0])[0]);
                    return {
                        time: t.validTime,
                        temp: params.t,
                        wind_speed: params.ws,
                    };
                });
                return weatherData;
            }
        }
        ;
    }
    exports.WeatherData = WeatherData;
    class SampleData {
    }
    SampleData.data = [
        {
            "pcat": "no_prep",
            "temp": 22.3,
            "time": "2017-07-24T14:00:00Z",
            "wind_dir": 75,
            "symbol": 3,
            "wind_speed": 3.3,
            "gust": 5.7
        },
        {
            "gust": 9,
            "time": "2017-07-24T15:00:00Z",
            "symbol": 6,
            "wind_speed": 3.9,
            "wind_dir": 86,
            "pcat": "no_prep",
            "temp": 21.2
        },
        {
            "gust": 9.1,
            "time": "2017-07-24T16:00:00Z",
            "symbol": 6,
            "wind_speed": 3.3,
            "wind_dir": 91,
            "pcat": "no_prep",
            "temp": 20.3
        },
        {
            "gust": 8.1,
            "pcat": "no_prep",
            "temp": 19.4,
            "time": "2017-07-24T17:00:00Z",
            "wind_speed": 3.3,
            "symbol": 6,
            "wind_dir": 93
        },
        {
            "gust": 8.3,
            "time": "2017-07-24T18:00:00Z",
            "wind_speed": 3.8,
            "symbol": 3,
            "wind_dir": 24,
            "pcat": "no_prep",
            "temp": 18.6
        },
        {
            "temp": 17.3,
            "pcat": "no_prep",
            "wind_dir": 27,
            "symbol": 3,
            "wind_speed": 3,
            "time": "2017-07-24T19:00:00Z",
            "gust": 8.1
        },
        {
            "time": "2017-07-24T20:00:00Z",
            "symbol": 3,
            "wind_speed": 2.8,
            "wind_dir": 10,
            "pcat": "no_prep",
            "temp": 15.9,
            "gust": 6
        },
        {
            "gust": 6.5,
            "symbol": 3,
            "wind_speed": 3.2,
            "wind_dir": 13,
            "time": "2017-07-24T21:00:00Z",
            "temp": 14.6,
            "pcat": "no_prep"
        },
        {
            "gust": 6.4,
            "pcat": "no_prep",
            "temp": 13.9,
            "time": "2017-07-24T22:00:00Z",
            "wind_dir": 14,
            "symbol": 2,
            "wind_speed": 2.9
        },
        {
            "time": "2017-07-24T23:00:00Z",
            "wind_dir": 13,
            "symbol": 2,
            "wind_speed": 2.4,
            "pcat": "no_prep",
            "temp": 13.1,
            "gust": 5.8
        },
        {
            "gust": 4.7,
            "time": "2017-07-25T00:00:00Z",
            "symbol": 1,
            "wind_dir": 353,
            "wind_speed": 1.8,
            "pcat": "no_prep",
            "temp": 12.5
        },
        {
            "time": "2017-07-25T01:00:00Z",
            "symbol": 1,
            "wind_dir": 351,
            "wind_speed": 1.9,
            "pcat": "no_prep",
            "temp": 12.5,
            "gust": 3.7
        },
        {
            "wind_dir": 358,
            "symbol": 1,
            "wind_speed": 2,
            "time": "2017-07-25T02:00:00Z",
            "temp": 12.6,
            "pcat": "no_prep",
            "gust": 3.9
        },
        {
            "temp": 12.6,
            "pcat": "no_prep",
            "wind_dir": 355,
            "symbol": 1,
            "wind_speed": 1.8,
            "time": "2017-07-25T03:00:00Z",
            "gust": 3.8
        },
        {
            "time": "2017-07-25T04:00:00Z",
            "symbol": 2,
            "wind_speed": 1.8,
            "wind_dir": 359,
            "pcat": "no_prep",
            "temp": 13.7,
            "gust": 3.9
        },
        {
            "time": "2017-07-25T05:00:00Z",
            "wind_dir": 12,
            "symbol": 3,
            "wind_speed": 2.1,
            "pcat": "no_prep",
            "temp": 14.7,
            "gust": 4.8
        },
        {
            "symbol": 4,
            "wind_speed": 2.2,
            "wind_dir": 23,
            "time": "2017-07-25T06:00:00Z",
            "temp": 15.8,
            "pcat": "no_prep",
            "gust": 5.1
        },
        {
            "gust": 5.2,
            "temp": 16.8,
            "pcat": "no_prep",
            "wind_dir": 17,
            "symbol": 4,
            "wind_speed": 2.2,
            "time": "2017-07-25T07:00:00Z"
        },
        {
            "gust": 7.2,
            "pcat": "no_prep",
            "temp": 18,
            "time": "2017-07-25T08:00:00Z",
            "symbol": 4,
            "wind_speed": 2.9,
            "wind_dir": 42
        },
        {
            "time": "2017-07-25T09:00:00Z",
            "symbol": 4,
            "wind_speed": 2.9,
            "wind_dir": 53,
            "pcat": "drizzle",
            "temp": 19.3,
            "gust": 7.2
        },
        {
            "temp": 19.2,
            "pcat": "drizzle",
            "symbol": 6,
            "wind_dir": 76,
            "wind_speed": 2.7,
            "time": "2017-07-25T10:00:00Z",
            "gust": 7
        },
        {
            "gust": 6.9,
            "temp": 19,
            "pcat": "drizzle",
            "symbol": 4,
            "wind_dir": 68,
            "wind_speed": 3,
            "time": "2017-07-25T11:00:00Z"
        },
        {
            "gust": 8,
            "wind_speed": 3.2,
            "symbol": 4,
            "wind_dir": 70,
            "time": "2017-07-25T12:00:00Z",
            "temp": 18.9,
            "pcat": "drizzle"
        },
        {
            "gust": 8.8,
            "temp": 18.8,
            "pcat": "no_prep",
            "symbol": 4,
            "wind_dir": 62,
            "wind_speed": 2.8,
            "time": "2017-07-25T13:00:00Z"
        },
        {
            "gust": 7.5,
            "time": "2017-07-25T14:00:00Z",
            "symbol": 4,
            "wind_dir": 68,
            "wind_speed": 3.2,
            "pcat": "no_prep",
            "temp": 18.9
        },
        {
            "temp": 18.9,
            "pcat": "no_prep",
            "wind_dir": 63,
            "symbol": 4,
            "wind_speed": 3.2,
            "time": "2017-07-25T15:00:00Z",
            "gust": 7.8
        },
        {
            "gust": 7.7,
            "pcat": "no_prep",
            "temp": 18.4,
            "time": "2017-07-25T16:00:00Z",
            "wind_dir": 57,
            "symbol": 4,
            "wind_speed": 3.2
        },
        {
            "gust": 6.9,
            "wind_speed": 2.4,
            "symbol": 4,
            "wind_dir": 78,
            "time": "2017-07-25T17:00:00Z",
            "temp": 18.1,
            "pcat": "no_prep"
        },
        {
            "temp": 17.7,
            "pcat": "no_prep",
            "symbol": 3,
            "wind_speed": 3.1,
            "wind_dir": 35,
            "time": "2017-07-25T18:00:00Z",
            "gust": 6.6
        },
        {
            "gust": 8.6,
            "pcat": "no_prep",
            "temp": 16.4,
            "time": "2017-07-25T19:00:00Z",
            "symbol": 2,
            "wind_dir": 32,
            "wind_speed": 3.7
        },
        {
            "gust": 7.5,
            "time": "2017-07-25T20:00:00Z",
            "wind_speed": 2.6,
            "symbol": 1,
            "wind_dir": 30,
            "pcat": "no_prep",
            "temp": 15.1
        },
        {
            "gust": 5,
            "pcat": "no_prep",
            "temp": 13.9,
            "time": "2017-07-25T21:00:00Z",
            "symbol": 2,
            "wind_speed": 2.1,
            "wind_dir": 22
        },
        {
            "time": "2017-07-25T22:00:00Z",
            "wind_dir": 12,
            "symbol": 2,
            "wind_speed": 2.5,
            "pcat": "no_prep",
            "temp": 13,
            "gust": 4.8
        },
        {
            "temp": 12.3,
            "pcat": "no_prep",
            "symbol": 2,
            "wind_speed": 2.2,
            "wind_dir": 12,
            "time": "2017-07-25T23:00:00Z",
            "gust": 4.9
        },
        {
            "temp": 12,
            "pcat": "no_prep",
            "symbol": 2,
            "wind_speed": 2.3,
            "wind_dir": 13,
            "time": "2017-07-26T00:00:00Z",
            "gust": 5
        },
        {
            "wind_speed": 2.6,
            "symbol": 3,
            "wind_dir": 9,
            "time": "2017-07-26T01:00:00Z",
            "temp": 12.2,
            "pcat": "no_prep",
            "gust": 5
        },
        {
            "gust": 4.8,
            "pcat": "no_prep",
            "temp": 12.5,
            "time": "2017-07-26T02:00:00Z",
            "wind_speed": 2.5,
            "symbol": 4,
            "wind_dir": 9
        },
        {
            "gust": 5.1,
            "wind_dir": 16,
            "symbol": 7,
            "wind_speed": 2.7,
            "time": "2017-07-26T03:00:00Z",
            "temp": 12.7,
            "pcat": "no_prep"
        },
        {
            "temp": 14.2,
            "pcat": "no_prep",
            "symbol": 4,
            "wind_speed": 3,
            "wind_dir": 28,
            "time": "2017-07-26T04:00:00Z",
            "gust": 6.5
        },
        {
            "gust": 7.2,
            "symbol": 4,
            "wind_speed": 3.1,
            "wind_dir": 39,
            "time": "2017-07-26T05:00:00Z",
            "temp": 15.7,
            "pcat": "no_prep"
        },
        {
            "gust": 8.2,
            "pcat": "no_prep",
            "temp": 17.1,
            "time": "2017-07-26T06:00:00Z",
            "wind_dir": 49,
            "symbol": 4,
            "wind_speed": 3.5
        },
        {
            "gust": 9,
            "temp": 18.5,
            "pcat": "drizzle",
            "wind_dir": 55,
            "symbol": 4,
            "wind_speed": 3.7,
            "time": "2017-07-26T07:00:00Z"
        },
        {
            "temp": 19.2,
            "pcat": "rain",
            "symbol": 6,
            "wind_dir": 63,
            "wind_speed": 3.7,
            "time": "2017-07-26T08:00:00Z",
            "gust": 9.1
        },
        {
            "gust": 8.9,
            "temp": 19.6,
            "pcat": "rain",
            "symbol": 6,
            "wind_dir": 65,
            "wind_speed": 3.4,
            "time": "2017-07-26T09:00:00Z"
        },
        {
            "temp": 19.8,
            "pcat": "rain",
            "wind_dir": 68,
            "symbol": 4,
            "wind_speed": 3.6,
            "time": "2017-07-26T10:00:00Z",
            "gust": 8.4
        },
        {
            "temp": 19.9,
            "pcat": "drizzle",
            "wind_dir": 73,
            "symbol": 4,
            "wind_speed": 3.4,
            "time": "2017-07-26T11:00:00Z",
            "gust": 8.7
        },
        {
            "temp": 20,
            "pcat": "drizzle",
            "symbol": 4,
            "wind_speed": 3.3,
            "wind_dir": 76,
            "time": "2017-07-26T12:00:00Z",
            "gust": 8.4
        },
        {
            "gust": 8.3,
            "temp": 20.3,
            "pcat": "rain",
            "wind_dir": 77,
            "symbol": 6,
            "wind_speed": 3.1,
            "time": "2017-07-26T15:00:00Z"
        },
        {
            "pcat": "no_prep",
            "temp": 17.6,
            "time": "2017-07-26T18:00:00Z",
            "symbol": 5,
            "wind_speed": 2.3,
            "wind_dir": 82,
            "gust": 6.9
        },
        {
            "pcat": "no_prep",
            "temp": 14.7,
            "time": "2017-07-26T21:00:00Z",
            "wind_dir": 76,
            "symbol": 3,
            "wind_speed": 2,
            "gust": 3.5
        },
        {
            "gust": 3.1,
            "temp": 13.3,
            "pcat": "no_prep",
            "symbol": 3,
            "wind_speed": 1.9,
            "wind_dir": 25,
            "time": "2017-07-27T00:00:00Z"
        },
        {
            "symbol": 2,
            "wind_speed": 2.7,
            "wind_dir": 72,
            "time": "2017-07-27T06:00:00Z",
            "temp": 18.2,
            "pcat": "no_prep",
            "gust": 6.7
        },
        {
            "gust": 9.2,
            "time": "2017-07-27T12:00:00Z",
            "symbol": 4,
            "wind_dir": 114,
            "wind_speed": 3.2,
            "pcat": "no_prep",
            "temp": 23.4
        },
        {
            "pcat": "no_prep",
            "temp": 19.1,
            "time": "2017-07-27T18:00:00Z",
            "symbol": 3,
            "wind_dir": 124,
            "wind_speed": 2.1,
            "gust": 6.3
        },
        {
            "time": "2017-07-28T00:00:00Z",
            "wind_speed": 1.8,
            "symbol": 6,
            "wind_dir": 99,
            "pcat": "rain",
            "temp": 15.3,
            "gust": 4.1
        },
        {
            "symbol": 6,
            "wind_dir": 6,
            "wind_speed": 1.5,
            "time": "2017-07-28T06:00:00Z",
            "temp": 15.7,
            "pcat": "drizzle",
            "gust": 3.6
        },
        {
            "gust": 6.6,
            "temp": 20,
            "pcat": "rain",
            "symbol": 8,
            "wind_dir": 273,
            "wind_speed": 2.3,
            "time": "2017-07-28T12:00:00Z"
        },
        {
            "gust": 6.8,
            "pcat": "rain",
            "temp": 17.5,
            "time": "2017-07-28T18:00:00Z",
            "wind_dir": 240,
            "symbol": 6,
            "wind_speed": 2.5
        },
        {
            "pcat": "rain",
            "temp": 14.5,
            "time": "2017-07-29T00:00:00Z",
            "wind_dir": 223,
            "symbol": 2,
            "wind_speed": 2,
            "gust": 4
        },
        {
            "gust": 7.2,
            "pcat": "no_prep",
            "temp": 16.8,
            "time": "2017-07-29T06:00:00Z",
            "wind_speed": 3.1,
            "symbol": 1,
            "wind_dir": 269
        },
        {
            "symbol": 3,
            "wind_speed": 4.6,
            "wind_dir": 246,
            "time": "2017-07-29T12:00:00Z",
            "temp": 21.8,
            "pcat": "no_prep",
            "gust": 11.1
        },
        {
            "gust": 10.4,
            "pcat": "no_prep",
            "temp": 19.8,
            "time": "2017-07-29T18:00:00Z",
            "symbol": 2,
            "wind_dir": 244,
            "wind_speed": 2.6
        },
        {
            "gust": 6.3,
            "wind_speed": 2.6,
            "symbol": 1,
            "wind_dir": 213,
            "time": "2017-07-30T00:00:00Z",
            "temp": 14.8,
            "pcat": "no_prep"
        },
        {
            "symbol": 3,
            "wind_speed": 1.9,
            "wind_dir": 203,
            "time": "2017-07-30T06:00:00Z",
            "temp": 17.3,
            "pcat": "no_prep",
            "gust": 5.2
        },
        {
            "gust": 10.3,
            "time": "2017-07-30T12:00:00Z",
            "wind_dir": 239,
            "symbol": 3,
            "wind_speed": 3.7,
            "pcat": "rain",
            "temp": 22.3
        },
        {
            "gust": 6.4,
            "pcat": "rain",
            "temp": 15.6,
            "time": "2017-07-31T00:00:00Z",
            "symbol": 6,
            "wind_speed": 1.8,
            "wind_dir": 229
        },
        {
            "gust": 12.7,
            "temp": 22.6,
            "pcat": "rain",
            "symbol": 12,
            "wind_speed": 5.1,
            "wind_dir": 203,
            "time": "2017-07-31T12:00:00Z"
        },
        {
            "temp": 15.2,
            "pcat": "rain",
            "wind_speed": 2.5,
            "symbol": 8,
            "wind_dir": 217,
            "time": "2017-08-01T00:00:00Z",
            "gust": 5.7
        },
        {
            "pcat": "rain",
            "temp": 22,
            "time": "2017-08-01T12:00:00Z",
            "wind_speed": 1.9,
            "symbol": 6,
            "wind_dir": 311,
            "gust": 8
        },
        {
            "gust": 7,
            "wind_dir": 252,
            "symbol": 8,
            "wind_speed": 3.5,
            "time": "2017-08-02T00:00:00Z",
            "temp": 15,
            "pcat": "rain"
        },
        {
            "gust": 11.2,
            "time": "2017-08-02T12:00:00Z",
            "symbol": 2,
            "wind_speed": 4.5,
            "wind_dir": 262,
            "pcat": "no_prep",
            "temp": 21.5
        },
        {
            "gust": 6.1,
            "time": "2017-08-03T00:00:00Z",
            "symbol": 1,
            "wind_speed": 2.8,
            "wind_dir": 268,
            "pcat": "no_prep",
            "temp": 15
        }
    ];
    exports.SampleData = SampleData;
});
//# sourceMappingURL=sample-data.js.map
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherGraphComponent } from './weather/weather-graph/weather-graph.component'


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    WeatherGraphComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { WeatherService } from './weather/weather.service';
import { WeatherComponent } from './weather/weather.component';
import { WeatherGraphComponent } from './weather/weather-graph/weather-graph.component'


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    WeatherGraphComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
  ],
  providers: [WeatherService,],
  bootstrap: [AppComponent]
})
export class AppModule { }

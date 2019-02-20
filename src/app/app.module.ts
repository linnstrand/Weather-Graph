import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { WeatherService } from './weather/weather.service';
import { TimeFormatService } from './time-format.service';
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
    HttpClientModule,
  ],
  providers: [
    WeatherService,
    TimeFormatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

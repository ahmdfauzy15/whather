import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  weatherTemp: any
  todayDate = new Date()
  cityName = ''
  weatherIcon: any
  weatherDetails: any
  name = ''
  loading = true



  constructor(private httpClient: HttpClient) {
    this.loadData();
  }

  loadData() {
    const API_URL = environment.API_URL;
    const API_KEY = environment.API_KEY;

    this.httpClient.get(`${API_URL}/weather?q=${this.cityName}&appid=${API_KEY}`).subscribe((results: any) => {
      console.log(results);
      if (results && results.main && results.name) {
        this.weatherTemp = results.main;
        this.name = results.name;
        this.weatherDetails = results.weather[0];
        this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherDetails.icon}@2x.png`
        this.loading = false
        console.log(this.weatherTemp);
        console.log(this.cityName);
        console.log(this.weatherDetails);
        console.log(this.weatherIcon);



      } else {
        console.error('Failed to fetch weather data');
      }
    });
  }
}

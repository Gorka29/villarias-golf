import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  name: string;
}

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {
  weatherData: WeatherData | null = null;
  loading = false;
  error = '';
  Math = Math; // Para usar Math en el template

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getWeatherData();
  }

  getWeatherData() {
    this.loading = true;
    this.error = '';

    // Coordenadas de Villarías Golf (ejemplo - ajusta según la ubicación real)
    const lat = 42.91667;
    const lon = -3.53333;
    const apiKey = '0bdf98327c31f845622f151b37f42280'; // Necesitarás obtener una API key de OpenWeatherMap

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

    this.http.get<WeatherData>(url).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudo cargar la información del tiempo';
        this.loading = false;
        console.error('Error fetching weather data:', err);
      }
    });
  }

  getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
}

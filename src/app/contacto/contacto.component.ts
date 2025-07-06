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

  //   // Mapeo de condiciones del tiempo a imágenes del campo de golf
  //   const weatherToGolfImage: { [key: string]: string } = {
  //     // Días soleados - usar hoyos con buen tiempo
  //     '01d': 'assets/hoyo 1 mejorado.png', // Cielo despejado
  //     '01n': 'assets/hoyo 2 mejorado.png', // Cielo despejado noche
  //     '02d': 'assets/hoyo 3 mejorado.png', // Pocas nubes
  //     '02n': 'assets/hoyo 4 mejorado.png', // Pocas nubes noche
      
  //     // Días nublados - usar hoyos con nubes
  //     '03d': 'assets/hoyo 5 mejorado 2.png', // Nubes dispersas
  //     '03n': 'assets/hoyo 6 mejorado.png', // Nubes dispersas noche
  //     '04d': 'assets/hoyo 7 mejorado.png', // Nubes rotas
  //     '04n': 'assets/hoyo 8 mejorado.png', // Nubes rotas noche
      
  //     // Lluvia - usar hoyos que se vean bien con lluvia
  //     '09d': 'assets/hoyo 9 mejorado .png', // Lluvia ligera
  //     '09n': 'assets/hoyo 1 mejorado.png', // Lluvia ligera noche
  //     '10d': 'assets/hoyo 2 mejorado.png', // Lluvia
  //     '10n': 'assets/hoyo 3 mejorado.png', // Lluvia noche
  //     '11d': 'assets/hoyo 4 mejorado.png', // Tormenta
  //     '11n': 'assets/hoyo 5 mejorado 2.png', // Tormenta noche
      
  //     // Nieve
  //     '13d': 'assets/hoyo 6 mejorado.png', // Nieve
  //     '13n': 'assets/hoyo 7 mejorado.png', // Nieve noche
      
  //     // Niebla
  //     '50d': 'assets/hoyo 8 mejorado.png', // Niebla
  //     '50n': 'assets/hoyo 9 mejorado .png', // Niebla noche
  //   };

  //   // Si no encontramos el código, usar una imagen por defecto
  //   return weatherToGolfImage[iconCode] || 'assets/hoyo 1 mejorado.png';
  // }
  }
}

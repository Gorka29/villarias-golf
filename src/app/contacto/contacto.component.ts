import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID  = 'service_villarias';
const EMAILJS_TEMPLATE_ID = 'template_contacto';
const EMAILJS_PUBLIC_KEY  = 'YNEVaf9cqbND7WARg';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {
  weatherData: WeatherData | null = null;
  loading = false;
  error = '';
  Math = Math;

  formData = { nombre: '', telefono: '', email: '', mensaje: '' };
  sending = false;
  sendSuccess = false;
  sendError = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getWeatherData();
  }

  onSubmit() {
    this.sending = true;
    this.sendSuccess = false;
    this.sendError = '';

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name:  this.formData.nombre,
        from_email: this.formData.email,
        phone:      this.formData.telefono,
        message:    this.formData.mensaje,
        to_email:   'gorkaruizaraujo@gmail.com',
      },
      EMAILJS_PUBLIC_KEY
    ).then(() => {
      this.sendSuccess = true;
      this.formData = { nombre: '', telefono: '', email: '', mensaje: '' };
      this.sending = false;
    }).catch(() => {
      this.sendError = 'No se pudo enviar el mensaje. Por favor, inténtalo de nuevo.';
      this.sending = false;
    });
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

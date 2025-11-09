import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements AfterViewInit, OnDestroy {
  title = 'villarias-golf';

  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  private observer: IntersectionObserver | null = null;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    // Solo ejecutar en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.setupLazyLoading();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupLazyLoading(): void {
    if (!this.videoElement || typeof IntersectionObserver === 'undefined') return;

    // Configurar Intersection Observer para lazy loading
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target as HTMLVideoElement;
          // Cargar el video solo cuando sea visible
          video.src = '/videos/ibon_carrito_baja_calidad.mp4';
          video.load();

          // Una vez cargado, desconectar el observer
          this.observer?.unobserve(video);
        }
      });
    }, {
      rootMargin: '50px', // Comenzar a cargar 50px antes de que sea visible
      threshold: 0.1
    });

    // Observar el elemento de video
    this.observer.observe(this.videoElement.nativeElement);
  }

  navegarACampo(): void {
    this.router.navigate(['/campo']);
  }
}

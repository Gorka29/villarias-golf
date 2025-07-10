import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initializeScrollBehavior();
  }

  private initializeScrollBehavior(): void {
    // Solo ejecutar en el navegador
    if (isPlatformBrowser(this.platformId)) {
      // Esperar a que el DOM esté listo
      setTimeout(() => {
        this.router.events.pipe(
          filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
          this.scrollToTop();
        });
      }, 0);
    }
  }

  scrollToTop(): void {
    // Verificar que estamos en el navegador y que window existe
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      try {
        // Scroll instantáneo sin animación
        window.scrollTo(0, 0);
      } catch (error) {
        // Fallback adicional si falla
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    }
  }
}

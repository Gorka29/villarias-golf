import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-campo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campo.component.html',
  styleUrls: ['./campo.component.scss']
})
export class CampoComponent {
  popupHoyo: number | null = null;

  mostrarPopup(num: number): void {
    this.popupHoyo = num;
  }

  cerrarPopup(): void {
    this.popupHoyo = null;
  }

  openVideo(url: string): void {
    window.open(url, '_blank');
  }
}

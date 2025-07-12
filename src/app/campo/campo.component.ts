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

  hoyos = {
    1: "Hoyo 1 · Par 5 · 467/414m · Hcp 7",
    2: "Hoyo 2 · Par 4 · 395/271m · Hcp 5",
    3: "Hoyo 3 · Par 3 · 171/111m · Hcp 9",
    4: "Hoyo 4 · Par 4 · 229/213m · Hcp 3",
    5: "Hoyo 5 · Par 5 · 445/405m · Hcp 1",
    6: "Hoyo 6 · Par 4 · 405/333m · Hcp 2",
    7: "Hoyo 7 · Par 3 · 170/120m · Hcp 8",
    8: "Hoyo 8 · Par 4 · 350/320m · Hcp 6",
    9: "Hoyo 9 · Par 4 · 340/300m · Hcp 4",
  };

  popupHoyo: number | null = null;

  mostrarPopup(num: number): void {
    this.popupHoyo = num;
    console.log(this.popupHoyo);
  }

  cerrarPopup(): void {
    this.popupHoyo = null;
  }
}

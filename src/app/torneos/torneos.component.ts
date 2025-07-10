import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-torneos',
  standalone: true,
  imports: [],
  templateUrl: './torneos.component.html',
  styleUrls: ['./torneos.component.scss']
})
export class TorneosComponent {
  constructor(private router: Router) {}

  navegarATorneo(ruta: string) {
    this.router.navigate([ruta]);
  }
}

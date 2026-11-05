import { Component, OnInit } from '@angular/core';
import { Cafe } from '../cafe';
import { CafeService } from '../cafe.service';

@Component({
  selector: 'app-cafe-listar',
  standalone: false,
  templateUrl: './cafe-listar.component.html',
  styleUrl: './cafe-listar.component.css',
})
export class CafeListarComponent implements OnInit {
  cafes: Array<Cafe> = [];
  totalOrigen: number = 0;
  totalBlend: number = 0;

  constructor(private cafeService: CafeService) {}

  getCafes(): void {
    this.cafeService.getCafes().subscribe((cafes) => {
      this.cafes = cafes;
      this.contarPorTipo();
    });
  }

  contarPorTipo(): void {
    this.totalOrigen = this.cafes.filter((cafe) => cafe.tipo === 'Café de Origen').length;
    this.totalBlend = this.cafes.filter((cafe) => cafe.tipo === 'Blend').length;
  }

  ngOnInit(): void {
    this.getCafes();
  }
}

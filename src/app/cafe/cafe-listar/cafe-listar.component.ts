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

  constructor(private cafeService: CafeService) {}

  getCafes(): void {
    this.cafeService.getCafes().subscribe((cafes) => {
      this.cafes = cafes;
    });
  }

  ngOnInit(): void {
    this.getCafes();
  }
}

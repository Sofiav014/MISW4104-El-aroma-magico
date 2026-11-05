import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CafeListarComponent } from './cafe-listar/cafe-listar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CafeListarComponent],
  exports: [CafeListarComponent],
})
export class CafeModule {}

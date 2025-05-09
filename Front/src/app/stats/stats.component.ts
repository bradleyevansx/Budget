import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardClasses, CardModule } from 'primeng/card';

@Component({
  selector: 'app-stats',
  imports: [CommonModule, CardModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
})
export class StatsComponent {}

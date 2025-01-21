import { Component, computed, signal } from '@angular/core';
import { HomeComponent } from 'src/app/main/home/home.component';
import { DemosComponent } from '../demos/demos.component';
import GraficoSvgComponent from '../grafico-svg/grafico-svg.component';
import { NotificationComponent } from 'src/app/main';
import { CommonModule, NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [ NotificationComponent, CommonModule  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  menu = [
    { texto: 'Demo', icono: 'fas fa-home', componente: DemosComponent },
    { texto: 'Inicio', icono: 'fas fa-home', componente: HomeComponent },
    { texto: 'Grafo', icono: 'fas fa-home', componente: GraficoSvgComponent },
  ]
  actual = signal(0)
  cuerpo = computed(() => this.menu[this.actual()]?.componente)
}

import { Component, computed, signal } from '@angular/core';
import { HomeComponent } from 'src/app/main/home/home.component';
import { DemosComponent } from '../demos/demos.component';
import GraficoSvgComponent from '../grafico-svg/grafico-svg.component';
import { NotificationComponent } from 'src/app/main';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [ NotificationComponent, NgComponentOutlet  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  menu = [
    { texto: 'demos', icono: 'fa-solid fa-person-chalkboard', componente: DemosComponent },
    { texto: 'inicio', icono: 'fa-solid fa-house', componente: HomeComponent },
    { texto: 'grafo', icono: 'fa-solid fa-image', componente: GraficoSvgComponent },
  ]
  actual = signal(0)
  cuerpo = computed(() => this.menu[this.actual()]?.componente)
}

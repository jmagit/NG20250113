import { Component, computed, signal } from '@angular/core';
import { HomeComponent } from 'src/app/main/home/home.component';
import { DemosComponent } from '../demos/demos.component';
import GraficoSvgComponent from '../grafico-svg/grafico-svg.component';
import { AjaxWaitComponent, NotificationModalComponent } from 'src/app/main';
import { NgComponentOutlet } from '@angular/common';
import { CalculadoraComponent } from '../calculadora/calculadora.component';
import { FormularioComponent } from '../formulario/formulario.component';
import { LoginComponent, LoginFormComponent } from 'src/app/security';
import { ContactosComponent, ContactosModule } from 'src/app/contactos';

@Component({
  selector: 'app-dashboard',
  imports: [ NotificationModalComponent, NgComponentOutlet, LoginComponent, AjaxWaitComponent, ContactosModule  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  menu = [
    { texto: 'contactos', icono: 'fa-solid fa-address-book', componente: ContactosComponent },
    { texto: 'inicio', icono: 'fa-solid fa-house', componente: HomeComponent },
    { texto: 'demos', icono: 'fa-solid fa-person-chalkboard', componente: DemosComponent },
    { texto: 'calculadora', icono: 'fa-solid fa-calculator', componente: CalculadoraComponent },
    { texto: 'formulario', icono: 'fa-solid fa-chalkboard-user', componente: FormularioComponent },
    { texto: 'grafo', icono: 'fa-solid fa-image', componente: GraficoSvgComponent },
    { texto: 'login', icono: 'fa-solid fa-image', componente: LoginFormComponent },
  ]
  actual = signal(0)
  cuerpo = computed(() => this.menu[this.actual()]?.componente)
}

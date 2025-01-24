/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoggerService } from '@my/core';
import { AjaxWaitComponent, FooterComponent, HeaderComponent, NotificationComponent } from './main';
import { DemosComponent } from './ejemplos';
import { NotificationModalComponent } from "./main/notification-modal/notification-modal.component";
import { NavigationService, NotificationService, NotificationType } from './common-services';
import { HomeComponent } from "./main/home/home.component";
import { DashboardComponent } from './ejemplos/dashboard/dashboard.component';
import { NgComponentOutlet } from '@angular/common';
import { LoginComponent } from './security';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotificationModalComponent, AjaxWaitComponent, HeaderComponent, FooterComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private notify = inject(NavigationService);

  // constructor(out: LoggerService) {
  //   out.error('Esto es un error');
  //   out.warn('Esto es un warn');
  //   out.info('Esto es un info');
  //   out.log('Esto es un log');
  // }

  // private notify = inject(NotificationService);
  // // eslint-disable-next-line @angular-eslint/use-lifecycle-interface, @angular-eslint/no-empty-lifecycle-method
  // ngOnInit(): void {
  //   this.notify.add('Aplicación iniciada',  NotificationType.info)
  // }
}

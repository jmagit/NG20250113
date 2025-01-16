import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoggerService } from '@my/core';
import { NotificationComponent } from './main';
import { DemosComponent } from './ejemplos';
import { NotificationModalComponent } from "./main/notification-modal/notification-modal.component";
import { NotificationService, NotificationType } from './common-services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotificationComponent, DemosComponent, NotificationModalComponent, NotificationModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'curso';

  // constructor(out: LoggerService) {
  //   out.error('Esto es un error');
  //   out.warn('Esto es un warn');
  //   out.info('Esto es un info');
  //   out.log('Esto es un log');
  // }

  private notify = inject(NotificationService);
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface, @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // this.notify.add('Aplicación iniciada',  NotificationType.info)
  }
}

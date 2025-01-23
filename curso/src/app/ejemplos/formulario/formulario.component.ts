/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorMessagePipe, ShowErrorsDirective } from '@my/core';
import { FormButtonsComponent } from 'src/app/common-component';
import { NIFNIEValidator, TypeValidator, UppercaseValidator } from 'src/lib/my-core/directives/mis-validadores.directive';

@Component({
  selector: 'app-formulario',
  imports: [ FormsModule, FormButtonsComponent, ErrorMessagePipe, NIFNIEValidator, UppercaseValidator, TypeValidator, ShowErrorsDirective ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  modo: 'add' | 'edit' = 'add'
  elemento: any = {  }

  add() {
    this.elemento = {}
    this.modo = 'add'
  }
  edit(key: number) {
    this.elemento = { id: key, nombre: 'Pepito', apellidos: 'Grillo', email: 'pgrillo@example.com', edad: 99
      , fecha: '2021-01-01', nif: '12345678z', activo: true }
    this.modo = 'edit'
  }
  cancel() {

  }

  send() {
    switch (this.modo) {
      case 'add':
        alert(`POST ${JSON.stringify(this.elemento)}` )
        break
      case 'edit':
        alert(`PUT ${this.elemento.id} ${JSON.stringify(this.elemento)}` )
        break
    }
  }
}

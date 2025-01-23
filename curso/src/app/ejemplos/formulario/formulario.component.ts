/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NIFNIEValidator, TypeValidator, UppercaseValidator, ErrorMessagePipe, ShowErrorsDirective } from '@my/core';
import { Observable } from 'rxjs';
import { FormButtonsComponent } from 'src/app/common-component';
import { environment } from 'src/environments/environment';

export abstract class RESTDAOService<T, K> {
  protected baseUrl = environment.apiUrl;
  protected http = inject(HttpClient)

  constructor(entidad: string, protected option = {}) {
    this.baseUrl += entidad;
  }
  query(extras = {}): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl, Object.assign({}, this.option, extras));
  }
  get(id: K, extras = {}): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`, Object.assign({}, this.option, extras));
  }
  add(item: T, extras = {}): Observable<T> {
    return this.http.post<T>(this.baseUrl, item, Object.assign({}, this.option, extras));
  }
  change(id: K, item: T, extras = {}): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, item, Object.assign({}, this.option, extras));
  }
  remove(id: K, extras = {}): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${id}`, Object.assign({}, this.option, extras));
  }
}

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

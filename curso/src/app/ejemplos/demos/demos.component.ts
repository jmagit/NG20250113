import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe, JsonPipe, NgClass, NgFor, NgIf, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, computed, effect, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CapitalizePipe, ElipsisPipe, ExecPipe, LoggerService, SizerComponent } from '@my/core';
import { Unsubscribable } from 'rxjs';
import { CardComponent, FormButtonsComponent } from 'src/app/common-component';
import { NotificationService, NotificationType } from 'src/app/common-services';
import { CalculadoraComponent } from '../calculadora/calculadora.component';

@Component({
  selector: 'app-demos',
  imports: [FormsModule, CommonModule, NgClass, NgIf, NgFor,
    UpperCasePipe, DecimalPipe, CurrencyPipe, TitleCasePipe, DatePipe, SlicePipe, JsonPipe,
    ElipsisPipe, CapitalizePipe, ExecPipe, SizerComponent, FormButtonsComponent, CardComponent,
    CalculadoraComponent,
  ],
  templateUrl: './demos.component.html',
  styleUrl: './demos.component.css'
})
export class DemosComponent implements OnInit, OnDestroy {
  private fecha = new Date('2025-01-16');
  public readonly nombre = signal<string>('Mundo');
  public readonly fontSize = signal<number>(24);
  public readonly listado = signal([
    { id: 1, nombre: 'Madrid' },
    { id: 2, nombre: 'barcelona' },
    { id: 3, nombre: 'SEVILLA' },
    { id: 4, nombre: 'a coruña' }
  ]);
  public readonly idProvincia = signal<number>(2);
  public readonly total = computed(() => this.listado().length);

  public readonly resultado = signal<string>('');
  public readonly visible = signal(true);
  public readonly estetica = signal({ importante: true, error: false, urgente: true });

  constructor(public vm: NotificationService, private out: LoggerService) {
    this.calcula = this.calcula.bind(this);
    // effect(() => vm.add(`Se ha seleccionado la provincia ${this.listado().find(item => item.id == this.idProvincia())?.nombre}`, NotificationType.info));
   }

  public get Nombre(): Signal<string> { return this.nombre.asReadonly() }
  public set Nombre(value: string) {
    // if(this.nombre() === value) return
    this.nombre.set(value)
  }

  public get Fecha(): string { return this.fecha.toISOString() }
  public set Fecha(value: string) {
    const f = new Date(value)
    if(this.fecha === f) return
    this.fecha = f
  }

  saluda() {
    this.resultado.set(`Hola, ${this.nombre()}`);
  }
  despide() {
    this.resultado.set(`Adios, ${this.nombre()}`);
  }
  di(algo: string) {
    this.resultado.set(`Dice ${algo}`);
  }
  cambia() {
    // this.visible.set(!this.visible());
    this.visible.update(valor => !valor);
    this.estetica.update(est => ({ ...est, importante: !est.importante }));
    this.estetica.update(est => ({ ...est, error: !est.error }));
  }

  cont = 0;
  calcula(a: number, b: number): number {
    this.out.log(`Calcula: ${++this.cont}`);
    return a + b;
  }

  add(provincia: string) {
    if (!provincia) { return; }
    const id = this.listado().length + 1;
    this.listado.update(lista => [...lista, { id, nombre: provincia }]);
    this.idProvincia.set(id);
  }

  private suscriptor: Unsubscribable | undefined;

  ngOnInit(): void {
    this.suscriptor = this.vm.Notificacion.subscribe(n => {
      if (n.Type !== NotificationType.error) { return; }
      // window.alert(`Suscripción: ${n.Message}`);
      // this.vm.remove(this.vm.Listado.length - 1);
    });
  }
  ngOnDestroy(): void {
    if (this.suscriptor) {
      this.suscriptor.unsubscribe();
    }
  }


  // Ejemplo de Calculadora
  idiomas = [
    { codigo: 'en-US', region: 'USA' },
    { codigo: 'es', region: 'España' },
    { codigo: 'pt', region: 'Portugal' },
  ];
  idioma = this.idiomas[0].codigo;
  calculos: Calculo[] = [];
  valCalculadora = 777;

  ponResultado(origen: string, valor: number) {
    this.calculos.push({
      pos: this.calculos.length + 1,
      origen,
      valor
    });
  }

}
interface Calculo {
  pos: number
  origen: string
  valor: number
}

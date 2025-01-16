import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { Unsubscribable } from 'rxjs';
import { NotificationService, NotificationType } from 'src/app/common-services';

@Component({
  selector: 'app-demos',
  imports: [],
  templateUrl: './demos.component.html',
  styleUrl: './demos.component.css'
})
export class DemosComponent implements OnInit, OnDestroy {
  public readonly nombre = signal<string>('Mundo');
  public readonly fontSize = signal<number>(24);
  public readonly fecha = signal<string>('2025-01-16');
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

  constructor(public vm: NotificationService) { }

  private suscriptor: Unsubscribable | undefined;

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

  calcula(a: number, b: number): number {
    return a + b;
  }

  add(provincia: string) {
    if (!provincia) { return; }
    const id = this.listado().length + 1;
    this.listado.update(lista => [...lista, { id, nombre: provincia }]);
    this.idProvincia.set(id);
  }

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

}

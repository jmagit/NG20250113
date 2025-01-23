/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, Output, Renderer2, SimpleChanges } from '@angular/core';
import { ErrorMessagePipe } from '../pipes/cadenas.pipe';

@Directive({  selector: `[winConfirm]` })
export class WindowConfirmDirective {
  @Output() winConfirm: EventEmitter<any> = new EventEmitter();
  @Input() winConfirmMessage = '¿Seguro?';
  @HostBinding('class.pressed') isPressed: boolean = false;

  @HostListener('click', ['$event'])
  confirmFirst() {
    if (window.confirm(this.winConfirmMessage)) {
      this.winConfirm.emit(null);
    }
  }
  @HostListener('mousedown') hasPressed() { this.isPressed = true; }
  @HostListener('mouseup') hasReleased() { this.isPressed = false; }
}

@Directive({ selector: '[myShadow]' })
export class ShadowDirective {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(el: ElementRef, renderer: Renderer2) {
    //el.nativeElement.style.boxShadow = '10px 10px 5px #888888';
    renderer.setStyle(el.nativeElement, 'box-shadow', '10px 10px 5px #888888');
  }
}

@Directive({
  selector: '[myShowErrors]'
})
export class ShowErrorsDirective implements OnChanges {
  private pipe = new ErrorMessagePipe();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input('myShowErrors') errors: any = undefined;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('pattern-msg') patternMsg?: string = undefined;
  @HostBinding('textContent') mensaje: string = '';
  @HostBinding('hidden') hidden: boolean = false;

  ngOnChanges(_changes: SimpleChanges): void {
    if (!this.errors) {
      this.hidden = true;
      return;
    }
    this.mensaje = this.patternMsg ? this.pipe.transform(this.errors, this.patternMsg) : this.pipe.transform(this.errors);
    this.hidden = this.mensaje === '';
  }
}

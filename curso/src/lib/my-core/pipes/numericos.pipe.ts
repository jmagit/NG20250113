import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toComaDecimal'
})
export class ToComaDecimalPipe implements PipeTransform {
  transform(value: number | string): string {
    if (typeof (value) === 'number') {
      value = value.toString();
    }
    if (typeof (value) === 'string') {
      return value.replace(/\./g, ',');
    }
    return value;
  }
}

@Pipe({
    name: 'exec'
})
export class ExecPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type, @typescript-eslint/no-explicit-any
  transform(fn: Function, ...args: any[]): any {
    return fn(...args);
  }
}

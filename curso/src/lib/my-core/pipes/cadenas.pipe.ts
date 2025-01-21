import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elipsis'
})
export class ElipsisPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any, maxlen: number): any {
    return (!maxlen || maxlen < 2 || !value || value.length <= maxlen)
      ? value : (value.substr(0, maxlen - 1) + '\u2026');
  }
}

@Pipe({
  name: 'capitalize',
  standalone: true
})
export class CapitalizePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: string): any {
    return value?.toString().toLowerCase().split(".").map(frase => frase.trim())
      .map((frase, index, array) => frase.length === 0 ? (array.length > 1 && index + 1 < array.length ? (array[index + 1] === '' ? '.' : '. ') : '')
        : frase.charAt(0)?.toUpperCase() + frase?.substring(1) + (array.length > 1 && index + 1 < array.length ? (array[index + 1] === '' ? '.' : '. ') : ''))
      .join('').trim()
  }
}

@Pipe({
  name: 'exec',
  standalone: true
})
export class ExecPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type, @typescript-eslint/no-explicit-any
  transform(fn: Function, ...args: any[]): any {
    return fn(...args);
  }
}


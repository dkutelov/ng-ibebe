import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize',
})
export class PluralizePipe implements PipeTransform {
  transform(value: string, n: number): string {
    if (n !== 1) return `${value}s`;
    return value;
  }
}

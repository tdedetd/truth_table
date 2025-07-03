import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tonumber',
    standalone: false
})
export class ToNumberPipe implements PipeTransform {
  transform(value: any) {
    return Number(value);
  }
}

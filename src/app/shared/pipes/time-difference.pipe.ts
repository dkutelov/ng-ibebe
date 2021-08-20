import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'timeDifference',
})
export class TimeDifferencePipe implements PipeTransform {
  transform(value: Date): string {
    return formatDistanceToNow(new Date(value)) + ' ago';
  }
}

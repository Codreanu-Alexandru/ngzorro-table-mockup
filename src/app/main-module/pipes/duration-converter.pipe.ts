import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationConverter'
})
export class DurationConverterPipe implements PipeTransform {

  transform(durationInSeconds: number): string {
    let minutes = Math.floor(durationInSeconds / 60);
    let seconds = durationInSeconds % 60;
    let formattedMinutes = minutes.toString().padStart(2, '0');
    let formattedSeconds = seconds.toString().padStart(2, '0');
    return formattedMinutes + ":" + formattedSeconds;
  }

}

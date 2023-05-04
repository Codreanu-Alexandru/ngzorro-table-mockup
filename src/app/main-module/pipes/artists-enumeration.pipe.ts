import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'artistsEnumeration'
})
export class ArtistsEnumerationPipe implements PipeTransform {

  transform(values: string[], ...args: unknown[]): string {
    let result = values.join('/');
    if (result.length > 50) {
      const parts = result.split('/');
      let length = 0;
      for (let i = 0; i < parts.length - 1; i++) {
        length += parts[i].length + 1;
        if (length > 50) {
          return `${parts.slice(0, i).join('/')}/...`;
        }
      }
      return result;
    } else {
      return result;
    }
  }

}

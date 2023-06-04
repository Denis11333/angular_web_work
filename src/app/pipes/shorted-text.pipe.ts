import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortedText'
})
export class ShortedTextPipe implements PipeTransform {

  transform(text:string , length: number):string {
    return text.length > length ? text.slice(0, length) + '...' : text
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen',
  // pure: true
})
export class ImagenPipe implements PipeTransform {

  transform( cadena: string ): string {
      return cadena;   
  }

}

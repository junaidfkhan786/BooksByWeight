import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adminCategory'
})
export class AdminCategoryPipe implements PipeTransform {

  transform(value: any, categoriessearch:any): any {
    if(value.length === 0){
      return value
    }
    return value.filter(function(search){
        return search.category.toLowerCase().indexOf(categoriessearch.toLowerCase()) > -1 
      })
  }

}

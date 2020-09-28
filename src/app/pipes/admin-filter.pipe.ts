import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adminFilter'
})
export class AdminFilterPipe implements PipeTransform {

  transform(value: any, searchTerm: any): any {
    if(value.length === 0){

      return value
    }
    return value.filter(function(search){
    var price = JSON.stringify(search.final_price)
    var isbn = JSON.stringify(search.Isbn_no)
      return search.book_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || price.indexOf(searchTerm) > -1 || isbn.indexOf(searchTerm) > -1
    })
  }



}

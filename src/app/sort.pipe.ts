import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'sortUser'
})
export class SortUserPipe implements PipeTransform {

    transform(array: any, field: string,reverse: boolean = false): any[] {
        if (!Array.isArray(array)) {
          return;
        }
       //alert(field);
        //if()
        if(field=='first_name' || field=='last_name') {
            return array.sort((a: any, b: any)=> a[field].localeCompare(b[field]) );
            } 
            else if(field=='first_name_desc'){
                array.sort((a: any, b: any)=> a['first_name'].localeCompare(b['first_name']) );  
                return array.reverse();
            }
            else if(field=='last_name_desc'){
                 array.sort((a: any, b: any)=> a['last_name'].localeCompare(b['last_name']) );  
                 return array.reverse();
            }
            else if(field=='employee_id')
            {
              return  array.sort(function (a: any,b: any){ return a[field]-b[field];});
            }
            else{
                  array.sort(function (a: any,b: any){ return a[field]-b[field];});
                  return array.reverse();
            }

     //   array.sort((a: any, b: any) => {
       //   if (a[field] < b[field]) {
       //     return -1;
       //   } else if (a[field] > b[field]) {
       //     return 1;
       //   } else {
       ////     return 0;
       //   }
       // });
      //  return array;
      }
}
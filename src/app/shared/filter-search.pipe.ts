import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './book-model';

@Pipe({
  name: 'filterSearch'
})
export class FilterSearchPipe implements PipeTransform {

  transform(books: Book[], searchTerm: string): Book[] {
    if(!searchTerm){
      return books;
    }
    return books.filter(book => this.textPreProcessing(book.originalTitle).includes(this.textPreProcessing(searchTerm)))
  }

  textPreProcessing(text: string): string{
    return text.toLocaleLowerCase().trim();
  }
}

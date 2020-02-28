import { Component } from '@angular/core';
import { Book } from './shared/book-model';
import { BookService } from './services/book.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-goodreads';
  searchTitle: string = "";
  books: Book[] = []

  constructor(private bookService: BookService){}

  ngOnInit(){
    this.bookService
      .fetchBooks()
      .subscribe((books: Book[]) => {
        this.books = books;
      })
  }

  doSearch(event: {searchTerm: string}): void{
    this.searchTitle = event.searchTerm;
  }

  deleteBook(id: string){
    this.bookService.deleteBookbyId(id)
      .subscribe(() => {
        this.bookService
        .fetchBooks()
        .subscribe((books: Book[]) => {
          this.books = books;
        });
      })
    ;

  }
}

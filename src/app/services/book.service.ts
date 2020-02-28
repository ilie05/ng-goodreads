import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Book } from '../shared/book-model';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log(`An error occured: ${error.error.message}`);
    }else{
      console.error(`Backend returned: ${error.status}, ` +
      `body was: ${error.error}`);
    }

    return throwError('oops, something wnet wrong :(');
  }

  fetchBooks(){
    return this.http.get<Book[]>('/books', httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      )
  }

  deleteBookbyId(id: string){
    return this.http.delete(`/books/${id}`, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

}

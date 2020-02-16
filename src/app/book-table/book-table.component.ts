import {
  AfterViewInit,
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  SimpleChanges
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BookTableDataSource } from './book-table-datasource';
import { Book } from '../shared/book.model';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss']
})
export class BookTableComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() books: Book[];
  @Output() deleteFired = new EventEmitter<string>();
  @Output() editFired = new EventEmitter<string>();
  @Output() addFired = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Book>;
  dataSource: BookTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'edit',
    'delete',
    'id',
    'ISBN',
    'ISBN13',
    'originalTitle',
    'authors',
    'originalPublicationYear',
    'languageCode',
    'averageRating',
    'smallImageUrl'
  ];

  constructor() {
    this.dataSource = new BookTableDataSource([]);
  }

  ngOnInit() {
    this._refresh(this.books)
  }

  _refresh(books: Book[]) {
    this.dataSource.books = books
  }

  ngOnChanges(changes: SimpleChanges) {
    this._refresh([...changes.books.currentValue]);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onDeleteBook(bookId: string) {
    this.deleteFired.emit(bookId)
  }

  onEditBook(bookId: string) {
    this.editFired.emit(bookId)
  }

  onAddBook() {
    this.addFired.emit()
  }
}

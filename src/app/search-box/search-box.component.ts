import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Search } from '../shared/search.model'



@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  title: string = "Search";
  searchTerm: string = "";
  constructor() { }

  @Output() searchFire = new EventEmitter<Search>();

  ngOnInit(): void {
  }

  onChange(value){
    this.searchTerm = value;
  }

  onSearch(){
    this.searchFire.emit({searchTerm: this.searchTerm});
  }

}

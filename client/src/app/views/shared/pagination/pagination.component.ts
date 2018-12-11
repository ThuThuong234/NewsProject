import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() currentPage: number;
  @Input() totalItems: number;
  @Input() pageSize: number;
  @Output() pageChanged = new EventEmitter<number>();

  totalPage: number;
  pageItems = [];

  constructor() {
    this.currentPage = 1;
    this.totalItems = 1;
    this.pageSize = 1;
    this.totalPage = 1;
  }

  ngOnInit() {
    this.updateTotalPage();
    this.updatePageItems();
  }

  ngOnChanges() {
    this.updateTotalPage();
    this.updatePageItems();
  }

  pageClicked(newPage: number) {
    this.pageChanged.emit(newPage);
  }

  updateTotalPage() {
    if (this.pageSize && this.pageSize > 0) {
      if (this.totalItems % this.pageSize > 0) {
        this.totalPage = Math.floor(this.totalItems / this.pageSize) + 1;
      } else {
        this.totalPage = Math.floor(this.totalItems / this.pageSize);
      }
    } else {
      this.totalPage = 1;
      this.currentPage = 1;
    }
  }

  updatePageItems() {
    this.pageItems = [];
    if (this.totalPage > 1) {
      let min = this.currentPage - 2;
      let max = this.currentPage + 2;
      while (min < 1 && max < this.totalPage) {
        min += 1;
        max += 1;
      }
      while (max > this.totalPage && min > 1) {
        min -= 1;
        max -= 1;
      }
      while (min < 1) {
        min++;
      }
      while (max > this.totalPage) {
        max--;
      }
      for (let i = min; i <= max; i++) {
        this.pageItems.push(i);
      }
    }
  }
}

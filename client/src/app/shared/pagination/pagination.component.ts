import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() items: Array<any>;
  @Input() totalItems = 1;
  @Input() pageNumber = 1;
  @Input() pageSize = 1;
  selectedPage: number;
  totalPagesNumbers: Array<number> = [];
  totalPages: number;
  @Output() changePage = new EventEmitter<any>(true);

  constructor() {
   }

  ngOnInit(): void {
    this.setPage(1);
  }

  selectPage(selected: number) {
    this.selectedPage = selected;
    if (selected % 3 === 1 && selected !== 1) {
      console.log("test");
    }
    this.setPage(this.selectedPage);
  }

  first() {
    this.setPage(1);
  }
  next() {
    this.setPage(this.pageNumber + 1);
  }
  last() {
    this.setPage(this.totalPages);
  }
  previous() {
    this.setPage(this.pageNumber - 1);
  }

  get isLast() {
    return this.pageNumber === this.totalPages;
  }

  get isFirst() {
    return this.pageNumber === 1;
  }

  private setPage(val: number) {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.pageNumber = val;
    this.changePage.emit(this.pageNumber);
  }
}

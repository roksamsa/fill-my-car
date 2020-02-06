import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty-data',
  templateUrl: './empty-data.component.html',
  styleUrls: ['./empty-data.component.scss']
})
export class EmptyDataComponent implements OnInit {

  @Input() emptyDataType: string;
  @Input() emptyDataText: string;
  @Input() emptyDataIcon: string;
  @Input() emptyDataButtonText: string;

  @Output() clicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clickFunction() {
    this.clicked.emit('clickFunction');
  }
}

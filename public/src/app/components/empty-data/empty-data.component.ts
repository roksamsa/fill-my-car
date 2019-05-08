import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty-data',
  templateUrl: './empty-data.component.html',
  styleUrls: ['./empty-data.component.scss']
})
export class EmptyDataComponent implements OnInit {

  @Input() emptyDataType: String;
  @Input() emptyDataText: String;
  @Input() emptyDataIcon: String;
  @Input() emptyDataButtonText: String;

  @Output() clicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clickFunction() {
    this.clicked.emit('clickFunction');
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})

export class TileComponent implements OnInit {

  @Input() tileTitle: String;
  @Input() tileHeadlineAddButtonTooltipText: String;
  @Output() clicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clickFunction() {
    this.clicked.emit('clickFunction');
  }

}

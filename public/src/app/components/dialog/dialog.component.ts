import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Output() closePopup: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) { }

  public ngOnInit(): void {
  }

  public onCloseCancel(event: any): void {
    this.router.navigate([{outlets: {modal: null}}]);
    this.closePopup.next(event);
  }
}

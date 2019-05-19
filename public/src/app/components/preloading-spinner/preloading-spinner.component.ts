import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preloading-spinner',
  templateUrl: './preloading-spinner.component.html',
  styleUrls: ['./preloading-spinner.component.scss']
})
export class PreloadingSpinnerComponent implements OnInit {

  @Input() diameter = 32; // Default spinner size
  @Input() strokeWidth = 5; // Default spinner stroke width
  @Input() mode = 'indeterminate'; // Default spinner mode - indeterminate animation goes to infinity
  @Input() visibility = false;

  constructor() { }

  ngOnInit() {
  }

}

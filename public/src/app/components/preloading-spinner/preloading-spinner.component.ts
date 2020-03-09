import { Component, OnInit, Input } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

export const preloadingAnimationTiming = '200ms';
export const defaultAnimationFunction = 'ease-in-out';

@Component({
  selector: 'app-preloading-spinner',
  templateUrl: './preloading-spinner.component.html',
  styleUrls: ['./preloading-spinner.component.scss'],
  animations: [
    trigger('preloadingAnimation', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate(`${preloadingAnimationTiming} ${defaultAnimationFunction}`, style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate(`${preloadingAnimationTiming} ${defaultAnimationFunction}`, style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class PreloadingSpinnerComponent implements OnInit {

  @Input() diameter = 32; // Default spinner size
  @Input() strokeWidth = 5; // Default spinner stroke width
  @Input() mode = 'indeterminate'; // Default spinner mode - indeterminate animation goes to infinity
  @Input() visibility = true; // Is spinner visible or not.

  constructor() { }

  ngOnInit() {
  }
}

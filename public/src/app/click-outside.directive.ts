import { Directive, OnInit, OnDestroy, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})

export class ClickOutsideDirective implements OnInit, OnDestroy {
  @Input() appClickOutside: any;

  @HostListener('mouseenter') onMouseEnter($event: any) {
    $event.stopPropagation();
  }

  constructor() {}

  ngOnInit() {
    const self = this;
    setTimeout(() => { document.addEventListener('click', self.appClickOutside); }, 0);
  }

  ngOnDestroy() {
    const self = this;
    document.removeEventListener('click', self.appClickOutside);
  }
}

import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appLongPress]'
})

export class AppLongPressDirective {
  @Input() appOnLongPressDuration = 1000;
  @Input() appOnLongPressingDuration = 1000;

  @Output() appOnLongPress: EventEmitter<any> = new EventEmitter();
  @Output() appOnLongPressing: EventEmitter<any> = new EventEmitter();
  @Output() appOnLongPressEnd: EventEmitter<any> = new EventEmitter();

  private pressing: boolean;
  private longPressing: boolean;
  private timeout: any;
  private mouseX = 0;
  private mouseY = 0;

  @HostBinding('class.press')
  get press() { return this.pressing; }

  @HostBinding('class.longpress')
  get longPress() { return this.longPressing; }

  @HostListener('mousedown', ['$event'])
  public onMouseDown(event: any): void {

    // don't do right/middle clicks
    if (event.which !== 1) {
      return;
    }

    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    this.pressing = true;
    this.longPressing = false;

    this.timeout = setTimeout(() => {
      this.longPressing = true;
      this.appOnLongPress.emit(event);
      this.loop(event);
    }, this.appOnLongPressDuration);

    this.loop(event);
  }

  @HostListener('mousemove', ['$event'])
  public onMouseMove(event: any): void {
    if (this.pressing && !this.longPressing) {
      const xThres = (event.clientX - this.mouseX) > 10;
      const yThres = (event.clientY - this.mouseY) > 10;
      if (xThres || yThres) {
        this.endPress();
      }
    }
  }

  public loop(event: any): void {
    if (this.longPressing) {
      this.timeout = setTimeout(() => {
        this.appOnLongPressing.emit(event);
        this.loop(event);
      }, this.appOnLongPressingDuration);
    }
  }

  public endPress(): void {
    clearTimeout(this.timeout);
    this.longPressing = false;
    this.pressing = false;
    this.appOnLongPressEnd.emit(true);
  }

  @HostListener('mouseup')
  onMouseUp() { this.endPress(); }
}

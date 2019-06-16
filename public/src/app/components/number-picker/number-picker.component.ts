import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-number-picker',
  templateUrl: './number-picker.component.html',
  styleUrls: ['./number-picker.component.scss']
})
export class NumberPickerComponent implements OnInit {
  @Input() min: number;
  @Input() max: number;
  @Input() step: number;
  @Input() precision: number;
  @Input() inputValueNumber: number;
  @Input() inputDisabled: boolean;
  @Input() inputPlaceholder: string;
  @Input() formControlName: FormGroup;

  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() inputValue = new EventEmitter<number>();

  private numberPicker: FormControl;
  isNumberPickerActivated: boolean;
  inputStartValue: number;

  constructor() { }

  ngOnInit() {
    if (this.inputDisabled == null) {
      this.inputDisabled = false;
    }
    if (this.min == null) {
      this.min = 0;
    }
    if (this.max == null) {
      this.max = 100;
    }
    if (this.precision == null) {
      this.precision = 1;
    }
    if (this.step == null) {
      this.step = 1;
    }

    if (this.inputValueNumber) {
      this.inputStartValue = this.inputValueNumber;
      this.isNumberPickerActivated = true;
    } else {
      this.inputStartValue = this.min;
      this.isNumberPickerActivated = false;
    }

    this.numberPicker = new FormControl({
      value: this.inputStartValue,
      disabled: this.inputDisabled
    });

    this.numberPicker.registerOnChange(() => {
      this.change.emit(this.numberPicker.value);
    });
  }

  private increaseValue(): void {
    let currentValue = this.numberPicker.value;
    if (currentValue < this.max) {
      currentValue = currentValue + this.step;
      if (this.precision != null) {
        currentValue = this.round(currentValue, this.precision);
      }
      this.numberPicker.setValue(currentValue);
    } else if (currentValue === this.max) {
      this.numberPicker.setValue(this.min);
    }
    this.isNumberPickerActivated = true;
  }

  private decreaseValue(): void {
    let currentValue = this.numberPicker.value;
    if (currentValue > this.min) {
      currentValue = currentValue - this.step;
      if (this.precision != null) {
        currentValue = this.round(currentValue, this.precision);
      }
      this.numberPicker.setValue(currentValue);
    } else if (currentValue === this.min) {
      this.numberPicker.setValue(this.max);
    }
    this.isNumberPickerActivated = true;
  }

  private round(value: number, precision: number): number {
    const multiplier: number = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  public getValue(): number {
    return this.numberPicker.value;
  }
}

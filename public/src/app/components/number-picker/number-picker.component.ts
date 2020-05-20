import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NumberPickerService } from './number-picker.service';
import { ConstantsService } from '../../common/services/constants.service';

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
  @Input() isTimeInput = false;
  @Input() inputValueNumber: number;
  @Input() inputDisabled: boolean;
  @Input() inputPlaceholder: string;
  @Input() formControlName: FormGroup;

  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() inputValue = new EventEmitter<number>();

  @ViewChild('numberPickerElement') numberPickerElement: ElementRef;

  public numberPicker: FormControl;
  isNumberPickerActivated: boolean;
  inputStartValue: number | string;

  constructor(
    public numberPickerData: NumberPickerService,
    private constant: ConstantsService) { }

  ngOnInit() {
    if (this.inputDisabled == null) {
      this.inputDisabled = false;
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
    if (this.min == null) {
      if (this.isTimeInput === true) {
        this.min = 0;
        this.constant.numberZeroPadding(this.min);
        this.inputPlaceholder = '00';
      } else {
        this.min = 0;
        this.inputPlaceholder = '0';
      }
    }
    if (this.inputValueNumber) {
      if (this.isTimeInput === true) {
        this.inputStartValue = this.constant.numberZeroPadding(this.inputValueNumber);
      } else {
        this.inputStartValue = this.inputValueNumber;
      }
    } else {
      if (this.isTimeInput === true) {
        this.inputStartValue = this.constant.numberZeroPadding(this.min);
      } else {
        this.inputStartValue = this.min;
      }
    }

    this.numberPicker = new FormControl({
      value: this.inputStartValue,
      disabled: this.inputDisabled
    });

    this.numberPicker.registerOnChange(() => {
      this.change.emit(this.getValue());
    });

    this.numberPickerData.inputValueData.subscribe(inputData => this.inputValueNumber = inputData);
  }

  public increaseValue(): void {
    let currentValue = this.getValue();

    if (this.inputDisabled === false) {
      if (this.isTimeInput === true) {
        if (+currentValue < this.max) {
          currentValue = +currentValue + this.step;
          if (this.precision != null) {
            currentValue = this.round(+currentValue, this.precision);
          }
          +currentValue < 10 ?
            this.numberPicker.setValue(this.constant.numberZeroPadding(+currentValue)) :
            this.numberPicker.setValue(+currentValue);
        } else if (+currentValue === this.max) {
          this.numberPicker.setValue(this.constant.numberZeroPadding(+this.min));
        }
      } else {
        if (+currentValue < this.max) {
          currentValue = +currentValue + this.step;
          if (this.precision != null) {
            currentValue = this.round(+currentValue, this.precision);
          }
          this.numberPicker.setValue(currentValue);
        } else if (currentValue === this.max) {
          this.numberPicker.setValue(this.min);
        }
      }
    } else {
      currentValue = this.getValue();
    }
    this.isNumberPickerActivated = true;
  }

  public decreaseValue(): void {
    let currentValue = this.getValue();

    if (this.inputDisabled === false) {
      if (this.isTimeInput === true) {
        if (+currentValue > this.min) {
          currentValue = +currentValue - this.step;
          if (this.precision != null) {
            currentValue = this.round(+currentValue, this.precision);
          }
          +currentValue < 10 ?
            this.numberPicker.setValue(this.constant.numberZeroPadding(+currentValue)) :
            this.numberPicker.setValue(+currentValue);
        } else if (+currentValue === this.min) {
          this.numberPicker.setValue(this.constant.numberZeroPadding(+this.max));
        }
      } else {
        if (currentValue > this.min) {
          currentValue = currentValue - this.step;
          if (this.precision != null) {
            currentValue = this.round(currentValue, this.precision);
          }
          this.numberPicker.setValue(currentValue);
        } else if (currentValue === this.min) {
          this.numberPicker.setValue(this.max);
        }
      }
    } else {
      currentValue = this.getValue();
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

  public resetInput() {
    this.numberPicker.reset();
  }

  public onFocus(): void {
    this.isNumberPickerActivated = true;
    this.numberPickerElement.nativeElement.focus();
  }
}

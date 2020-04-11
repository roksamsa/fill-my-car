import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyClipboardDirective } from './copy-clipboard.directive';

@NgModule({
  imports: [CommonModule],
  exports: [CopyClipboardDirective],
  declarations: [CopyClipboardDirective],
  providers: [],
})
export class CopyClipboardModule { }

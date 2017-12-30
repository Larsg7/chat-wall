import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortMessagesPipe } from './sort-messages.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SortMessagesPipe
  ],
  exports: [
    SortMessagesPipe,
  ]
})
export class PipesModule { }

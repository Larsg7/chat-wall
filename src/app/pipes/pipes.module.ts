import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortMessagesPipe } from './sort-messages.pipe';
import { SortParticipantsPipe } from '../sort-participants.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SortMessagesPipe,
    SortParticipantsPipe
  ],
  exports: [
    SortMessagesPipe,
    SortParticipantsPipe,
  ]
})
export class PipesModule { }

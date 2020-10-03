import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from './citas.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [CitasComponent],
  imports: [
    CommonModule,
    CitasRoutingModule,
    MaterialModule
  ]
})
export class CitasModule { }

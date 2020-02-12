import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddeditpostComponent } from './addeditpost.component';
import { AddeditPostRoutingModule } from './addeditpost-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddeditpostComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AddeditPostRoutingModule
  ]
})
export class AddeditpostModule { }

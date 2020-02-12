import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddeditpostComponent } from './addeditpost.component';


const routes: Routes = [
  {
    path: '',
    component: AddeditpostComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddeditPostRoutingModule { }

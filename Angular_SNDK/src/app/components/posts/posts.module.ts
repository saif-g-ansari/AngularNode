import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [PostsComponent],
  imports: [
    CommonModule,
    TableModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }

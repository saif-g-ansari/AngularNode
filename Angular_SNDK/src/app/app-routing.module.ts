import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full'
      },
      {
        path: 'posts',
        loadChildren: './components/posts/posts.module#PostsModule',
      },
      {
        path: 'addeditpost',
        loadChildren: './components/posts/addeditpost/addeditpost.module#AddeditpostModule',
      },
      {
        path: 'addeditpost/:id',
        loadChildren: './components/posts/addeditpost/addeditpost.module#AddeditpostModule',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

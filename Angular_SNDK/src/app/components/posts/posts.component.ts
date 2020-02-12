import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';
import { ConfirmationService } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { config } from 'src/app/constant';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  PostList = [];
  constructor(public Repository: RepositoryService, public confirmationService: ConfirmationService, public common: CommonService, public router: Router) { }

  ngOnInit() {
    this.GetPostList();
  }

  AddNewPost() {
    this.router.navigate(['./addeditpost']);
  }

  EditPost(id) {
    console.log('test', id);
    this.router.navigate(['./addeditpost/', id]);
  }

  async GetPostList() {
    const PostList = await this.Repository.GetData(config.POSTS);
    this.PostList = PostList;
  }

  async DeletePost(postid) {
    if (postid) {
      const Post = await this.Repository.Delete(config.POSTS, postid, 'post');
      if (Post) {
        this.GetPostList();
      }
    }
  }
}

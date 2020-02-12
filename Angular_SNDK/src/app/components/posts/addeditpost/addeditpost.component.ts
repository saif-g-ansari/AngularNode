import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/services/repository.service';
import { config } from 'src/app/constant';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addeditpost',
  templateUrl: './addeditpost.component.html',
  styleUrls: ['./addeditpost.component.css']
})
export class AddeditpostComponent implements OnInit {
  postForm: FormGroup;
  submitted = false;

  Post = {
    id: 0,
    Subject: '',
    Description: ''
  }

  PostID: ''

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, public Repository: RepositoryService, public router: Router) {
    this.PostID = this.route.snapshot.params['id'];
    if (this.PostID) {
      this.GetPostbyId(this.PostID);
    }
  }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      Subject: ['', Validators.required],
      Description: ['', Validators.required]
    });
  }

  get f() { return this.postForm.controls; }

  async GetPostbyId(postid) {
    const Post = await this.Repository.GetDataByID(config.POSTS, postid);
    this.Post = Post;
  }

  async onSubmit() {
    this.submitted = true;
    if (this.postForm.invalid) {
      return;
    }
    const Post = await this.Repository.SaveQueryData(config.POSTS, this.Post, 'Success');
    if (Post) {
      this.router.navigate(['./posts']);
    }
  }

  onReset() {
    this.submitted = false;
    this.router.navigate(['./posts']);
  }
}

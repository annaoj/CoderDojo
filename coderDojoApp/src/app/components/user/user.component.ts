import { UserDetail } from './../../models/user-detail';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user = null;
  selected = null;
  achievements = [];
  children = [];
  newChild = false;

  addChild(form: NgForm){
    const user = new User(form.value.nickname, 'password', true);
    // Add User
    this.auth.registerChild(user).subscribe(
      data => {
        this.userService.addChild(this.user.user.username, data).subscribe(
          child => {
            // Add UserDetail
            child.nickname = form.value.nickname;
            child.firstName = form.value.firstName;
            child.lastName = form.value.lastName;
            child.dob = form.value.dob;
            this.userService.updateUserDetail(child).subscribe(
              deets => {
                // Push to parent model
                this.reloadChildren();
              }
            );
          }
          );

      }
    );
  }

  reloadChildren(){
    this.userService.getChildren(this.user.user.username).subscribe(
      data => this.children = data
    );
  }

  constructor(
    private auth: AuthService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private userService: UserService
    ) { }

  ngOnInit() {
    if (this.auth.checkLogin()) {
      if (this.currentRoute.snapshot.paramMap.get('username')) {
        this.userService.getUser(this.currentRoute.snapshot.paramMap.get('username')).subscribe(
          data => {
            this.user = data;
            this.userService.getUserAchievements(this.user.user.username).subscribe(
              achieves => {
                this.user.achievements = achieves;
                this.achievements = achieves;
              },
              err => console.error('Observer got an error: ' + err)
            );
            this.reloadChildren();
          },
          err => {
            this.router.navigateByUrl('not-found');
            console.error('Observer got an error: ' + err);
          }
        );
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users = [];
  user = null;
  editUser = false;

  displayUsers(): void {
    this.userService.index().subscribe(
      data => this.users = data,
      err => {
        console.log(err);
        console.log('Error loading users from admin page');
      }
    );
  }

  showUser(id: number) {
    this.userService.getUser(id).subscribe(
      data => this.user = data,
      err => {
        console.log(err);
        console.log('Error loading users from admin page');
      }
    );
  }

  updateUser(form: NgForm) {
    console.log(form.value);

    this.user.username = form.value.username;
    this.user.password = form.value.password;

    this.userService.updateUser(this.user).subscribe(
      data => {
        this.user = data;
        this.editUser = false;
      },
      err => {
        console.log(err);
        console.log('Error loading users from admin page');
      }
    );
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.index().subscribe(
      data => this.users = data,
      err => {
        console.log(err);
        console.log('Error loading users from admin page');
      }
    );
  }

}
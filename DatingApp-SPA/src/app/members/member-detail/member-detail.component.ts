import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlerftifyService } from 'src/app/_services/alerftify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  constructor(private userService: UserService, private alertify: AlerftifyService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser(this.activeRoute.snapshot.params['id']).subscribe(
      (user: User) => { this.user = user; },
      (error) => { this.alertify.error(error); }
    );
  }
}

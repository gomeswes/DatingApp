import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlerftifyService } from '../_services/alerftify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService, private alertify: AlerftifyService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(
      next => { this.alertify.success('Welcome! Logged in Successfully'); },
      error => { this.alertify.error(error); }
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logOut() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
  }
}

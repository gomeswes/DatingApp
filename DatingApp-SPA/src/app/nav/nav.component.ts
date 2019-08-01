import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlerftifyService } from '../_services/alerftify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService, private alertify: AlerftifyService,
      private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(
      next => {
        this.alertify.success('Welcome! Logged in Successfully');
        this.router.navigate(['/members']);
      },
      error => { this.alertify.error(error); }
    );
  }

  getLoggedInUserName() {
    return this.authService.decodedToken.unique_name;
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logOut() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }
}

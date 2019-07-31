import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlerftifyService } from '../_services/alerftify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(private authService: AuthService, private alertify: AlerftifyService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(
      () => { this.alertify.success('Registration successful'); },
      error => { this.alertify.error(error); }
    );
    console.log(this.model);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}

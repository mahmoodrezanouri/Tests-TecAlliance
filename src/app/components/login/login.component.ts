import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/autservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  userIsvalid = true;
  isLoading = false;

  get loginFormControls() {
    return this.loginForm.controls;
  }
  get email() {
    return this.loginForm.controls.email;
  }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) return;

    this.isLoading = true;

    this.login();
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.email.hasError('pattern')) {
      return 'Not a valid email';
    }
    return !this.userIsvalid ? 'User is not valid' : '';
  }

  private async login() {
    if (this.email.value) {
      let isUser = await this.authService.login(this.email.value);

      if (isUser) {
        this.userIsvalid = true;
        this.loginForm.controls['email'].setErrors({ incorrect: false });
        this.router.navigate(['/']);
      } else {
        this.isLoading = false;
        this.setUserInvalid();
      }
    }
  }

  private setUserInvalid() {
    this.userIsvalid = false;
    this.loginForm.controls['email'].setErrors({ incorrect: true });
  }
}

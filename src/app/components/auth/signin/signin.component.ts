import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { SharedDataService } from 'src/app/services/shared-service/shared-data.service';
// import { SocketService } from 'src/app/services/socket-service/socket-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  passwordToggleFlag = true;
  signInForm!: FormGroup;
  submitted = false;
  roles = "company";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sharedDataService: SharedDataService,
    // private socket: SocketService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
    });
  }

  onSignIn() {
    this.submitted = true;

    if (this.signInForm.invalid) {
      return;
    }

    const payload = {
      ...this.signInForm.value,
      roles: 'company'
    }

    this.authService
      .signin(payload)
      // .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(data => {
        if (data && data.success) {
          this.authService.setToken(data.token);
          this.sharedDataService.saveUser(data.user);
          // this.socket.connectSocket();
          this.router.navigateByUrl('/home');
        } else {
          // sweetAlert("Error", data.message, "warning", "OK");
        }
      });
  }

  togglePasswordType() {
    this.passwordToggleFlag = !this.passwordToggleFlag;
  }

  get form() {
    return this.signInForm.controls;
  }

  ngOnDestroy(): void { }

}

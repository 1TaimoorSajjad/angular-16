import { Component, OnInit, Renderer2, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { AuthServiceOld } from "../../services/auth-service/auth.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
// import { sweetAlert } from "../../utils/swal";
import { takeUntil } from "rxjs/operators";
// import { SocketService } from "src/app/services/socket-service/socket-service.service";
import { SharedDataService } from "src/app/services/shared-service/shared-data.service";
import { environment } from "src/environments/environment";
// import { SocketService } from "src/app/services/socket-service/socket-service.service";
import { sweetAlert } from "src/app/utils/swal";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit, OnDestroy {
  passwordToggleFlag = true;
  signInForm!: FormGroup;
  submitted = false;
  isAdmin = false;
  isCompany = true;
  isShowToggler = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceOld,
    private sharedDataService: SharedDataService,
    // private socket: SocketService,
    private router: Router,
    private renderere: Renderer2
  ) { }

  ngOnInit() {
    window.addEventListener("keyup", this.initializeTimer);
    this.signInForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
    });

    // if (!environment.production) {
    //   this.signInForm.patchValue({
    //     email: "medfastcab@yamsol.com",
    //     password: "123456"
    //   });
    // }
  }

  initializeTimer = (e: any) => {
    console.log(e);
    if (
      e.altKey &&
      (e.key.toLowerCase() === "v" || e.key.toLowerCase() === "√")
    ) {
      this.isShowToggler = !this.isShowToggler;
    }
  };

  get form() {
    return this.signInForm.controls;
  }

  togglePasswordType() {
    this.passwordToggleFlag = !this.passwordToggleFlag;
  }

  onSignIn() {
    if (this.signInForm.invalid) {
      this.submitted = true;
      return;
    }

    let role;

    if (this.isAdmin) {
      role = 'admin';

    } else {
      if (this.isCompany) {
        role = 'company';
      } else {
        role = 'staff';
      }

    }



    this.authService
      .login(this.signInForm.value.email, this.signInForm.value.password, role)
      // .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(data => {
        if (data && data.success) {
          this.authService.setToken(data.token);
          this.sharedDataService.saveUser(data.user);
          // this.socket.connectSocket();
          this.router.navigateByUrl('/');
        } else {
          sweetAlert("Error", data.message, "warning", "OK");
        }
      });
  }

  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    this.renderere.appendChild(document.body, script);
    return script;
  }

  changeAdminRole() {
    this.isAdmin = !this.isAdmin;
    this.isCompany = true;
  }
  ngOnDestroy(): void { }

}

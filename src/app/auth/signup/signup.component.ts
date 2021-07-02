import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  notifier = new Subject();
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    if (this.authService.checkForLogin()) {
      this.router.navigateByUrl('/image-gallery');
    }
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', Validators.required],
        isAdmin: [false],
      },
      {
        validator: this.confirmePasswordValidator(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  confirmePasswordValidator(
    controlName: string,
    matchingControlName: string
  ): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  ngOnInit(): void {}

  signUp(): void {
    if (this.form.invalid) {
      return;
    }
    this.authService.signUp(this.form.value)
    .pipe(takeUntil(this.notifier))
    .subscribe(
      (token) => {
        localStorage.setItem('id_token', JSON.stringify(token));
        this.router.navigateByUrl('image-gallery');
        this.toastr.success('User Added Successfully', `Welcome ${this.form.value.name}`);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
}
}

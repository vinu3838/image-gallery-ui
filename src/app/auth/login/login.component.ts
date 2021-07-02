import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  notifier = new Subject();
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.checkForLogin()) {
      this.router.navigateByUrl('/image-gallery');
    }
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {}

  login(): any {
    if (this.form.invalid) {
      return;
    }

    this.authService
      .login(this.form.value)
      .pipe(takeUntil(this.notifier))
      .subscribe(
        (token) => {
          localStorage.setItem('id_token', JSON.stringify(token));
          this.router.navigateByUrl('image-gallery');
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

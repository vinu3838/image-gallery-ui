import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public get isLoggedIn(): boolean {
    if (localStorage.getItem('id_token')) {
      return true;
    }
    return false;
  }

  constructor(private router: Router) {}

  ngOnInit(): void {}

  logout(): any {
    if (localStorage.getItem('id_token')) {
      localStorage.removeItem('id_token');
    }

    this.router.navigateByUrl('/');
  }
}

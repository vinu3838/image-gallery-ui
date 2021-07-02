import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanLoad {
  constructor(private router: Router) {}

  canLoad(route: Route): boolean {
    if ( localStorage.getItem('id_token') ){
      return true;
    } else  {
      this.router.navigate( ['/'] );
      return false;
    }
}
}

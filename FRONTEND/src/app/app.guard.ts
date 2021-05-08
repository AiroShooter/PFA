import { Injectable } from '@angular/core';
import { CanActivate, CanLoad,CanActivateChild} from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService:AuthService){}


  canActivate():boolean {

   return this.authService.loggedIn();
  }

  canLoad():boolean
  {
    return this.authService.loggedIn();
  }
  canActivateChild():boolean
  {
    return this.authService.loggedIn();
  }
  
}

import { Injectable } from '@angular/core';
import { CanActivate, CanLoad,CanActivateChild} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate,CanActivateChild, CanLoad {

  constructor(private authService:AuthService){}


  canActivate():boolean {

   return this.authService.isAdmin();
  }

  canLoad():boolean
  {
    return this.authService.isAdmin();
  }
  canActivateChild():boolean
  {
    return this.authService.isAdmin();
  }
  
}

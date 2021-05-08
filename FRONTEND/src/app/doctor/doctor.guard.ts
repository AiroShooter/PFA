import { Injectable } from '@angular/core';
import { CanActivate, CanLoad,CanActivateChild} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorGuard implements CanActivate,CanActivateChild, CanLoad {

  constructor(private authService:AuthService){}


  canActivate():boolean {

   return this.authService.isDoctor();
  }

  canLoad():boolean
  {
    return this.authService.isDoctor();
  }
  canActivateChild():boolean
  {
    return this.authService.isDoctor();
  }
  
}

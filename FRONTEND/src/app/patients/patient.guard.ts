import { Injectable } from '@angular/core';
import { CanActivate, CanLoad,CanActivateChild} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientGuard implements CanActivate,CanActivateChild, CanLoad {

  constructor(private authService:AuthService){}

  canActivate():boolean {
   return this.authService.isPatient();
  }

  canLoad():boolean
  {
    return this.authService.isPatient();
  }

  canActivateChild():boolean
  {
    return this.authService.isPatient();
  }
  
}

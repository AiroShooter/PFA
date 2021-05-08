import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loggedIn():boolean
  {
    return !!localStorage.getItem('userEmail');
  }

  isDoctor()
  {
    if(this.loggedIn() && localStorage.getItem('userType') === 'medecin')
       return true
    else return false
  }

  isPatient()
  {
    if(this.loggedIn() && localStorage.getItem('userType') === 'patient')
       return true
    else return false
  }

  isAdmin()
  {
    if(this.loggedIn() && localStorage.getItem('userType') === 'admin')
       return true
    else return false
  }

}

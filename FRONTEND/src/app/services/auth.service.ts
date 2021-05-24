import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loggedIn():boolean
  {
    return !!localStorage.getItem('email');
  }

  isDoctor()
  {
    if(this.loggedIn() && localStorage.getItem('type') === 'medecin')
       return true
    else return false
  }

  isPatient()
  {
    if(this.loggedIn() && localStorage.getItem('type') === 'patient')
       return true
    else return false
  }

  isAdmin()
  {
    if(this.loggedIn() && localStorage.getItem('type') === 'admin')
       return true
    else return false
  }

}

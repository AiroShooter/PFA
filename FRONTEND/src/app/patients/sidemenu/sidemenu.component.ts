import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonServiceService } from './../../common-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  name;
  constructor(
    private router: Router,
    public commonService: CommonServiceService
  ) {}

  ngOnInit(): void {if(!(!!localStorage.getItem("patient_id")))
  {
    this.router.navigateByUrl('/patients/start');
  }}

  logout() {
    localStorage.clear();
    this.commonService.nextmessage('logout');
    this.router.navigate(['/login-page']);
  }

  navigate(name) {
    this.name = name;
    this.commonService.nextmessage(name);
  }
  
  public ageFromDateOfBirthday(dateOfBirth: any): number {
    return moment().diff(dateOfBirth, 'years');
  }

  nom = localStorage.getItem('nom') + ' ' + localStorage.getItem('prenom');
  dateNaiss = localStorage.getItem('dateNaiss');
  age = this.ageFromDateOfBirthday(this.dateNaiss);
  pays = localStorage.getItem('pays');
}

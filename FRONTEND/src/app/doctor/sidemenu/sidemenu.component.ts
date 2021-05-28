import { Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
} from '@angular/router';

import { CommonServiceService } from './../../common-service.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  name;
  splitVal;
  base;
  page;
  constructor(
    private router: Router,
    public commonService: CommonServiceService
  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (event instanceof NavigationStart) {
          this.splitVal = event.url.split('/');
          this.base = this.splitVal[1];
          this.page = this.splitVal[2];
        }
      }
    });
  }

  ngOnInit(): void {
    if(!(!!localStorage.getItem("med_id")))
    {
      this.router.navigateByUrl('/doctor/start');
    }
  }

  logout() {
    localStorage.clear();
    this.commonService.nextmessage('logout');
    this.router.navigate(['/login-page']);
  }

  navigate(name) {
    this.name = name;
    this.commonService.nextmessage(name);
  }
  to(){
    this.router.navigateByUrl('/change-password')
  }
  nom = localStorage.getItem('nom') + ' ' + localStorage.getItem('prenom');
  spec = localStorage.getItem('Spec');
  sexe = localStorage.getItem('sexe');
}

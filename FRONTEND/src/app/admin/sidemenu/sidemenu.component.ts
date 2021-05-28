import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

import { CommonServiceService } from '../../common-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  page = 'Dashboard';
  showDropdown = true;
  public bellCollapsed = true;
  public userCollapsed = true;
  admin = localStorage.getItem('prenom') + ' ' + localStorage.getItem('nom');

  constructor(
    @Inject(DOCUMENT) private document,
    public router: Router,
    private commonService: CommonServiceService,
    public http: HttpClient,
  ) {}
  ngOnInit(): void {
    setInterval(()=>{this.admin = localStorage.getItem('prenom') + ' ' + localStorage.getItem('nom');}, 1000);
    setInterval(()=>{this.getNotifs();}, 5000);
  }

  ngAfterViewInit() {
    this.loadDynmicallyScript('assets/admin/js/script.js');
  }
  loadDynmicallyScript(js) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.head.appendChild(script);
    script.onload = () => this.doSomethingWhenScriptIsLoaded();
  }

  doSomethingWhenScriptIsLoaded() {}
  change(name) {
    this.page = name;
    this.commonService.nextmessage('admin');
  }

  main() {
    this.commonService.nextmessage('main');
  }
  clickLogout() {
    localStorage.clear()
    this.user();
    this.router.navigateByUrl('/admin/login-form')
    
  }
  bell() {
    this.bellCollapsed = !this.bellCollapsed;
    if (!this.userCollapsed) {
      this.userCollapsed = true;
    }
  }
  
  user() {
    this.userCollapsed = !this.userCollapsed;
    if (!this.bellCollapsed) {
      this.bellCollapsed = true;
    }
  }

  notifs:[];
  notifsCount:any=0;
  getNotifs(){
    this.notifs = JSON.parse(localStorage.getItem('notifs'));
    let count;
    let i=0;
    if(this.notifs != null)
    {
      count = this.notifs.map(({ etat }) => etat)
      this.notifsCount = 0;
      for(i;i<count.length;i++)
      {
        if(count[i] == "unseen")
        this.notifsCount++;
      }
    }    
    // if(this.notifs.length != NaN)
    // this.notifsCount = this.notifs.length;
  }
}

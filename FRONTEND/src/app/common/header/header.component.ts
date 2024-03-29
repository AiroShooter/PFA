import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy ,
  Inject,
} from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { UpdaterService } from 'src/app/services/updater.service';

import { CommonServiceService } from './../../common-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  auth: boolean = false;
  isPatient: boolean;
  page;
  splitVal;
  headerTop: boolean = true;
  base;
  url1;
  nom;
  type;
  sexe;
  private subscriptionName: Subscription; //important to create a subscription
    
  constructor(
    @Inject(DOCUMENT) private document,
    private cdr: ChangeDetectorRef,
    public router: Router,
    private activeRoute: ActivatedRoute,
    public commonService: CommonServiceService,
    private updater: UpdaterService
  ) {
    this.nom = localStorage.getItem('nom') + ' ' + localStorage.getItem('prenom');
    if(localStorage.getItem('type') == "patient")
    this.isPatient = true;
    else if(localStorage.getItem('type') == "medecin")
    this.isPatient = false;
    // subscribe to sender component messages
    this.subscriptionName= this.updater.getUpdate().subscribe
    (auth => { //message contains the data sent from service
      this.auth = auth;
      if(localStorage.getItem('type') == 'patient')
        this.isPatient = true;
       else this.isPatient = false;
    });
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        var res = event.url.split('/');
        this.base = res[1];
        this.page = res[2];
        if (event.url == '/home-slider-one') {
          this.headerTop = true;
        } else {
          this.headerTop = false;
        }
      }
    });
    this.url1 = this.router.url;
    this.commonService.message.subscribe((res) => {
      if (res === 'patientLogin') {
        this.auth = true;
        // this.isPatient = true;
      }
      if (res === 'doctorLogin') {
        this.auth = true;
        // this.isPatient = false;
      }
      if (res === 'logout') {
        this.auth = false;
        this.isPatient = false;
      }
    });
  }

  ngOnInit(): void {
    
    setInterval(()=>{
      this.nom = localStorage.getItem('nom') + ' ' + localStorage.getItem('prenom');
      this.sexe = localStorage.getItem("sexe");
      this.type = localStorage.getItem('type');
    }, 1000);

    this.checkLoging();
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        $('html').removeClass('menu-opened');
        $('.sidebar-overlay').removeClass('opened');
        $('.main-wrapper').removeClass('slide-nav');
      }
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
    this.loadDynmicallyScript('assets/js/script.js');
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
    this.commonService.nextmessage('main');
  }

  mapGrid() {
    this.router.navigate(['/map-grid']);
  }

  mapList() {
    this.router.navigate(['/map-list']);
  }

  addStyle(val) {
    if (val === 'home') {
      if (document.getElementById('home').style.display == 'block') {
        document.getElementById('home').style.display = 'none';
      } else {
        document.getElementById('home').style.display = 'block';
      }
    }
    if (val === 'doctor') {
      if (document.getElementById('doctor').style.display == 'block') {
        document.getElementById('doctor').style.display = 'none';
      } else {
        document.getElementById('doctor').style.display = 'block';
      }
    }
    if (val === 'patient') {
      if (document.getElementById('patient').style.display == 'block') {
        document.getElementById('patient').style.display = 'none';
      } else {
        document.getElementById('patient').style.display = 'block';
      }
    }
    if (val === 'pharmacy') {
      if (document.getElementById('pharmacy').style.display == 'block') {
        document.getElementById('pharmacy').style.display = 'none';
      } else {
        document.getElementById('pharmacy').style.display = 'block';
      }
    }
    if (val === 'pages') {
      if (document.getElementById('pages').style.display == 'block') {
        document.getElementById('pages').style.display = 'none';
      } else {
        document.getElementById('pages').style.display = 'block';
      }
    }
    if (val === 'blog') {
      if (document.getElementById('blog').style.display == 'block') {
        document.getElementById('blog').style.display = 'none';
      } else {
        document.getElementById('blog').style.display = 'block';
      }
    }
    if (val === 'admin') {
      if (document.getElementById('admin').style.display == 'block') {
        document.getElementById('admin').style.display = 'none';
      } else {
        document.getElementById('admin').style.display = 'block';
      }
    }
  }

  doctor(name) {
    this.page = name;
    this.router.navigate(['/doctor/dashboard']);
  }

  logout() {
    localStorage.clear();
    this.auth = false;
    this.isPatient = false;
    this.sexe = "";
    this.router.navigate(['/login-page']);
  }

  home() {
    this.commonService.nextmessage('main');
    this.router.navigateByUrl('/').then(() => {
      this.router.navigate(['/']);
    });
  }

  navigate(name) {
    this.page = name;
    if (name === 'Admin') {
      this.router.navigate(['/admin']);
      this.commonService.nextmessage('admin');
    } else if (name === 'Pharmacy Admin') {
      this.router.navigate(['/pharmacy-admin']);
      this.commonService.nextmessage('pharmacy-admin');
    }
  }



  ngOnDestroy() { // It's a good practice to unsubscribe to ensure no memory leaks
    this.subscriptionName.unsubscribe();
}


checkLoging()
{
  this.auth = !!localStorage.getItem('email');
}

}

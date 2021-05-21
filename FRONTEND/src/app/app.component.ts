import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewEncapsulation,
  AfterViewChecked,
} from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Location } from '@angular/common';
import { CommonServiceService } from './common-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewChecked {

  index = -1;
  IDS: any[];
  SLOT_DATA: string[];
  title = 'doccure';
  url;
  loadFooter = false;
  show: boolean = true;
  hideFooter: boolean = false;
  constructor(
    private http: HttpClient,
    private activeRoute: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    public Router: Router,
    location: Location,
    public commonServic: CommonServiceService
  ) {
    Router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (
          event.url == '/login' ||
          event.url == '/forgot-password' ||
          event.url == '/Register'
        ) {
          document.querySelector('body').classList.add('account-page');
          document.querySelector('body').classList.remove('mat-typography');
          if (event.url == '/login') {
            this.Router.navigateByUrl('/login');
          }
        } else {
          document.querySelector('body').classList.remove('account-page');
          document.querySelector('body').classList.add('mat-typography');
        }
        if (event.url == '/map-grid') {
          this.hideFooter = true;
        }
        if (event.url == '/video-call' || event.url == '/voice-call') {
          document.querySelector('body').classList.add('call-page');
          document.querySelector('body').classList.remove('mat-typography');
        } else {
          document.querySelector('body').classList.remove('call-page');
          document.querySelector('body').classList.add('mat-typography');
        }
      }
    });
    this.url = location.path();
    this.show = this.url.includes('admin') ? false : true;
    this.show = this.url.includes('pharmacy-admin') ? false : true;
    this.commonServic.message.subscribe((res) => {
      if (res === 'admin' || res === 'pharmacy-admin') {
        this.show = false;
        this.hideFooter = true;
      } else if (res === 'main') {
        this.show = true;
        this.hideFooter = false;
      } else if (res === 'chat') {
        this.show = true;
        this.hideFooter = true;
      } else {
        this.show = true;
        this.hideFooter = false;
      }
    });
  }

  ngOnInit() {
    setTimeout(() => (this.loadFooter = true), 2000);

    this.SLOT_DATA = JSON.parse(localStorage.getItem('SLOT'));

    //console.log(this.SLOT_DATA);
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  Save(){
    console.log('app component save')
  }

  SERVER_URL: string = 'http://127.0.0.1:8000/api/';

  select : any

  selected : string

  hours : string[];

  jour: string;

  CheckVal(e: any){
    this.selected = e;

    this.hours = this.selected.split(' - ', 2);

    console.log(this.hours[0], this.hours[1]);
  }

  Add()
  {

    let data = new FormData();

    data.append('med_id', localStorage.getItem('userId'));
    data.append('jour', this.jour);
    data.append('heureDebut', this.hours[0]);
    data.append('heureFin', this.hours[1]);

    console.log(data.get('med_id'),data.get('jour'),data.get('heureDebut'),data.get('heureFin'));

    this.http.post(this.SERVER_URL + 'doctor/schedule', data).subscribe(res=>{

      console.log(res);

    });
  }
}

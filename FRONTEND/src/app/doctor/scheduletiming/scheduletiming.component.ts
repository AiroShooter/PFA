import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-scheduletiming',
  templateUrl: './scheduletiming.component.html',
  styleUrls: ['./scheduletiming.component.css']
})
export class ScheduletimingComponent implements OnInit {


  DUR_DATA = ['15 min', '30 min', '45 min', '1 heure']

  SLOT_DATA : string[]

  _15MIN = ['08:00 - 08:15', '08:15 - 08:30', '08:30 - 08:45', '08:45 - 09:00',
            '09:00 - 09:15', '09:15 - 09:30', '09:30 - 09:45', '09:45 - 10:00',
            '10:00 - 10:15', '10:15 - 10:30', '10:30 - 10:45', '10:45 - 11:00',
            '11:00 - 11:15', '11:15 - 11:30', '11:30 - 11:45', '11:45 - 12:00',
            '12:00 - 12:15', '12:15 - 12:30', '12:30 - 12:45', '12:45 - 13:00',
            '13:00 - 13:15', '13:15 - 13:30', '13:30 - 13:45', '13:45 - 14:00',
            '14:00 - 14:15', '14:15 - 14:30', '14:30 - 14:45', '14:45 - 15:00',
            '15:00 - 15:15', '15:15 - 15:30', '15:30 - 15:45', '15:45 - 16:00',
            '16:00 - 16:15', '16:15 - 16:30', '16:30 - 16:45', '16:45 - 17:00',
            '17:00 - 17:15', '17:15 - 17:30', '17:30 - 17:45', '17:45 - 18:00']

  _30MIN = ['08:00 - 08:30', '08:30 - 09:00',
            '09:00 - 09:30', '09:30 - 10:00',
            '10:00 - 10:30', '10:30 - 11:00',
            '11:00 - 11:30', '11:30 - 12:00',
            '12:00 - 12:30', '12:30 - 13:00',
            '13:00 - 13:30', '13:30 - 14:00',
            '14:00 - 14:30', '14:30 - 15:00',
            '15:00 - 15:30', '15:30 - 16:00',
            '16:00 - 16:30', '16:30 - 17:00',
            '17:00 - 17:30', '17:30 - 18:00']

  _45MIN =	[ '08:00 - 08:45', '08:45 - 09:30',
              '09:30 - 10:15', '10:15 - 11:00',
              '11:00 - 11:45', '11:45 - 12:30',
              '12:30 - 13:15', '13:15 - 14:00',
              '14:00 - 14:45', '14:45 - 15:30',
              '15:30 - 16:15', '16:15 - 17:00',
              '17:00 - 17:45']

  _1H = [	'08:00 - 09:00',
          '09:00 - 10:00',
          '10:00 - 11:00',
          '11:00 - 12:00',
          '12:00 - 13:00',
          '13:00 - 14:00',
          '14:00 - 15:00',
          '15:00 - 16:00',
          '16:00 - 17:00',
          '17:00 - 18:00' ]


  select: any;
  constructor(private appComponnet: AppComponent) { }



  ngOnInit(): void {

    localStorage.setItem('SLOT', JSON.stringify(this._15MIN));
  }

  Sunday(){
    this.appComponnet.jour = 'Sunday';
  }

  Monday(){
    this.appComponnet.jour = 'Monday';
  }

  Tuesday(){
    this.appComponnet.jour = 'Tuesday';
  }

  Wednesday(){
    this.appComponnet.jour = 'Wednesday';
  }

  Thursday(){
    this.appComponnet.jour = 'Thursday';
  }

  Friday(){
    this.appComponnet.jour = 'Friday';
  }

  Saturday(){
    this.appComponnet.jour = 'Saturday';
  }

 

  CheckVal(e: any){

    if(e == '15 min')
    {
      localStorage.setItem('SLOT', JSON.stringify(this._15MIN));
    }
    if(e == '30 min')
    {
      localStorage.setItem('SLOT', JSON.stringify(this._30MIN));
    }

    if(e == '45 min')
    {
      localStorage.setItem('SLOT', JSON.stringify(this._45MIN));
    }

    if(e == '1 heure')
    {
      localStorage.setItem('SLOT', JSON.stringify(this._1H));
    }

    this.appComponnet.SLOT_DATA = JSON.parse(localStorage.getItem('SLOT'));



  }



  Save(){
    console.log('scadul component save')
  }


}

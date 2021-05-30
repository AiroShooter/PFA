import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {CommonServiceService  } from './../../common-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mypatients',
  templateUrl: './mypatients.component.html',
  styleUrls: ['./mypatients.component.css']
})
export class MypatientsComponent implements OnInit {
  
  appointments : any = [];
  patients :  any = [];
  
  constructor(public commonService:CommonServiceService, private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.getPatients();
    this.getAppointments();
    this.getApptointementsInfo();
    
    if(!(!!localStorage.getItem("med_id")))
    {
      this.router.navigateByUrl('/doctor/start');
    }
    

  }
  AppointmentsInfo:any;
  user_id:any;
  getApptointementsInfo(){
    this.user_id = localStorage.getItem("user_id");
    console.log(this.user_id);
    this.http.post("http://127.0.0.1:8000/api/doctor/showPatients",{"med_id":localStorage.getItem("med_id")}).subscribe(result => {
    this.AppointmentsInfo = result;
    console.log(result);
    });
  }
  getDate(date:string)
  {
    let dateInt = Date.parse(date);
    let currentDateInt = Date.parse(new Date().toString());
    return parseInt(((currentDateInt - dateInt)/(1000 * 3600 * 24 * 365.25)).toString());
  }

  getAppointments() {
    this.commonService.getAppointments()
      .subscribe(res=>{
        this.appointments = res;
        let scope = this;
        this.appointments.forEach(index=>{
          let filter = scope.patients.filter(a=>a.key === index.patient_key);
          if(filter.length != 0) {
            index['patients'] = filter[0];
          }
        })
        this.appointments = this.appointments.filter(a=>a.status === 'accept');
      })
  }

  getPatients() {
    this.commonService.getpatients()
    .subscribe(res=>{
      this.patients = res;
    })
  }

}

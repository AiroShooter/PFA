import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {CommonServiceService  } from './../../common-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  appointments ;
  patients ;
  

  constructor(public commonService:CommonServiceService,private http: HttpClient) { }

  ngOnInit(): void {
    this.changeState;
    this.getApptointementsInfo();
  }

  
  AppointmentsInfo:any;
  user_id:any;
  getApptointementsInfo(){
    this.user_id = localStorage.getItem("user_id");
    console.log(this.user_id);
    this.http.post("http://127.0.0.1:8000/api/patients/showConsultations",{"user_id":this.user_id}).subscribe(result => {
    this.AppointmentsInfo = result;
    console.log(result);
    });
  }
  changeState(){}

 
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {CommonServiceService  } from './../../common-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  appointments ;
  patients ;
  

  constructor(public commonService:CommonServiceService,private http: HttpClient,private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getNotifs();
    }, 5000);
    this.changeState;
    this.getApptointementsInfo();
    this.getDossiers()
    if(!(!!localStorage.getItem("patient_id")))
    {
      this.router.navigateByUrl('/patients/start');
    }
  }

  
  AppointmentsInfo:any;
  Dossiers:any;
  user_id:any;
  getApptointementsInfo(){
    this.user_id = localStorage.getItem("user_id");
    this.http.post("http://127.0.0.1:8000/api/patients/showConsultations",{"user_id":this.user_id}).subscribe(result => {
    this.AppointmentsInfo = result;
    });
  }

  getDossiers(){
    let patient_id = localStorage.getItem("patient_id");
    this.http.post("http://127.0.0.1:8000/api/patients/showDossiers",{"patient_id":patient_id}).subscribe(result => {
    this.Dossiers = result;
    console.log(result);
    });
  }

  changeState(const_id,etat){
    let form = new FormData();
    form.append("const_id",const_id);
    form.append("etat",etat);
    this.http.post("http://127.0.0.1:8000/api/patients/updateConsultations",form).subscribe(result =>{
       this.getApptointementsInfo();
  });
}

getNotifs(){
  this.toastr.success("12-12-2021 12:31", 'Dr. Ayoub Chafik a rejeter votre rendez-vous');
}
 
}

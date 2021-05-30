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
    setInterval(() => {
      this.getNotifs();
    }, 30000);
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
notifs:[];
upnot(id: any){
  let fm = new FormData();
  fm.append("id",id);
  fm.append("etat","seen");
  console.log(fm.get("id"));
  this.http.post("http://127.0.0.1:8000/api/UPNotifs",fm).subscribe(result =>{
              console.log(result);
            })
}

getNotifs(){
  let form = new FormData();
  form.append("user_id",localStorage.getItem("user_id"));
  this.http.post("http://127.0.0.1:8000/api/showUserNotifs",form).subscribe(result =>{
    this.notifs =  JSON.parse(JSON.stringify(result));
      this.notifs.forEach(e => {
        if(e["etat"] == "unseen")
          this.toastr.success(e["date"]+" "+e["heure"],e["titre"]+" "+e["message"]).onTap.subscribe(() => {
            this.upnot(e["notification_id"]);
          });
    });
  });
}


Go(user_id, nom, prenom, sexe){

  localStorage.setItem('us_sexe',sexe);
  localStorage.setItem('us_id',user_id);
  localStorage.setItem('us_nom',nom);
  localStorage.setItem('us_prenom',prenom);
  this.router.navigateByUrl('/doctor/message');
}

 
}

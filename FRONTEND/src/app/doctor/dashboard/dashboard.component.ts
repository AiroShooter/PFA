import { Component, OnInit,TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import {CommonServiceService  } from './../../common-service.service';

import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  list : any = []
  modalRef: BsModalRef;
  appointmentId;
  appointments :any = [];
  patients:any = [];
  patientsLength ;
  appointmentsLength;
  TotalPatientsLength ;
  activeTab = 'upcomming';
  
  constructor(private toastr: ToastrService,
    private http:HttpClient,
    public commonService:CommonServiceService,
    private modalService: BsModalService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getPatients();
    this.getApptointementsInfo();
    this.getTaux();
    this.getTauxA();
      this.getAppointmentscount();
      this.getSumTarif();

      if(!(!!localStorage.getItem("med_id")))
      {
        this.router.navigateByUrl('/doctor/start');
      }
  }

  search(activeTab){
    this.activeTab = activeTab;
  }

  result(activeTab){
    this.activeTab = activeTab;
  }
  
  btnColor() {
    document.getElementById('btn-yes').style.backgroundColor = "#09e5ab";
    document.getElementById('btn-yes').style.border = "1px solid #09e5ab";
    document.getElementById('btn-yes').style.color = "#fff";

    document.getElementById('btn-no').style.backgroundColor = "#fff";
    document.getElementById('btn-no').style.border = "1px solid #fff";
    document.getElementById('btn-no').style.color = "#000";
  }

  btnColorNo() {
    document.getElementById('btn-no').style.backgroundColor = "#09e5ab";
    document.getElementById('btn-no').style.border = "1px solid #09e5ab";
    document.getElementById('btn-no').style.color = "#fff";

    document.getElementById('btn-yes').style.backgroundColor = "#fff";
    document.getElementById('btn-yes').style.border = "1px solid #fff";
    document.getElementById('btn-yes').style.color = "#000";
  }
  
  openModal(template: TemplateRef<any>,appointment,const_id,date,heure,prenom,nom) {
    this.appointmentId = appointment;
    this.modalRef = this.modalService.show(template,{class: 'modal-sm modal-dialog-centered'});
    localStorage.setItem('const_id',const_id);
    localStorage.setItem('date',date);
    localStorage.setItem('heure',heure);
    localStorage.setItem('Cprenom',prenom);
    localStorage.setItem('Cnom',nom);

  }
  etat:any
  confirm() {
    let const_id = localStorage.getItem('const_id');
    let nom = localStorage.getItem('Cnom');
    let prenom = localStorage.getItem('Cprenom');
    let form = new FormData();
    this.etat = "Accepter";
    form.append("const_id",const_id);
    form.append("etat",this.etat);
    form.append("nom",nom);
    form.append("prenom",prenom);
    this.http.post("http://127.0.0.1:8000/api/doctor/updateConsultations",form).subscribe(result =>{
       console.log(result);
       this.getApptointementsInfo();
       this.modalRef.hide();
      this.getTaux();
    this.getTauxA();
      this.getAppointmentscount();
      this.getSumTarif();
    });
   
  }

  decline() {
    let const_id = localStorage.getItem('const_id');
    let heure = localStorage.getItem('heure');
    let date = localStorage.getItem('date');
    let form = new FormData();
    this.etat = "Annuler";
    form.append("const_id",const_id);
    form.append("etat",this.etat);
    form.append("heure",heure);
    form.append("date",date);
    console.log(const_id);
    console.log(this.etat);
    console.log(heure);
    console.log(date);
    this.http.post("http://127.0.0.1:8000/api/doctor/updateConsultations",form).subscribe(result =>{
       console.log(result);
       this.getApptointementsInfo();
       this.modalRef.hide();
       this.getTaux();
       this.getTauxA();
       this.getAppointmentscount();
       this.getSumTarif();
    });
   
  

  
  }

  getPatients() {
    this.commonService.getpatients()
    .subscribe(res=>{
      this.patients = res;
      this.TotalPatientsLength = this.patients.length;
    })
  }

  cancel() {
    this.modalRef.hide();
  }
  Appointmentscount:any 
  user_id:any

  AppointmentsInfo:any;
  getApptointementsInfo(){
    this.user_id = localStorage.getItem("user_id");
    console.log(this.user_id);
    this.http.post("http://127.0.0.1:8000/api/doctor/showConsultations",{"user_id":this.user_id}).subscribe(result => {
    this.AppointmentsInfo = result;
    console.log(result);
    });
  }
  Taux:any;
  TauxAccept:any;
  med_id = localStorage.getItem("med_id");
  getTaux(){
    console.log(this.med_id);
    this.http.post("http://127.0.0.1:8000/api/doctor/showStatsByMed",{"med_id":this.med_id}).subscribe(result => {
    this.Taux = result;
    });
  }
  getTauxA(){
    console.log(this.med_id);
    this.http.post("http://127.0.0.1:8000/api/doctor/showStatsByMedA",{"med_id":this.med_id}).subscribe(result => {
    this.TauxAccept = result;
    });
  }
  sumTarif:any;
  getSumTarif(){
    console.log(this.med_id);
    this.http.post("http://127.0.0.1:8000/api/doctor/showStatsByMedP",{"med_id":this.med_id}).subscribe(result => {
    this.sumTarif = result;
    });
  }
  

  AppointmentsCount:any;
  getAppointmentscount(){
    this.user_id = localStorage.getItem("user_id");
    console.log(this.user_id);
    this.http.post("http://127.0.0.1:8000/api/doctor/consultationCount",{"user_id":this.user_id}).subscribe(result => {
    this.AppointmentsCount = result;

    });

  
  


 

    
  }
}

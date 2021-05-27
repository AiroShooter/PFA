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
      this.getAppointmentscount();
      this.getApptointementsInfo();
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
  
  openModal(template: TemplateRef<any>,appointment,const_id) {
    this.appointmentId = appointment;
    this.modalRef = this.modalService.show(template,{class: 'modal-sm modal-dialog-centered'});
    localStorage.setItem('const_id',const_id);

  }
  etat:any
  confirm() {
    let const_id = localStorage.getItem('const_id');
    let form = new FormData();
    this.etat = "Accepter";
    form.append("const_id",const_id);
    form.append("etat",this.etat);
    this.http.post("http://127.0.0.1:8000/api/doctor/updateConsultations",form).subscribe(result =>{
       console.log(result);
       this.getApptointementsInfo();
       this.modalRef.hide();

    });
   
  }

  decline() {
    let const_id = localStorage.getItem('const_id');
    let form = new FormData();
    this.etat = "Annuler";
    form.append("const_id",const_id);
    form.append("etat",this.etat);
    console.log(const_id);
    console.log(this.etat);
    this.http.post("http://127.0.0.1:8000/api/doctor/updateConsultations",form).subscribe(result =>{
       console.log(result);
       localStorage.removeItem('const_id');
       this.getApptointementsInfo();
       this.modalRef.hide();
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
  AppointmentsCount:any;
  getAppointmentscount(){
    this.user_id = localStorage.getItem("user_id");
    console.log(this.user_id);
    this.http.post("http://127.0.0.1:8000/api/doctor/consultationCount",{"user_id":this.user_id}).subscribe(result => {
    this.AppointmentsCount = result;

    });

  
  


 

    
  }
}

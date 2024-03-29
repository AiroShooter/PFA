import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {CommonServiceService  } from './../../common-service.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms';

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
    private fb:FormBuilder,
    public commonService:CommonServiceService,
    private modalService: BsModalService,
    private router: Router
    ) { }

  ngOnInit(): void {
    setInterval(() => {
      this.getNotifs();
    }, 10000);
    this.getPatients();
    this.getApptointementsInfo();
    this.getTaux();
    this.getTauxA();
    this.getAppointmentscount();
    this.getSumTarif();
    this.getPatientCount();
    this.getPatientTodayCount();
    this.getAppointmentscount();
    this.getApptointementsInfo();
    this.getDoctors()
    if(!(!!localStorage.getItem("med_id")))
    {
      this.router.navigateByUrl('/doctor/start');
    }
  }

  search(activeTab){
    this.activeTab = activeTab;
    this.getDate();
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

  desc:string
  
  
  openModal(template: TemplateRef<any>,appointment,const_id,date,heure,prenom,nom,desc) {
    this.appointmentId = appointment;
    this.modalRef = this.modalService.show(template,{class: 'modal-sm modal-dialog-centered'});
    localStorage.setItem('const_id',const_id);
    localStorage.setItem('date',date);
    localStorage.setItem('heure',heure);
    localStorage.setItem('Cprenom',prenom);
    localStorage.setItem('Cnom',nom);

    this.desc = desc;

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

       localStorage.removeItem('const_id');
       localStorage.removeItem('date');
       localStorage.removeItem('heure');
       localStorage.removeItem('Cprenom');
       localStorage.removeItem('Cnom');
   

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

       localStorage.removeItem('const_id');
       localStorage.removeItem('date');
       localStorage.removeItem('heure');
       localStorage.removeItem('Cprenom');
       localStorage.removeItem('Cnom');
    
    });
   
  

  
  }

  Modifier()
  {
    let const_id = localStorage.getItem('const_id');
    let control = document.getElementById('ord') as HTMLTextAreaElement;
    let desc = control.value;

    this.http.post("http://127.0.0.1:8000/api/doctor/updateConsultations",{"const_id":const_id, "desc":desc}).subscribe(result =>{
      console.log(result);
      this.getApptointementsInfo();
      this.modalRef.hide();

      localStorage.removeItem('const_id');
      localStorage.removeItem('date');
      localStorage.removeItem('heure');
      localStorage.removeItem('Cprenom');
      localStorage.removeItem('Cnom');
   
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

  Taux:any="0";
  TauxAccept:any="0";
  med_id = localStorage.getItem("med_id");
  getTaux(){
    console.log(this.med_id);
    this.http.post("http://127.0.0.1:8000/api/doctor/showStatsByMed",{"med_id":this.med_id}).subscribe(result => {
      if(result)
        this.Taux = result.toString();
    });
  }
  getTauxA(){
    console.log(this.med_id);
    this.http.post("http://127.0.0.1:8000/api/doctor/showStatsByMedA",{"med_id":this.med_id}).subscribe(result => {
      if(result)
        this.TauxAccept = result.toString();
    });
  }
  sumTarif:any="0";
  getSumTarif(){
    console.log(this.med_id);
    this.http.post("http://127.0.0.1:8000/api/doctor/showStatsByMedP",{"med_id":this.med_id}).subscribe(result => {
      if(result)
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

  PatientCount:any;
  getPatientCount(){
    this.user_id = localStorage.getItem("user_id");
    console.log(this.user_id);
    this.http.post("http://127.0.0.1:8000/api/doctor/PatientCount",{"user_id":this.user_id}).subscribe(result => {
    this.PatientCount = result;

    });
  }

  PatientTodayCount:any;
  getPatientTodayCount(){
    this.user_id = localStorage.getItem("user_id");
    console.log(this.user_id);
    this.http.post("http://127.0.0.1:8000/api/doctor/PatientTodayCount",{"user_id":this.user_id}).subscribe(result => {
    this.PatientTodayCount = result;

    });
  }

  getDoctors()
  {
    this.http.post('http://127.0.0.1:8000/api/doctor/showExeptID',{"med_id":this.med_id}).subscribe((res)=>{
      this.docs = res;
    })
  }

  docs
  cons

  myForm = this.fb.group({
    date:[''],
    meds:['']
  });

  date:string;
  med:string;

  getDate(){
   
    this.http.post('http://127.0.0.1:8000/api/doctor/getCons', {"date":this.myForm.value.date, "med_id":localStorage.getItem('med_id')}).subscribe((res:any[])=>{
    
    let newRes = []
    res.forEach(element => {
       let newOBj = {
         "id":element.const_id,
         "sexe":element.sexe,
         "nom":element.nom,
         "prenom":element.prenom,
         "date":element.date,
         "heure":element.heure
       }

       newRes.push(newOBj)
     });

     

     this.cons = newRes

      console.log(this.cons);
    })
    
  }

  getMed(){
    this.med = this.myForm.value.meds

    //console.log(this.med)
  }
 rep
  

  GetCons(){
    
    
  }

  Replace(const_id){
    if(!!this.med)
    {
      this.http.post('http://127.0.0.1:8000/api/doctor/Replace', {"const_id":const_id, "med_id":this.myForm.value.meds}).subscribe((res)=>{

         this.getDate();
         this.getAppointmentscount();
      this.getApptointementsInfo();
         
    }) 
    }
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

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonServiceService } from './../../common-service.service'
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-search-doctor',
  templateUrl: './search-doctor.component.html',
  styleUrls: ['./search-doctor.component.css']
})
export class SearchDoctorComponent implements OnInit {
  doctors: any = [];
  specialityList: any = [];
  status_type="";
  type="";
  specialist = "";
  speciality="";
  selDate;
  constructor(public commonService: CommonServiceService,private http: HttpClient, public router: Router) { }
  images = [
    {
      path: 'assets/img/features/feature-01.jpg',
    },
    {
      path: 'assets/img/features/feature-02.jpg',
    },
    {
      path: 'assets/img/features/feature-03.jpg',
    },
    {
      path: 'assets/img/features/feature-04.jpg',
    },
  ];
  ngOnInit(): void {
    this.getDoctors();
    this.getspeciality();
  }
  selectedCity = localStorage.getItem("selectedCity")
  doctorsInfo:any;
  getDoctors() {
    this.http.post("http://127.0.0.1:8000/api/patients/showDoctors",{"ville": this.selectedCity }).subscribe(result => {
      this.doctorsInfo = result;
      console.log(this.doctorsInfo);
    });
    
    
  }
  showspecialities:any
  getspeciality() {
    this.http.get("http://127.0.0.1:8000/api/admin/specialities/show").subscribe(result => {
      this.showspecialities = result;
    });
    console.log(this.showspecialities);
  
  }

  checkType(event) {
    if (event.target.checked) {
      this.type = event.target.value;
    } else {
      this.type = "";
    }
    console.log(this.type);
  }

  checkSpeciality(event) {
    if (event.target.checked) {
      this.speciality = event.target.value;
    } else {
      this.speciality = "";
    }
    console.log(this.speciality);
  }
  checkStatus(event){
    if (event.target.checked) {
      this.status_type = "true";
    } else {
      this.status_type = "";
    }
    console.log(this.status_type);
  }
  search() {
    console.log("all selected");
    console.log(this.speciality);
      console.log(this.type);
      console.log(this.status_type);
    if(this.type!="" && this.speciality!="" && this.status_type=="true") {
     
        this.http.post("http://127.0.0.1:8000/api/patients/showDoctorsbySexeSpecStatus",{"ville": this.selectedCity ,"sexe":this.type,"spec_id":this.speciality,"titre":this.status_type}).subscribe(result =>{
        console.log(result);
        this.doctorsInfo = result;
      });
    } 
    else if(this.type!="" && this.speciality=="" && this.status_type=="")
    {
      this.http.post("http://127.0.0.1:8000/api/patients/showDoctorsbySexe",{"ville": this.selectedCity ,"sexe":this.type}).subscribe(result =>{
        console.log(result);
        this.doctorsInfo = result;
      });
    }
    else if(this.type!="" && this.speciality=="" && this.status_type!="")
    {
      this.http.post("http://127.0.0.1:8000/api/patients/showDoctorsbySexeStatus",{"ville": this.selectedCity ,"sexe":this.type,"titre":this.status_type}).subscribe(result =>{
        console.log(result);
        this.doctorsInfo = result;
      });
    }
    else if(this.type!="" && this.speciality!="" && this.status_type=="")
    {
      this.http.post("http://127.0.0.1:8000/api/patients/showDoctorsbySexeSpec",{"ville": this.selectedCity ,"sexe":this.type,"spec_id":this.speciality}).subscribe(result =>{
        console.log(result);
        this.doctorsInfo = result;
      });
    }
    else if(this.type=="" && this.speciality!="" && this.status_type!="")
    {
      this.http.post("http://127.0.0.1:8000/api/patients/showDoctorsbySpecStatus",{"ville": this.selectedCity ,"spec_id":this.speciality,"titre":this.status_type}).subscribe(result =>{
        console.log(result);
        this.doctorsInfo = result;
      });
    }
    else if(this.type=="" && this.status_type=="" && this.speciality!="")
    {
      this.http.post("http://127.0.0.1:8000/api/patients/showDoctorsbySpec",{"ville": this.selectedCity ,"spec_id":this.speciality}).subscribe(result =>{
        console.log(result);
        this.doctorsInfo = result;
      });
    }
    else if(this.type=="" && this.status_type=="true" && this.speciality=="")
    {
      this.http.post("http://127.0.0.1:8000/api/patients/showDoctorsbyTitre",{"ville": this.selectedCity ,"titre":this.status_type}).subscribe(result =>{
        console.log(result);
        this.doctorsInfo = result;
      });
    }
    
    else 
    {
      this.getDoctors();
    }

  }
  
  bookAppointment(id) {
    // if((localStorage.getItem('auth') === 'true') && (localStorage.getItem('patient') === 'true')) {
      if(localStorage.getItem('type')=="patient")
      {
        localStorage.setItem('med_id_selected',id);
        this.router.navigateByUrl('/patients/booking');
      }
      else{
        localStorage.setItem('med_id_selected',id);
        this.router.navigateByUrl('/login-page');
      }  
     
    // } else {
    //   this.router.navigate(['/']);
    // }
  }


  voir(id){
    localStorage.setItem("selected_id",id);
    this.router.navigateByUrl('/patients/doctor-profile');
  }
  

}

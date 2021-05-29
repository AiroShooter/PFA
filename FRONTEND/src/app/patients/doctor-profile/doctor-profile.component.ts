import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonServiceService } from './../../common-service.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css'],
})
export class DoctorProfileComponent implements OnInit {
  id;
  doctorDetails;
  constructor(
    private http: HttpClient,
    private router:Router,
    public commonService: CommonServiceService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}
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
    window.scrollTo(0, 0);
    this.getDoctors();
    this.getHours()
  
  }

  doctorsInfo
  getDoctors() {
    this.http.post("http://127.0.0.1:8000/api/doctor/DoctorInfoById",{"med_id":localStorage.getItem('selected_id')}).subscribe(result => {
      this.doctorsInfo = result;
      console.log(this.doctorsInfo);
    });
  }

  
  lundi = []
  Mardi = []
  Mercredi = []
  Jeudi = []
  Vendredi = []
  Samedi = []
  Dimanche = []

  getHours() {
    this.http.post("http://127.0.0.1:8000/api/doctor/schedule/check",{"med_id":localStorage.getItem('selected_id')}).subscribe((result:any[]) => {
      result.forEach(e=>{
        if(e.jour == "Lundi")
        {
          this.lundi.push(e);
        }
        if(e.jour == "Mardi")
        {
          this.Mardi.push(e);
        }
        if(e.jour == "Mercredi")
        {
          this.Mercredi.push(e);
        }
        if(e.jour == "Jeudi")
        {
          this.Jeudi.push(e);
        }
        if(e.jour == "Vendredi")
        {
          this.Vendredi.push(e);
        }
        if(e.jour == "Samedi")
        {
          this.Samedi.push(e);
        }
        if(e.jour == "Samedi")
        {
          this.Dimanche.push(e);
        }
      })
    });


   
  }


    bookAppointment(med_id)
    {
      if(localStorage.getItem('type')=="patient")
      {
        localStorage.setItem('med_id_selected',med_id);
        this.router.navigateByUrl('/patients/booking');
      }
      else{
        localStorage.setItem('med_id_selected',med_id);
        this.router.navigateByUrl('/login-page');
      }  
    }

  
  
}

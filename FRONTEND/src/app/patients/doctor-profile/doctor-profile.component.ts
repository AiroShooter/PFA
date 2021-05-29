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
  
  }

  doctorsInfo
  getDoctors() {
    this.http.post("http://127.0.0.1:8000/api/doctor/DoctorInfoById",{"med_id":localStorage.getItem('selected_id')}).subscribe(result => {
      this.doctorsInfo = result;
      console.log(this.doctorsInfo);
    });
  }

  getHours() {
    this.http.post("http://127.0.0.1:8000/api/doctor/getHours",{"med_id":localStorage.getItem('selected_id')}).subscribe(result => {
      this.doctorsInfo = result;
      console.log(this.doctorsInfo);
    });
  }


    bookAppointment(med_id)
    {

    }
  
}

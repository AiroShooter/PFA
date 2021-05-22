import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../common-service.service';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit {
  doctorsList: any = [];
  errorMessage: string;

  constructor(public commonService: CommonServiceService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getDoctors();
    this. getDoctorsinfo();
  }

  getDoctors() {
    this.commonService.getDoctors().subscribe(
      (res) => {
        this.doctorsList = res;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }
  doctorsinfo:any 
  getDoctorsinfo(){
    this.http.get("http://127.0.0.1:8000/api/admin/showDoctors").subscribe(result => {
      this.doctorsinfo = result;
    });
    console.log(this.doctorsinfo);
  };
  onchange(isActive,user_id)
  { 
     if(isActive == 1){
      isActive = 0; 
    }
    else
     isActive = 1;
    
     this.http.post("http://127.0.0.1:8000/api/admin/lockAccounts",{"isActive":isActive,"user_id":user_id}).subscribe(result =>{
       console.log(result);
     });
     
  }
}

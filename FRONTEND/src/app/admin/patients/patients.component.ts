import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../common-service.service'
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patientsList: any = [];
  errorMessage: string;

  constructor(public commonService: CommonServiceService, private http:HttpClient) { }

  ngOnInit(): void {
    this.getPatients();
  }
  showpatients:any 
  getPatients() {
    
    this.http.get("http://127.0.0.1:8000/api/admin/showPatients").subscribe(result => {
        this.showpatients = result;
      });
      console.log(this.showpatients);
  }
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
     setTimeout(()=>{this.getPatients();}, 1000);
  }

}

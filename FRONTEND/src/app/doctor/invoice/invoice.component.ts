import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { CommonServiceService } from './../../common-service.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoices : any = [];
  constructor(public commonService:CommonServiceService,private http: HttpClient) { }

  ngOnInit(): void {
  	this.getTransactions();
  }
  AppointmentsInfo:any;
  user_id:any;
  getTransactions(){
    this.user_id = localStorage.getItem("user_id");
    console.log(this.user_id);
    this.http.post("http://127.0.0.1:8000/api/doctor/showConsultations",{"user_id":this.user_id}).subscribe(result => {
    this.AppointmentsInfo = result;
    console.log(result);
    });
  
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  datatable: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const table: any = $('table');
    this.datatable = table.DataTable();
    this.getshowConsultations();

  }
  showConsultations:any 
  getshowConsultations(){
    this.http.get("http://127.0.0.1:8000/api/admin/showConsultations").subscribe(result => {
      this.showConsultations = result;
    });
    console.log(this.showConsultations);
  }; 
  onchange(etat,id)
  { 
     if(etat == "confirmer"){
        etat = "annuler"; 
    }
     else
     etat = "confirmer";
    
     this.http.post("http://127.0.0.1:8000/api/admin/changeEtat",{"etat":etat,"id":id}).subscribe(result =>{
       console.log(result);
     });
     
  }

}

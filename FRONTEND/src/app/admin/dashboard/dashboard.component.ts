import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';

declare var $: any;

declare var Morris: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient) {
  }


  ngOnInit(): void {
    this.getconsultationCount();
    this.getallRevenue();
    this.getPatientCount();
    this.getDoctorsCount();
    this.getDoctorsinfo();
    this.showPatients();
    this.getshowConsultations();
    setInterval(()=>{this.getNotifs();}, 5000);
    let chartAreaData = [
      { y: '2006', a: 100, b: 90 },
      { y: '2007', a: 75, b: 65 },
      { y: '2008', a: 50, b: 40 },
      { y: '2009', a: 75, b: 65 },
      { y: '2010', a: 50, b: 40 },
      { y: '2011', a: 75, b: 65 },
      { y: '2012', a: 100, b: 90 },
    ];
    let chartLineData = [
      { y: '2006', a: 100, b: 90 },
      { y: '2007', a: 75, b: 65 },
      { y: '2008', a: 50, b: 40 },
      { y: '2009', a: 75, b: 65 },
      { y: '2010', a: 50, b: 40 },
      { y: '2011', a: 75, b: 65 },
      { y: '2012', a: 100, b: 90 },
    ];

    /* Morris Area Chart */
    Morris.Area({
      element: 'morrisArea',
      data: [
        { y: '2013', a: 60 },
        { y: '2014', a: 100 },
        { y: '2015', a: 240 },
        { y: '2016', a: 120 },
        { y: '2017', a: 80 },
        { y: '2018', a: 100 },
        { y: '2019', a: 300 },
      ],
      xkey: 'y',
      ykeys: ['a'],
      labels: ['Revenue'],
      lineColors: ['#1b5a90'],
      lineWidth: 2,

      fillOpacity: 0.5,
      gridTextSize: 10,
      hideHover: 'auto',
      resize: true,
      redraw: true,
    });

    /* Morris Line Chart */
    Morris.Line({
      element: 'morrisLine',
      data: [
        { y: '2015', a: 100, b: 30 },
        { y: '2016', a: 20, b: 60 },
        { y: '2017', a: 90, b: 120 },
        { y: '2018', a: 50, b: 80 },
        { y: '2019', a: 120, b: 150 },
      ],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Doctors', 'Patients'],
      lineColors: ['#1b5a90', '#ff9d00'],
      lineWidth: 1,
      gridTextSize: 10,
      hideHover: 'auto',
      resize: true,
      redraw: true,
    });

  }
  
  allRevenue:any =0;
  getallRevenue(){
    this.http.get("http://127.0.0.1:8000/api/admin/allRevenue").subscribe(result => {
      if(result)
      this.allRevenue = result;
    });
    console.log(this.allRevenue);
  };
  doctorsCount:any = 0;
  getDoctorsCount(){
    this.http.get("http://127.0.0.1:8000/api/admin/doctorsCount").subscribe(result => {
      if(result)
      this.doctorsCount = result;
    });
    console.log(this.doctorsCount);
  };
  consultationCount:any = 0;
  getconsultationCount(){
    this.http.get("http://127.0.0.1:8000/api/admin/consultationCount").subscribe(result => {
      if(result)
      this.consultationCount = result;
    });
    console.log(this.consultationCount);
  };
  
  patientsCount:any = 0
  getPatientCount(){
    this.http.get("http://127.0.0.1:8000/api/admin/patientCount").subscribe(result => {
      if(result)
      this.patientsCount = result;
    });
    console.log(this.patientsCount);
  };
  doctorsinfo:any 
  getDoctorsinfo(){
    this.http.get("http://127.0.0.1:8000/api/admin/showDoctors").subscribe(result => {
      this.doctorsinfo = result;
    });
    console.log(this.doctorsinfo);
  };
  showpatients:any 
  showPatients(){
    this.http.get("http://127.0.0.1:8000/api/admin/showPatients").subscribe(result => {
      this.showpatients = result;
    });
    console.log(this.showpatients);
  }; 

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

  SERVER_URL: string = 'http://127.0.0.1:8000/api/';
  getNotifs()
  {
    this.http.get(this.SERVER_URL + 'notif').subscribe(result => {
      localStorage.setItem('notifs', JSON.stringify(result));
    });
  }
  
}

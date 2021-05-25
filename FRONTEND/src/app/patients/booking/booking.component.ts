import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonServiceService } from './../../common-service.service';
import { FormBuilder} from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers:[DatePipe]
})
export class BookingComponent implements OnInit {
  doctorId;
  doctorDetails;
  userDetails;
  



  GetDate(){

    this.dates = []

    let today =Date.parse(new Date().toString());
    let dur = parseInt(((Date.parse(this.myForm.value.dateSelected) - today) / (1000 * 3600 * 24)).toString());

    this.duree = dur;

    this.index = dur;
    
    let newDate = today;

    if(dur >= 0)
    {
      for(let i = 0; i <= dur + 1000 ; i++)
      {
       
        newDate += (1000 * 3600 * 24); 
        
        let date = new Intl.DateTimeFormat('fr-FR', {weekday: "long", year: "numeric", month: "short", day: "numeric"}).format(new Date(newDate)).split(' ',4);

        let dateObj = {
          "jour_alfa": date[0],
          "jour_num":date[1],
          "mois": date[2],
          "annee":date[3],
          "dateComp":new Date(newDate).toISOString().substring(0, 10)
        }

       this.dates.push(dateObj);
      

      
      }
    }
 //   console.log(this.dates);
 this.date = this.dates[this.index];

 console.log(this.dates);

  }

  todayDate = new Intl.DateTimeFormat('fr-FR', {weekday: "long", year: "numeric", month: "short", day: "numeric"}).format(new Date()).split(' ',4);

 tody = {
    "jour_alfa": this.todayDate[0],
    "jour_num":this.todayDate[1],
    "mois": this.todayDate[2],
    "annee":this.todayDate[3],
  }

  dates: object[] = []
  index = 0;
  date:any = this.dates[this.index];
 
  defaultVal = new Date();
  dd :string;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private datePipe:DatePipe,
    private http:HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public commonService: CommonServiceService
  ) { this.dd = new Date().toISOString().substring(0, 10); }


  myForm = this.fb.group({
    dateSelected:['']
  });

  Prev(){

    if(this.index>0)
    {
       this.index--;
    }

    this.date = this.dates[this.index];


    console.log(this.date);
   
  }

  Next(){

    if(this.index < this.duree + 1000)
    {
      this.index++;
    }

    this.date = this.dates[this.index];

    console.log(this.date);
  }
  duree = 7;

  //inputControl = document.querySelector("#date") as Input

//constructor(private datePipe: DatePipe){
 //   
//}


  ngOnInit(): void {
    if (this.route.snapshot.queryParams['id']) {
      this.doctorId = this.route.snapshot.queryParams['id'];
    } else {
      this.doctorId = 1;
    }
    this.getDoctorsDetails();
    this.patientDetails();
    this.GetDate();
    this.CheckDatabase(this.med_id);
    console.log(this.datas);
   
   
  }

  getDoctorsDetails() {
    this.commonService.getDoctorDetails(this.doctorId).subscribe((res) => {
      this.doctorDetails = res;
    });
  }

  patientDetails() {
    let user_id;
    user_id = localStorage.getItem('id');
    if (!user_id) {
      user_id = 1;
    }
    this.commonService.getPatientDetails(Number(user_id)).subscribe((res) => {
      this.userDetails = res;
    });
  }

  SERVER_URL: string = 'http://127.0.0.1:8000/api/';
  med_id = localStorage.getItem('med_id_selected');
  patient_id = localStorage.getItem('patient_id');
  datas : object[] = []
  
  CheckDatabase(med_id)
  {
    this.http.post(this.SERVER_URL + 'doctor/schedule/check', {"med_id":med_id}).subscribe((res: string[]) => {
      res.forEach((element,index)=>{
        let hour = res[index]['heureDebut'].substring(0,5)+ ' - ' + res[index]['heureFin'].substring(0,5);
        let data = {"jour":res[index]['jour'], "hour":hour, "id":parseInt(res[index]['calen_id']), "pat_id":res[index]['patient_id'], "date":res[index]['date']}

        this.datas.push(data);
      
      })
      
      });

    }

    BookV(){
      alert("alredy booked")
    }

    Book(id,date){
      console.log(id, date)
    }

    confirm(){
      this.toastr.success('', 'Rendez-vous réservé avec succès!');
      this.router.navigate(['/patients/success']);
    }

 
}

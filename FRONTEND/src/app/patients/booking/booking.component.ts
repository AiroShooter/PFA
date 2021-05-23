import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonServiceService } from './../../common-service.service';
import { FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  doctorId;
  doctorDetails;
  userDetails;
  



  GetDate(){

    let today =Date.parse(new Date().toString());
    let dur = parseInt(((Date.parse(this.myForm.value.date) - today) / (1000 * 3600 * 24)).toString());
    
    let newDate = today;

    if(dur > 0)
    {
      for(let i = 0; i <= dur ; i++)
      {
        newDate += (1000 * 3600 * 24); 

        let date = new Intl.DateTimeFormat('fr-FR', {weekday: "long", year: "numeric", month: "short", day: "numeric"}).format(new Date(newDate)).split(' ',4);

        let dateObj = {
          "jour_alfa": date[0],
          "jour_num":date[1],
          "mois": date[2],
          "annee":date[3],
        }


       

       this.dates.push(dateObj);
      }
    }
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public commonService: CommonServiceService
  ) {}


  myForm = this.fb.group({
    date:['']
  });



  ngOnInit(): void {
    if (this.route.snapshot.queryParams['id']) {
      this.doctorId = this.route.snapshot.queryParams['id'];
    } else {
      this.doctorId = 1;
    }
    this.getDoctorsDetails();
    this.patientDetails();
  }

  getDoctorsDetails() {
    this.commonService.getDoctorDetails(this.doctorId).subscribe((res) => {
      this.doctorDetails = res;
    });
  }

  patientDetails() {
    let userId;
    userId = localStorage.getItem('id');
    if (!userId) {
      userId = 1;
    }
    this.commonService.getPatientDetails(Number(userId)).subscribe((res) => {
      this.userDetails = res;
    });
  }
}

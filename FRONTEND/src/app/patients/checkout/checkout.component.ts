import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from './../../common-service.service';
import { FormBuilder, Validator, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public commonService: CommonServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if(!(!!localStorage.getItem("patient_id")))
    {
      this.router.navigateByUrl('/patients/start');
    }
    
  }

  myForm = this.fb.group({
    Raison:['',[Validators.required, Validators.minLength(10)]],
    Type:['',[Validators.required]]
  });

  patient_id = localStorage.getItem('patient_id');
  SERVER_URL: string = 'http://127.0.0.1:8000/api/';

  booking() {
   console.log(this.myForm.value.Raison, this.myForm.value.Type)

   this.http.post('http://127.0.0.1:8000/api/patients/addCons', {"patient_id":this.patient_id,"type":this.myForm.value.Type, "raison":this.myForm.value.Raison}).subscribe((res)=>{
    console.log(res); 
   if(res == "1")
     {
       
      this.toastr.success('', 'Rendez-vous réservé avec succès!');
      this.router.navigate(['/patients/success']);
     }
   })
  }



}

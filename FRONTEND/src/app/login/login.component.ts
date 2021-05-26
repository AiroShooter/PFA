import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { UpdaterService } from 'src/app/services/updater.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isPatient: string = "false";
  constructor(public router: Router,  private http: HttpClient, private fb:FormBuilder, private updater: UpdaterService) {}


  SERVER_URL: string = 'http://127.0.0.1:8000/api/';
  myForm = this.fb.group({
    username:['',[Validators.required, Validators.minLength(5), Validators.email]],
    password:['',[Validators.required, Validators.minLength(8)]]
  });

  ngOnInit(): void {
  
  }
  error: string = '';

 /* checkType(event) {
    this.isPatient = event.target.checked ? "true": "false";
  }*/

  login(){

    let form = new FormData();
    form.append("email",this.myForm.value.username);
    form.append("password",this.myForm.value.password);
  //  form.append("isPatient",this.isPatient);

    console.log(form.get("email"), form.get("password"), form.get("isPatient"));
    this.http.post(this.SERVER_URL + 'login', form).subscribe(result => {


        if(result['hasError']){
          this.error = result['error'];
        }
        else{

          localStorage.setItem('email',result['user']['email']);
          localStorage.setItem('type',result['user']['type']);
          localStorage.setItem('user_id',result['user']['user_id']);


          if(result['user']['type'] == 'medecin')
          {
                this.http.post(this.SERVER_URL + 'doctor/getSingle', {"user_id":result['user']['user_id']}).subscribe(result1 => {
                  if(result1['user'])
                  {
                    localStorage.setItem('nom',result1['user']['nom']);
                    localStorage.setItem('prenom',result1['user']['prenom']);
                    localStorage.setItem('telePerso',result1['user']['telePerso']);
                    localStorage.setItem('ville',result1['user']['ville']);
                    localStorage.setItem('med_id',result1['user']['med_id']);
                    if(result1['spec'])
                      localStorage.setItem('Spec',result1['spec']['libelle']);
                    this.router.navigate(['/doctor/dashboard']);
                  }
              }); 
          }
          else if(result['user']['type'] == 'patient')
          {
              this.http.post(this.SERVER_URL + 'patients/getSingle', {"user_id":result['user']['user_id']}).subscribe(result1 => {

                if(result1['user'])
                {
                  localStorage.setItem('nom',result1['user']['nom']);
                  localStorage.setItem('prenom',result1['user']['prenom']);
                  localStorage.setItem('telePerso',result1['user']['telePerso']);
                 // localStorage.setItem('ville',result1['user']['ville']);
                  localStorage.setItem('patient_id',result1['user']['patient_id']);
                  localStorage.setItem('dateNaiss',result1['user']['dateNaiss']);
                  localStorage.setItem('pays',result1['user']['pays']);
                  if(localStorage.getItem("med_id_selected"))
                  {
                    this.router.navigate(['/patients/booking']);
                  }
                  else
                  this.router.navigate(['/patients/dashboard']);
                }
              }); 
          }

          this.updater.sendUpdate(true);

        }});




        
  }
}

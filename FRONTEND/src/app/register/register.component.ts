import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {  FormBuilder,Validators } from '@angular/forms';
import { error } from 'selenium-webdriver';
import { UpdaterService } from 'src/app/services/updater.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  
  isPatient: string = "true";
  reg_type = 'Registre des patients';
  doc_patient = 'Etes-vous un docteur ?';
  constructor(
    private http: HttpClient,
    public router: Router,
    private fb: FormBuilder,
    private updater: UpdaterService
  ) {}

  ngOnInit(): void {
  }

  changeRegType() {
    if (this.reg_type === 'Registre des médecins') {
      this.reg_type = 'Registre des patients';
      this.doc_patient = 'Etes-vous un docteur ?';
      this.isPatient = "true";
    } else {
      this.reg_type = 'Registre des médecins';
      this.doc_patient = 'Pas un docteur ?';
      this.isPatient = "false";
    }
  }

  myForm = this.fb.group({
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(8)]]
  });


  error: string = '';



  SERVER_URL: string = 'http://127.0.0.1:8000/api/';
  signup() {
    let form = new FormData();
    form.append("email",this.myForm.value.email);
    form.append("password",this.myForm.value.password);
    form.append("isPatient",this.isPatient);

    console.log(form.get("email"), form.get("password"), form.get("isPatient"));
    this.http.post(this.SERVER_URL + 'register', form).subscribe(result => {


        if(result['hasError']){
          this.error = result['error'];
        }
        else{

          if(result['user'])
          {
            localStorage.setItem('userEmail',result['user']['email']);
            localStorage.setItem('userType',result['user']['type']);
            localStorage.setItem('userId',result['user']['user_id']);
             this.updater.sendUpdate(true);
            this.router.navigate(['/blank']);
          }
          else this.error = "Il y a une erreur de connexion";
          
          
        }});
  }
}

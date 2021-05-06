import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {  FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  
  isPatient: string = "true";
  reg_type = 'Patient Register';
  doc_patient = 'Are you a Doctor?';
  constructor(
    private http: HttpClient,
    public router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
  }

  changeRegType() {
    if (this.reg_type === 'Doctor Register') {
      this.reg_type = 'Patient Register';
      this.doc_patient = 'Are you a Doctor?';
      this.isPatient = "true";
    } else {
      this.reg_type = 'Doctor Register';
      this.doc_patient = 'Not a Doctor?';
      this.isPatient = "false";
    }
  }

  myForm = this.fb.group({
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(8)]]
  });


  SERVER_URL: string = 'http://127.0.0.1:8000/api/';
  signup() {
    let form = new FormData();
    form.append("email",this.myForm.value.email);
    form.append("password",this.myForm.value.password);
    form.append("isPatient",this.isPatient);

    console.log(form.get("email"), form.get("password"), form.get("isPatient"));
    this.http.post(this.SERVER_URL + 'register', form).subscribe(result => console.log(result));
  }
}

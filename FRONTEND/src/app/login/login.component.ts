import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isPatient: string = "false";
  constructor(public router: Router,  private http: HttpClient, private fb:FormBuilder) {}


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
          localStorage.setItem('userEmail',result['user']['email']);
          localStorage.setItem('userType',result['user']['type']);
          this.router.navigate(['/blank']);
        }});
  }
}

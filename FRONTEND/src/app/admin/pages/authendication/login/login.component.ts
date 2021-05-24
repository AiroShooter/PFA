import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router,  private http: HttpClient, private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  SERVER_URL: string = 'http://127.0.0.1:8000/api/';
  myForm = this.fb.group({
    username:['',[Validators.required, Validators.minLength(5), Validators.email]],
    password:['',[Validators.required, Validators.minLength(8)]]
  });

  error: string = '';
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
          
          this.http.post(this.SERVER_URL + 'admin/getSingle', {"user_id":result['user']['user_id']}).subscribe(result1 => {
            if(result1['user'])
            {
              localStorage.setItem('nom',result1['user']['nom']);
              localStorage.setItem('prenom',result1['user']['prenom']);
              localStorage.setItem('admin_id',result1['user']['admin_id']);
              this.router.navigate(['/admin/dashboard']);
            }
          }); 
      

       //   this.updater.sendUpdate(true);
          this.router.navigate(['/admin/dashboard']);
        }});
  }

}

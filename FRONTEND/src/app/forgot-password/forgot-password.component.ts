import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private fb:FormBuilder, private http:HttpClient) { }

 

  ngOnInit(): void {
  }

  // SERVER_URL: string = 'http://127.0.0.1:8000/api/';
  //   myForm = this.fb.group({
  //     email:['']
  //   });

  // ForgetPass(){
  //   let form = new FormData();
  //   form.append("email",this.myForm.value.email);
  //   form.append("password","1234567891");
  //   this.http.post(this.SERVER_URL + 'ForgetPass', form).subscribe(result =>{
  //     console.log(result);
  //   });
  // }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doc-profile',
  templateUrl: './doc-profile.component.html',
  styleUrls: ['./doc-profile.component.css'],
})
export class DocProfileComponent implements OnInit {
  constructor(private Router: Router,private fb: FormBuilder, private http: HttpClient) {}
  
  ngOnInit(): void {}

  

  submit() {
    this.Router.navigateByUrl('/admin/doc-profile');
  }

  admin = localStorage.getItem('prenom') + ' ' + localStorage.getItem('nom')
  email = localStorage.getItem('email')

  myForm = this.fb.group({
    password:[],
    opassword:[],
    confirmPassword:[]
  });

  error : string = "";
  success : string = "";

  user_id:any
  changePass() 
  {
    this.error = "";
    this.success = "";
    if(this.myForm.value.password == this.myForm.value.confirmPassword)
    {
      this.user_id = localStorage.getItem('user_id');
      let form = new FormData();
      form.append("user_id",this.user_id);
      form.append("password",this.myForm.value.password);
      form.append("opassword",this.myForm.value.opassword);
      this.http.post("http://127.0.0.1:8000/api/verifyPass", form).subscribe((result: string) => 
      {
        this.error = result['error']
        this.success = result['success']
      });
    }
    else this.error = "S'il vous plaît confirmer votre mot de passe"
    
  }
}

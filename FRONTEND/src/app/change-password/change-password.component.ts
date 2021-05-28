import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private http: HttpClient, private fb:FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.router.navigateByUrl('/change-password')
  }
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

  logout() {
    localStorage.clear();
    this.router.navigate(['/login-page']);
  }

  public ageFromDateOfBirthday(dateOfBirth: any): number {
    return moment().diff(dateOfBirth, 'years');
  }

  nom = localStorage.getItem('nom') + ' ' + localStorage.getItem('prenom');
  dateNaiss = localStorage.getItem('dateNaiss');
  age = this.ageFromDateOfBirthday(this.dateNaiss);
  pays = localStorage.getItem('pays');
  type = localStorage.getItem('type');
  spec = localStorage.getItem('Spec');
  sexe = localStorage.getItem('sexe');
}

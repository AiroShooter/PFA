import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-regiser',
  templateUrl: './regiser.component.html',
  styleUrls: ['./regiser.component.css']
})
export class RegiserComponent implements OnInit {

  constructor(private fb:FormBuilder, private http: HttpClient, public router: Router,) { }

  ngOnInit(): void {
  }

  myForm = this.fb.group({
    nom:['',[Validators.required, Validators.minLength(3)]],
    prenom:['',[Validators.required, Validators.minLength(3)]],
    email:['',[Validators.required, Validators.email,Validators.minLength(5)]],
    password:['',[Validators.required, Validators.minLength(8)]]
  });
  SERVER_URL: string = 'http://127.0.0.1:8000/api/';
  error: string = '';
  register(){
    let form = new FormData();
    form.append("nom",this.myForm.value.nom);
    form.append("prenom",this.myForm.value.prenom);
    form.append("email",this.myForm.value.email);
    form.append("password",this.myForm.value.password);
    form.append("type",'admin');


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
            //this.updater.sendUpdate(true);
            this.router.navigate(['/admin/dashboard']);
          }
          else this.error = "Il y a une erreur de connexion";
          
          
        }});
  }

}

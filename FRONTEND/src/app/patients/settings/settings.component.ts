import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    
  ) { }

  ngOnInit(): void {
    if(!(!!localStorage.getItem("patient_id")))
    {
      this.router.navigateByUrl('/patients/start');
    }
  }
  myForm = this.fb.group({
    prenom:[localStorage.getItem("prenom"),[Validators.required]],
    nom:[localStorage.getItem("nom"),[Validators.required]],
    pays:["",[Validators.required]],
    tele:[localStorage.getItem("telePerso"),[Validators.required]],
    dateNaiss:[localStorage.getItem("dateNaiss"),[Validators.required]],
    sexe:["",[Validators.required]]
  });

  SERVER_URL: string = 'http://127.0.0.1:8000/api/';

  update() {
    let form = new FormData(); 
    form.append("user_id",localStorage.getItem('user_id'));
    form.append("nom",this.myForm.value.nom);
    form.append("prenom",this.myForm.value.prenom);
    form.append("sexe",this.myForm.value.sexe);
    form.append("telePerso",this.myForm.value.tele);
    form.append("pays",this.myForm.value.pays);
    form.append("dateNaiss",this.myForm.value.dateNaiss);

    console.log(form.get("user_id"),form.get("nom"),form.get("telePerso"));
    this.http.post(this.SERVER_URL + 'patients/update', form).subscribe(result => {
      console.log(result);
      if(result['user'])
          {
            localStorage.setItem('nom',result['user']['nom']);
            localStorage.setItem('prenom',result['user']['prenom']);
            localStorage.setItem('telePerso',result['user']['telePerso']);
            localStorage.setItem('sexe',result['user']['sexe']);
            localStorage.setItem('pays',result['user']['pays']);
            localStorage.setItem('dateNaiss',result['user']['dateNaiss']);
            this.router.navigateByUrl('/change-password');
          }
    });
    
    
  }

}

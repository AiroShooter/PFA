import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients-start',
  templateUrl: './patients-start.component.html',
  styleUrls: ['./patients-start.component.css']
})
export class PatientsStartComponent implements OnInit {

  constructor(
    private http: HttpClient,
    public router: Router,
    private fb:FormBuilder ) { }

  ngOnInit(): void {
  }

  myForm = this.fb.group({
    prenom:[], nom:[], pays:[], tele:[], dateNaiss:[], sexe:[]
  });

  SERVER_URL: string = 'http://127.0.0.1:8000/api/';

  signup() {
    let form = new FormData(); 
    form.append("user_id",localStorage.getItem('userId'));
    form.append("nom",this.myForm.value.nom);
    form.append("prenom",this.myForm.value.prenom);
    form.append("sexe",this.myForm.value.sexe);
    form.append("telePerso",this.myForm.value.tele);
    form.append("pays",this.myForm.value.pays);
    form.append("dateNaiss",this.myForm.value.dateNaiss);

    console.log(form.get("user_id"),form.get("nom"),form.get("telePerso"));
    this.http.post(this.SERVER_URL + 'patients/start', form).subscribe(result => {
      console.log(result);
      if(result['user'])
          {
            localStorage.setItem('Pnom',result['user']['nom']);
            localStorage.setItem('Pprenom',result['user']['prenom']);
            localStorage.setItem('Tele',result['user']['telePerso']);
            localStorage.setItem('Pays',result['user']['pays']);
            localStorage.setItem('DateNaiss',result['user']['dateNaiss']);
            this.router.navigate(['/patients/dashboard']);
          }
    });
    
    
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-start',
  templateUrl: './doctor-start.component.html',
  styleUrls: ['./doctor-start.component.css']
})
export class DoctorStartComponent implements OnInit {
  error: string="";
  constructor( 
    private http: HttpClient,
    public router: Router,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.loadSpec();
  }

  specs:any
  SERVER_URL: string = 'http://127.0.0.1:8000/api/';
  loadSpec()
  {
    this.http.get(this.SERVER_URL + 'specialities/show').subscribe(result => {
      this.specs=result;
    });

    console.log(this.specs);
  }

  myForm = this.fb.group({
    prenom:[], nom:[], titre:[], tarif:[], siteweb:[], adresse:[], ville:[], sexe:[], teleC:[], teleP:[], duree:[], specialite:[]
  });

  signup() {
    let form = new FormData();
    form.append("user_id",localStorage.getItem('user_id'));
    form.append("spec_id",this.myForm.value.specialite);
    form.append("titre",this.myForm.value.titre);
    form.append("nom",this.myForm.value.nom);
    form.append("prenom",this.myForm.value.prenom);
    form.append("tarif",this.myForm.value.tarif);
    form.append("siteWeb",this.myForm.value.siteweb);
    form.append("adresseCabinet",this.myForm.value.adresse);
    form.append("ville",this.myForm.value.ville);
    form.append("sexe",this.myForm.value.sexe);
    form.append("teleCabinet",this.myForm.value.teleC);
    form.append("telePerso",this.myForm.value.teleP);
    form.append("duree",this.myForm.value.duree);
    

    console.log(form.get("user_id"),form.get("spec_id"),form.get("nom"),form.get("prenom"));
    this.http.post(this.SERVER_URL + 'doctor/start', form).subscribe(result => {
      console.log(result);
      if(result['user'])
          {
            localStorage.setItem('nom',result['user']['nom']);
            localStorage.setItem('prenom',result['user']['prenom']);
            localStorage.setItem('telePerso',result['user']['telePerso']);
            localStorage.setItem('ville',result['user']['ville']);
            localStorage.setItem('med_id',result['user']['med_id']);
            if(result['spec'])
              localStorage.setItem('Spec',result['spec']['libelle']);
            this.router.navigate(['/doctor/dashboard']);
          }
    });
  }

}

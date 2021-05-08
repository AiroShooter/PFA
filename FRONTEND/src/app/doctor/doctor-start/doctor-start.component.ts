import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-start',
  templateUrl: './doctor-start.component.html',
  styleUrls: ['./doctor-start.component.css']
})
export class DoctorStartComponent implements OnInit {

  user_id: string = "1";
  spec_id: string = "1";
  titre: string = "t";
  nom: string = "med1";
  prenom: string = "premed1";
  tarif: string = "10";
  siteWeb: string = "med.med.com";
  adresseCabinet: string = "marrakech";
  ville: string = "marrakech";
  teleCabinet: string = "0587874545";
  telePerso: string = "0654878798";
  duree: string = "1";
  error: string="";
  constructor( 
    private http: HttpClient,
    public router: Router,) { }

  ngOnInit(): void {
    this.signup();
  }

  specs:any
  loadUsers()
  {
    this.http.get(this.SERVER_URL + 'users').subscribe(result => {
      this.specs=result;
    });

    console.log(this.specs);
  }

  SERVER_URL: string = 'http://127.0.0.1:8000/api/';
  signup() {
    let form = new FormData();
    form.append("user_id",this.user_id);
    form.append("spec_id",this.spec_id);
    form.append("titre",this.titre);
    form.append("nom",this.nom);
    form.append("prenom",this.prenom);
    form.append("tarif",this.tarif);
    form.append("siteWeb",this.siteWeb);
    form.append("adresseCabinet",this.adresseCabinet);
    form.append("ville",this.ville);
    form.append("teleCabinet",this.teleCabinet);
    form.append("telePerso",this.telePerso);
    form.append("duree",this.duree);
    

    console.log(form.get("nom"),form.get("prenom"));
    this.http.post(this.SERVER_URL + 'doctor/start', form).subscribe(result => {
      console.log(result);
    });
  }

}

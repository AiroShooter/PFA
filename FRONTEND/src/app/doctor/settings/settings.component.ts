import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdaterService } from 'src/app/services/updater.service';
declare var $: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor( 
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private updater: UpdaterService
  ) {}

  ngOnInit(): void {
    this.loadSpec();
  }
  files: File[] = [];

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
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

  update() {
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
    this.http.post(this.SERVER_URL + 'doctor/update', form).subscribe(result => {
      console.log(result);
      if(result)
          {
            localStorage.setItem('nom',result["user"]['nom']);
            localStorage.setItem('prenom',result["user"]['prenom']);
            localStorage.setItem('telePerso',result["user"]['telePerso']);
            localStorage.setItem('ville',result["user"]['ville']);
            localStorage.setItem('user_id',result["user"]['user_id']);
            localStorage.setItem('med_id',result["user"]['med_id']);
            if(result['spec'])
              localStorage.setItem('Spec',result['spec']['libelle']);
            this.updater.sendUpdate(true);
            this.router.navigateByUrl('/change-password');
          }
    });
  }
}

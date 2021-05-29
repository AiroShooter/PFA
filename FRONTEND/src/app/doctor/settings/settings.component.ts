import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    if(!(!!localStorage.getItem("med_id")))
    {
      this.router.navigateByUrl('/doctor/start');
    }
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
    prenom:[localStorage.getItem('prenom'),[Validators.required]],
    nom:[localStorage.getItem('nom'),[Validators.required]],
    titre:["",[Validators.required]],
    tarif:[localStorage.getItem('tarif'),[Validators.required]],
    siteweb:[localStorage.getItem('siteWeb'),[Validators.required]],
    adresse:[localStorage.getItem('adresseCabinet'),[Validators.required]],
    ville:[localStorage.getItem('ville'),[Validators.required]],
    sexe:['',[Validators.required]],
    teleC:[localStorage.getItem('teleCabinet'),[Validators.required]],
    teleP:[localStorage.getItem('telePerso'),[Validators.required]],
    duree:[localStorage.getItem('duree'),[Validators.required]],
    specialite:['',[Validators.required]]
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
    

    console.log(form.get("titre"),form.get("spec_id"),form.get("nom"),form.get("prenom"));
    this.http.post(this.SERVER_URL + 'doctor/update', form).subscribe(result => {
      console.log(result);
      if(result)
          {
            localStorage.setItem('nom',result['user']['nom']);
            localStorage.setItem('prenom',result['user']['prenom']);
            localStorage.setItem('telePerso',result['user']['telePerso']);
            localStorage.setItem('teleCabinet',result['user']['teleCabinet']);
            localStorage.setItem('tarif',result['user']['tarif']);
            localStorage.setItem('siteWeb',result['user']['siteWeb']);
            localStorage.setItem('adresseCabinet',result['user']['adresseCabinet']);
            localStorage.setItem('duree',result['user']['duree']);
            localStorage.setItem('titre',result['user']['titre']);
            localStorage.setItem('ville',result['user']['ville']);
            localStorage.setItem('sexe',result['user']['sexe']);
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
